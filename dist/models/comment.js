"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const CommentsSchema = new mongoose.Schema({
    // Epoch time
    lastChecked: Number,
});
exports.default = mongoose.model("Comments", CommentsSchema);
//# sourceMappingURL=comment.js.map