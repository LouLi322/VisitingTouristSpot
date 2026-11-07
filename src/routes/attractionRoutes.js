import express from "express";
import {
  postNearbySpots,
  searchSpots,
  getSpotById,
  updateAttraction,
  deleteAttraction,
} from "../controllers/attractionController.js";
import verifyJWT from "../middlewares/auth.js";

const attractionRouter = express.Router();

//!Public routes
attractionRouter.post("/nearby", postNearbySpots);
//!Private routes

export default attractionRouter;
