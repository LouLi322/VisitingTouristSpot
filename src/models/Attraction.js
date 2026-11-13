import mongoose from "mongoose";

const attractionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Attraction title is required"],
      trim: true,
      maxlength: [60, "Title cannot exceed 60 characters"],
    },
    notes: {
      type: String,
      default: "",
      trim: true,
      maxlength: [500, "Notes cannot exceed 500 characters"],
    },
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
    category: {
      type: String,
      enum: {
        values: ["custom", "favorite", "attraction", "food", "cafe", "parking"],
        message: "{VALUE} is not a valid category",
      },
      default: "custom",
    },
    color: {
      type: String,
      default: "#3b82f6",
      match: [
        /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
        "Please provide a valid hex color code",
      ],
    },
    externalPlaceId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

const Attraction = mongoose.model("Attraction", attractionSchema);
export default Attraction;
