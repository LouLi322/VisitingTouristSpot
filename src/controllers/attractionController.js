const Attraction = require("../models/Attraction");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

// ?Desc: Add a new attraction
// ?Route POST /attractions
// ?Access Private

// ?Desc: Get all attraction with filtering, sorting and pagination
// ?Route GET /attractions?page=1&limit=10&query=tutorials&sortBy=views&sortType=desc&userId=1234
// ?Access Public

// ?Desc: Get attraction detail by ID
// ?Route GET /attractions/:attractionID
// ?Access Public

// ?Desc: Update attraction details
// ?Route PATCH /attractions/:attractionID
// ?Access Private

// ?Desc: Delete a attraction and its associated files
// ?Route DELETE /attractions/:attractionID
// ?Access Private
