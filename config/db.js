const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ai_ecommerce';
        const conn = await mongoose.connect(uri);
        console.log(`📦 MongoDB Conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error de conexión a MongoDB: ${error.message}`);
        console.warn("⚠️ La aplicación seguirá ejecutándose para permitir renderizado estático de fallback.");
    }
};

module.exports = connectDB;
