const mongoose = require("mongoose");
const crypto = require("crypto");
const uniqueValidator = require("mongoose-unique-validator");
const config = require('config');
const secret = config.get('app.secret');
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
      required: [true, "is required"],
      match: [/\S+@\S+\.\S+/, "email is invalid"]
    },
    tz:{
      type:String,
      unique:true,
      required: [true, "is required"],
      match:[/^[0-9]{9}$/,"Identity number have to be 9 digits!"]
    },
    firstName: {
      type: String,
      required: [true, "is required"],
      match:[/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i,"First name is not valid!"]
    },
    lastName: {
      type: String,
      required: [true, "is required"],
      match:[/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i,"Last name is not valid!"]
    },
    role:{
      type:Number,
      default:1
    },
    fullName:{
      type:String
    },
    salt: String,
    hash: String,
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, { type: "mongoose-unique-validator" });

UserSchema.methods.setPassword = function(password) {
  // create a salt for the user
  this.salt = crypto.randomBytes(16).toString("hex");
  // create hash value
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

UserSchema.methods.validPassword = function(password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  let exp = new Date(today);
  exp.setDate(today.getDate() + 30);
  return jwt.sign(
    {
      sub: this._id,
      exp: parseInt(exp.getTime() / 1000)
    },
    secret
  );
};


UserSchema.methods.authSerialize = function(accessToken = true) {
  return {
    id: this.id,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    tz: this.tz,
    role:this.role,
    fullName:this.fullName,
    accessToken: (() => {
      if (!accessToken) {
        return undefined;
      }
      return this.generateJWT();
    })(),
  };
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
