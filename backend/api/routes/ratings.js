const express = require("express");
const router = express.Router();
const movieController = require("../controllers/ratingController");
const authMiddleware = require("../middleware/auth");


// Protected routes (require JWT)
// POST /ratings/add
router.post("/add", authMiddleware, movieController.addRating);

module.exports = router;