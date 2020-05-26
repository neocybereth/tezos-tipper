const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
  // Epoch time
  lastChecked: Number,
});

export default mongoose.model("Comments", CommentsSchema);
