const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    attraction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attraction",
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    likeBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;
