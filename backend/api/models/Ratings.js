const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    movieId: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        required:false,
        default: Date.now,
    },
});
    

module.exports = mongoose.model("Ratings", ratingSchema);