import appConfig from "../config/appConfig.js";
import Attraction from "../models/Attraction.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// ?Desc: Add a new attraction with tags
// ?Route POST /api/attractions
// ?Access Private

// ?Desc: Get nearby spots(place/attraction) with filtering
// ?Route GET /api/attractions/nearby?radius=3000&maxResultCount=15&sortBy=views
// ?Access Public
const getNearbySpots = async (req, res) => {};

// !Desc: Post nearby spots(place/attraction) with filtering
// !Route Post /api/attractions/nearby
// !Access Public
const postNearbySpots = async (req, res) => {
  const apiKey = appConfig.mapsApiKey;
  const {
    latitude,
    longitude,
    includedTypes,
    radius = 3000,
    maxResultCount = 15,
  } = req.body;
  if (latitude === undefined || longitude === undefined) {
    throw new ApiError(400, "Latitude and longitude are required");
  }
  const payload = {
    includedTypes:
      includedTypes && includedTypes.length ? includedTypes : ["food"],
    maxResultCount: Math.min(maxResultCount, 20),
    locationRestriction: {
      circle: {
        center: {
          latitude: Number(latitude),
          longitude: Number(longitude),
        },
        radius: Math.min(Number(radius), 50000),
      },
    },
  };
  const headers = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": apiKey,
    "X-Goog-FieldMask":
      "places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.primaryType,places.types,places.regularOpeningHours,places.photos",
  };
  // Only include SOLUTION_ID if it is defined in your environment
  if (typeof SOLUTION_ID !== "undefined") {
    headers["X-Goog-Maps-Solution-ID"] = SOLUTION_ID;
  }
  const response = await fetch(
    "https://places.googleapis.com/v1/places:searchNearby",
    {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    },
  );
  const data = await response.json();
  if (!response.ok) {
    throw new ApiError(
      response.status,
      data.error?.message || "Error fetching the nearby map",
    );
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, { data }, "The nearby map fetched successfully"),
    );
};

// !Desc: Post a searching spot(place/attraction) with filtering, radius and sorting
// !Route POST /api/attractions?search=cafe&tag=food&radius=3000&maxResultCount=15&sortBy=views
// !Access Public
const searchSpots = async (req, res) => {};

// !Desc: Get a spot(place/attraction) detail by ID
// !Route GET /api/attractions/:attractionID
// !Access Public
const getSpotById = async (req, res) => {};

// !Desc: Update a attraction details
// !Route PATCH /api/attractions/:attractionID
// !Access Private
const updateAttraction = async (req, res) => {};

// !Desc: Delete a attraction
// !Route DELETE /api/attractions/:attractionID
// !Access Private
const deleteAttraction = async (req, res) => {};

export {
  postNearbySpots,
  searchSpots,
  getSpotById,
  updateAttraction,
  deleteAttraction,
};
