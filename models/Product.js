const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    nameKey: { type: String, required: true },
    descriptionKey: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, enum: ['paisajes', 'abstracto', 'fotografia'], required: true },
    sizes: [{ type: String }],
    imageUrl: { type: String, required: true },
    isNewArrival: { type: Boolean, default: false },
    rating: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
