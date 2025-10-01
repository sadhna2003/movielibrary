const Rating = require("../models/Ratings"); // Make sure the model name matches your file
const Movie = require("../models/Movie"); // Make sure the model name matches your file
const { recalcMovieRating } = require("../utils/recalcMovieRating");
exports.addRating = async (req, res) => {
  const { userId, movieId, rating } = req.body;
  try {
    const existedRatingByUserForMovie = await Rating.findOne({
      userId,
      movieId,
    });
    if (existedRatingByUserForMovie) {
      const newrating = {
        userId: existedRatingByUserForMovie.userId,
        movieId: existedRatingByUserForMovie.movieId,
        rating: rating,
      };
      await Rating.updateOne({ userId, movieId }, { $set: newrating });
      // Call the common function
      const { averageRating, totalRatings } = await recalcMovieRating(movieId);
      return res.status(201).json({ message: "Rating updated successfully" });
    } else {
      const newRating = new Rating({ userId, movieId, rating });
      await newRating.save();
      // Call the common function
      const { averageRating, totalRatings } = await recalcMovieRating(movieId);
      res.status(201).json({ message: "Rating added successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getRatingByMovieId = async (req, res) => {
  const { movieId } = req.params;
  try {
    const rating = await Rating.find({ movieId });
    if (!ratings || ratings.length === 0) {
      return res
        .status(404)
        .json({ message: "No ratings found for this movie" });
    }

    // calculate average
    const total = ratings.reduce((sum, r) => sum + r.rating, 0);
    const avg = total / ratings.length;

    // update movie's rating field
    const movie = await Movie.findById(movieId);
    movie.rating = avg;
    res.status(200).json({ message: "Rating found successfully", movie });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// exports.getRatingByMovieId = async (userId, movieId) => {
//   try {
//     const rating = await Rating.findOne({ userId, movieId });
//     if (!rating) {
//       return res.status(404).json({ message: "Rating not found" });
//     }
//     const movie = await Movie.findById(movieId);
//     movie.rating = rating.rating;
//     res.status(200).json({ message: "Rating found successfully", movie });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };
