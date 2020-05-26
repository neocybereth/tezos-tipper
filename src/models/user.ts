const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  address: String,
  balance: Number,
  withdrawalAddress: String,
});

export default mongoose.model("User", UserSchema);
