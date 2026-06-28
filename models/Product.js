const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    nameKey: { type: String, required: true },
    descriptionKey: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, enum: ['hombres', 'mujeres', 'accesorios'], required: true },
    sizes: [{ type: String }],
    imageUrl: { type: String, required: true },
    isNewArrival: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
