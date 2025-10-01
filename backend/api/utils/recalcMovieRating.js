const Rating = require("../models/Ratings");
const Movie = require("../models/Movie");

/**
 * Recalculates average rating for a movie and updates the movie document
 * @param {string} movieId - ID of the movie
 * @returns {Promise<{averageRating: number, totalRatings: number}>}
 */
const recalcMovieRating = async (movieId) => {
  const ratings = await Rating.find({ movieId });

  if (!ratings || ratings.length === 0) {
    // If no ratings, set movie rating to 0 or null
    await Movie.findByIdAndUpdate(movieId, { rating: 0 });
    return { averageRating: 0, totalRatings: 0 };
  }

  const total = ratings.reduce((sum, r) => sum + r.rating, 0);
  const avg = ( total / ratings.length).toFixed(1);

  await Movie.findByIdAndUpdate(movieId, { rating: avg });

  return { averageRating: avg, totalRatings: ratings.length };
};

module.exports = { recalcMovieRating };
