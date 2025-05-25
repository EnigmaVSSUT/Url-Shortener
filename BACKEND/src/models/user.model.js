import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
    default: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
  },
});

function getGravatarUrl(email) {
  const hash = require("crypto").createHash("md5").update(email).digest("hex");
  return `https://gravatar.com/avatar/${hash}?d=identicon`;}

const user = mongoose.model("user", userSchema);

export default user;
