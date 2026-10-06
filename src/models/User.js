const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const appConfig = require("../config/appConfig");

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
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
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
  { timestamps: true },
);
//Pre-save hook to hash user password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// generate access token & refresh token
userSchema.methods.generateAccessToken = function () {
  return JWT.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    appConfig.accessTokenSecret,
    { expiresIn: appConfig.accessTokenExpiry },
  );
};
userSchema.methods.generateRefreshToken = function () {
  return JWT.sign({ _id: this._id }, appConfig.refreshTokenSecret, {
    expiresIn: appConfig.refreshTokenExpiry,
  });
};

const User = mongoose.model("User", userSchema);
module.exports = User;
