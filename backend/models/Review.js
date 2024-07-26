const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    bookname: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true        
        
    },

    
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;