const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    released_year: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: false,
    },
    poster_url: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    cast: {
        type: [String],
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
});
    

module.exports = mongoose.model("Movies", movieSchema);