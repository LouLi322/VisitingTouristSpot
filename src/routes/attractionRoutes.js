import express from "express";
import {
  postNearbySpots,
  searchSpots,
  getAttractions,
  updateAttraction,
  deleteAttraction,
} from "../controllers/attractionController.js";
import verifyJWT from "../middlewares/auth.js";

const attractionRouter = express.Router();

//!Public routes
attractionRouter.post("/nearby", postNearbySpots);
attractionRouter.post("/search", searchSpots);
//!Private routes

export default attractionRouter;
