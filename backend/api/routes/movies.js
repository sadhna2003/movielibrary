const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const authMiddleware = require("../middleware/auth");
const adminMiddleware = require("../middleware/admin");
// Protected routes (require JWT)
// GET /movies/list
router.get("/list", movieController.getAllMovies);
// POST /movies/add
router.post("/add", authMiddleware, adminMiddleware, movieController.addMovie);

// GET /movies/:id
router.get("/:id", movieController.getMovieById);
// PUT /movies/:id
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  movieController.updateMovie
);
// DELETE /movies/:id
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  movieController.deleteMovie
);

module.exports = router;
