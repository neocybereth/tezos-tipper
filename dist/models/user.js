"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    username: String,
    address: String,
    balance: Number,
    withdrawalAddress: String,
});
exports.default = mongoose.model("User", UserSchema);
//# sourceMappingURL=user.js.map