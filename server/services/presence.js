const Presence = require("../models/Presence");

module.exports = {
  fetch: [
    async (req, res, next) => {
      const presences = await Presence.find({}).populate("user",['firstName','lastName','tz']);
      res.send(presences);
    },
  ],

  getById: [
    async (req, res, next) => {
      const { id } = req.params;
      const presence = await Presence.findById({ _id: id }).populate("user",['firstName','lastName','tz']);
      res.send(presence);
    },
  ],
  update: [
    async (req, res, next) => {
      const { id } = req.params;
      console.log(req.body,"service!!")
      const presence = await Presence.findByIdAndUpdate({ _id: id },req.body , {
        new: true,
      }).populate("user",['firstName','lastName','tz']);
      res.send(presence);
    },
  ],
  delete: [
    async (req, res, next) => {
      const { id } = req.params;
      const presence = await Presence.findByIdAndDelete({ _id: id });
      res.send(presence);
    },
  ],
  create: [
    async (req, res, next) => {
      const presence = await Presence.create(req.body);
      const presenceWithUser = await Presence.findOne({_id:presence._id})
      .populate("user",['firstName','lastName','tz'])
      res.send(presenceWithUser);
    },
  ],
  filter: [
    async (req, res, next) => {
      const filter = req.params.filter;
      const presences = await Presence.find({user:filter}, {
        createdAt: "$createdAt",
        endTime:"$endTime"
      }).populate("user",['firstName','lastName','tz']);
      res.send(presences);
    },
  ],
};
