require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    const user = await User.findOne({ email: "louiselee@example.com" });
    if (!user) {
      console.log("USER_NOT_FOUND");
      process.exit(1);
    }
    console.log("USER_FOUND:", user._id.toString());

    try {
      const accessToken = user.generateAccessToken();
      console.log("ACCESS_TOKEN_OK");
      const refreshToken = user.generateRefreshToken();
      console.log("REFRESH_TOKEN_OK");

      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
      console.log("SAVE_OK");
    } catch (e) {
      console.error("ERROR:", e.message);
      console.error("STACK:", e.stack);
    }

    await mongoose.disconnect();
    process.exit(0);
  })
  .catch((e) => {
    console.error("DB_CONNECTION_ERROR:", e.message);
    process.exit(1);
  });
