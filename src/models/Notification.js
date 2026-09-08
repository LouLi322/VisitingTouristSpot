const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Recipient is required"],
      ref: "User",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Sender is required"],
      ref: "User",
    },
    type: {
      type: String,
      required: [true, "Notification type is required"],
      enum: ["SUBSCRIPTION", "COMMENT", "REPLY", "ATTRACTION"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
