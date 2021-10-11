const Passport = require("passport").Passport;
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const config = require('config');
const secret = config.get('app.secret');

const userPassport = new Passport();
userPassport.use(
  new LocalStrategy(
    {
      usernameField: "tz",
    },
    function(tz, password, done) {
      User.findOne({ tz })
        .then(function(user) {
          if (!user || !user.validPassword(password)) {
            return done(null, false, {
              name: 'UnauthorizedError',
              message: 'The tz or password is incorrect.'
            });
          }
          return done(null, user);
        })
        .catch(done);
    }
  )
);
userPassport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : secret
},
function (jwtPayload, cb) {
  //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
  return User.findOne({_id:jwtPayload.sub})
      .then(user => {
          return cb(null, user);
      })
      .catch(err => {
          return cb(err);
      });
}
))

module.exports = {
  userPassport,
};
