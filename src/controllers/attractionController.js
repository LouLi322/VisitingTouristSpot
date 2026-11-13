import appConfig from "../config/appConfig.js";
import Attraction from "../models/Attraction.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// Desc: Post nearby spots(place/attraction) with filtering
// Route Post /api/attractions/nearby
// Access Public
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
  const response = await fetch(
    "https://places.googleapis.com/v1/places:searchNearby",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.primaryType,places.types,places.regularOpeningHours,places.photos",
        ...(typeof SOLUTION_ID !== "undefined" && {
          "X-Goog-Maps-Solution-ID": SOLUTION_ID,
        }),
      },
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

// Desc: Post searching spots(place/attraction) with filtering, radius and sorting
// Route POST /api/attractions/search?textquery=cafe&pagesize=15
// Access Public
const searchSpots = async (req, res) => {
  const apiKey = appConfig.mapsApiKey;
  const { textQuery, locationBias, pageSize = 15 } = req.body;
  if (!textQuery || typeof textQuery !== "string") {
    throw new ApiError(400, "the textQuery is required");
  }
  const payload = {
    textQuery,
    pageSize: Math.min(pageSize, 20),
  };
  if (locationBias && locationBias.center) {
    payload.locationBias = {
      circle: {
        center: {
          latitude: locationBias.center.latitude,
          longitude: locationBias.center.longitude,
        },
        radius: locationBias.radius || 3000.0,
      },
    };
  }
  const response = await fetch(
    "https://places.googleapis.com/v1/places:searchText",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.primaryType,places.types,places.regularOpeningHours,places.photos",
        ...(typeof SOLUTION_ID !== "undefined" && {
          "X-Goog-Maps-Solution-ID": SOLUTION_ID,
        }),
      },
      body: JSON.stringify(payload),
    },
  );
  const data = await response.json();
  if (!response.ok) {
    throw new ApiError(
      response.status,
      data.error?.message || "Error search spots",
    );
  }
  return res
    .status(200)
    .json(new ApiResponse(200, { data }, "The searched spots successfully"));
};

// Desc: Get all attractions
// Route GET /api/attractions
// Access Public
const getAttractions = async (req, res) => {
  const docs = await Attraction.find({}).sort({ createdAt: -1 }).lean();
  const attractions = docs.map((doc) => ({
    ...doc,
    id: doc._id.toString(),
  }));
  return res
    .status(200)
    .json(
      new ApiResponse(200, { attractions }, "Attractions fetched successfully"),
    );
};

// ?Desc: Add a new attraction with tags
// ?Route POST /api/attractions
// ?Access Private
const postNewAttraction = async (req, res) => {};

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
  getAttractions,
  updateAttraction,
  deleteAttraction,
};
