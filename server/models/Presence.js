const mongoose = require("mongoose");
const config = require('config');
const PresenceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    endTime:{
        type:Date,
        default:null
    }
  },
  { timestamps: true }
);

PresenceSchema.methods.presenceSerialize = function(accessToken = true) {
  return {
    id: this.id,
    userId: this.userId,
    createdAt: this.createdAt,
    endTime: this.endTime,
  };
};

const Presence = mongoose.model("Presence", PresenceSchema);

module.exports = Presence;