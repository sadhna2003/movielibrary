const Movie = require("../models/Movie"); // Make sure the model name matches your file

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    const list = movies.map((movie) => ({
      id: movie._id,
      title: movie.title,
      genre: movie.genre,
      released_year: movie.released_year,
      rating: movie.rating,
      poster_url: movie.poster_url,
      description: movie.description,
      duration: movie.duration,
      cast: movie.cast,
      director: movie.director,
    }))
    res.status(201).json({movies: list });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.addMovie = async (req, res) => {
  const {
    title,
    genre,
    released_year,
    rating,
    poster_url,
    description,
    duration,
    cast,
    director,
  } = req.body;
  try {
    const existingMovie = await Movie.findOne({ title });
    if (existingMovie) {
      return res.status(400).json({ message: "Movie already exists" });
    } else {
      const movie = new Movie({
        title,
        genre,
        released_year,
        rating,
        poster_url,
        description,
        duration,
        cast,
        director,
      });
      await movie.save();
      const savedMovie = {
        id: movie._id,
        title: movie.title,
        genre: movie.genre,
        released_year: movie.released_year,
        rating: movie.rating,
        poster_url: movie.poster_url,
        description: movie.description,
        duration: movie.duration,
        cast: movie.cast,
        director: movie.director,
      };
      res.status(201).json({
        message: "Movie added successfully",
        movie: savedMovie,
      });
    }
  } catch (err) {
    console.log(err, "error while adding");
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    const selectedMovie = {
      id: movie._id,
      title: movie.title,
      genre: movie.genre,
      released_year: movie.released_year,
      rating: movie.rating,
      poster_url: movie.poster_url,
      description: movie.description,
      duration: movie.duration,
      cast: movie.cast,
      director: movie.director,
    };
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res
      .status(201)
      .json({ message: "Movie found successfully", movie: selectedMovie });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    // console.log(req.body);
    movie.title = req.body.title;
    movie.genre = req.body.genre;
    movie.released_year = req.body.released_year;
    movie.rating = req.body.rating;
    movie.poster_url = req.body.poster_url;
    movie.description = req.body.description;
    movie.duration = req.body.duration;
    movie.cast = req.body.cast;
    movie.director = req.body.director;
    await movie.save();
    const updatedMovie = {
      id: movie._id,
      title: movie.title,
      genre: movie.genre,
      released_year: movie.released_year,
      rating: movie.rating,
      poster_url: movie.poster_url,
      description: movie.description,
      duration: movie.duration,
      cast: movie.cast,
      director: movie.director,
    };
    res
      .status(201)
      .json({ message: "Movie updated successfully", movie: updatedMovie });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    await movie.deleteOne();
    res.status(201).json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
