import mongoose from "mongoose";

const attractionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Attraction title is required"],
    trim: true,
    maxlength: [60, "Title cannot exceed 60 characters"],
  },
  category: {
    type: String,
    enum: {
      values: ["custom", "favorite", "attraction", "food", "cafe", "parking"],
      message: "{VALUE} is not a valid category",
    },
    default: "custom",
  },
  position: {
    lat: {
      type: Number,
      required: [true, "Latitude is required"],
      min: [-90, "Latitude must be between -90 and 90"],
      max: [90, "Latitude must be between -90 and 90"],
    },
    lng: {
      type: Number,
      required: [true, "Longitude is required"],
      min: [-180, "Longitude must be between -180 and 180"],
      max: [180, "Longitude must be between -180 and 180"],
    },
  },
  image: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/03/08/17/25/musician-664432_1280.jpg", //need to change
  },
  notes: {
    type: String,
    default: "",
    trim: true,
    maxlength: [500, "Notes cannot exceed 500 characters"],
  },
});

const Attraction = mongoose.model("Attraction", attractionSchema);
export default Attraction;
