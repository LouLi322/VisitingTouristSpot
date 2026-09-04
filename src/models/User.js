const mongoose = require("mongoose");

//Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
      lowercase: true,
      index: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [8, "Password must be at least 8 character"],
    },
    avatar: {
      public_id: String,
      url: String,
    },
    coverImage: {
      public_id: String,
      url: String,
    },
    refreshToken: {
      type: String,
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attraction",
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    notificationSettings: {
      emailNotification: {
        type: Boolean,
        default: true,
      },
      subscriptionActivity: {
        type: Boolean,
        default: true,
      },
      commentActivity: {
        type: Boolean,
        default: true,
      },
    },
    // Password reset fields
    refreshPasswordToken: String,
    refreshPasswordExpiry: String,
    // Admin role
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);
module.exports = User;
