import mongoose from "mongoose";
import Attraction from "../models/Attraction.js";

// Initial seed data for Taipei landmarks
const INITIAL_ATTRACTIONS = [
  {
    title: "台北 101 觀景台",
    notes: "俯瞰台北盆地夜景與信義商圈璀璨燈火的最佳地標。",
    lat: 25.033964,
    lng: 121.564472,
    category: "attraction",
    color: "#ef4444",
  },
  {
    title: "大安森林公園",
    notes: "市中心綠洲，適合散步、野餐與休閒慢跑。",
    lat: 25.03,
    lng: 121.535,
    category: "favorite",
    color: "#10b981",
  },
  {
    title: "華山1914文創園區",
    notes: "展覽、藝文空間與周邊停車便利的休閒園區。",
    lat: 25.0441,
    lng: 121.5294,
    category: "parking",
    color: "#8b5cf6",
  },
];

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
    // Seed initial landmarks if collection is empty
    const count = await Attraction.countDocuments();
    if (count === 0) {
      await Attraction.insertMany(INITIAL_ATTRACTIONS);
      console.log("Seeding default attractions into Mongoose collection...");
    }
  } catch (error) {
    console.error(error.message || "Fail to connect to MongoDB");
    process.exit(1);
  }
};

export default connectDB;
