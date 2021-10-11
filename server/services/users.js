const User = require("../models/User");
// fetch all users

module.exports = {
  fetch: [
    async (req, res, next) => {
      const users = await User.find(
        {},
        {
          _id: "$_id",
          email: "$email",
          role: "$role",
          firstName: "$firstName",
          lastName: "$lastName",
          fullName:"$firstName $lastName",
          tz: "$tz",
        }
      )
      res.send(users);
    },
  ],

  getById: [
    async (req, res, next) => {
      const { id } = req.params;
      const user = await User.findById({ _id: id });
      res.send(user);
    },
  ],
  update: [
    async (req, res, next) => {
      const { id } = req.params;
      const user = await User.findByIdAndUpdate({ _id: id }, req.body,{new:true});
      return res.json(user);
    },
  ],
  remove: [
    async (req, res, next) => {
      const { id } = req.params;
      const user = await User.findByIdAndDelete({ _id: id });
      return res.json(user);
    },
  ],
};
