const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Itinerary is required"],
      trim: true,
    },
    owner: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    releasedDate: {
      type: Date,
      default: Date.now(),
    },
    description: {
      type: String,
      trim: true,
    },
    attractions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attraction",
      },
    ],
  },
  { timestamps: true },
);

const Itinerary = mongoose.model("Itinerary", itinerarySchema);
module.exports = Itinerary;
