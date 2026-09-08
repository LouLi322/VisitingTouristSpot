const mongoose = require("mongoose");

const attractionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Attraction title is required"],
    trim: true,
  },
  tags: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
  position: {
    lat: {
      type: Number,
      required: true,
      trim: true,
    },
    lng: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  image: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/03/08/17/25/musician-664432_1280.jpg", //need to change
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },
});

const Attraction = mongoose.model("Attraction", attractionSchema);
module.exports = Attraction;
