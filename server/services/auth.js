/**
 * config
 */
const config = require("config");

/**
 * models
 */
const User = require("../models/User");

/**
 * utils
 */
const isBodyMissingProps = require("@/utils/isBodyMissingProps");

/**
 * user passport
 */
const { userPassport } = require("@/config/passport");

module.exports = {
  create: [
    (req, res, next) => {
      const requiredProps = [
        ["email", "Your email is required"],
        ["firstName", "Your first name is required."],
        ["password", "A password is required"],
        ["lastName", "Your last name is required"],
        ["tz", "Identity Number has require"],
      ];

      const { hasMissingProps, propErrors } = isBodyMissingProps(
        requiredProps,
        req.body
      );

      if (hasMissingProps) {
        return next({
          name: "ValidationError",
          errors: propErrors,
        });
      }
      const { email, firstName, lastName, password, tz, role } = req.body;
      const fullName = firstName + " " + lastName
      // check if user tz is unique
      return User.count({ tz })
        .exec()
        .then(function(count) {
          if (count > 0) {
            throw {
              name: "ValidationError",
              errors: {
                tz: { message: "The Identity number is already exist" },
              },
            };
          }
          return count;
        })
        .then(() => {
          const user = new User({
            email,
            firstName,
            lastName,
            tz,
            role,
            fullName
          });

          user.setPassword(password);
          return user.save().then(function(user) {
            return res.json({ success: true, user: user.authSerialize() });
          });
        })
        .catch(next);
    },
  ],
  /**
   * Authenticate and login a User resource
   */
  login: [
    (req, res, next) => {
      const requiredProps = [
        ["tz", "Your Identity Number is required to sign in.", true],
        ["password", "Your password is required to sign.", true],
      ];
      const { hasMissingProps, propErrors } = isBodyMissingProps(
        requiredProps,
        req.body
      );
      if (hasMissingProps) {
        return next({
          name: "ValidationError",
          errors: propErrors,
        });
      }
    const { tz, password } = req.body;
      return next();
    },
    (req, res, next) =>
      userPassport.authenticate("local", function(err, user, data) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return next({ ...data, success: false });
        }

        return res.json({ success: true, user: user.authSerialize() });
      })(req, res, next),
  ],
  logout:[
    (req, res, next) => {
        req.logout();
        res.json({success:true});
    }
  ]
};
