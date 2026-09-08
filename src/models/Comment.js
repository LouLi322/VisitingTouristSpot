const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Comment content is required"],
      trim: true,
    },
    attraction: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Comment is required"],
      ref: "Attraction",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User is required"],
      ref: "User",
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  { timestamps: true },
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
