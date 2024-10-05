const mongoose = require('mongoose');

// Create Category Schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // trim: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        // trim: true
    },
    subcategories: [{
        type: String
    }],
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // }
});

// Create the Category Model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
