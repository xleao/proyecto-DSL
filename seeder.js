require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectDB = require('./config/db');

const products = [
    // Paisajes
    { nameKey: "products.m1.name", descriptionKey: "products.m1.desc", price: 49.99, category: 'paisajes', sizes: ['50x70 cm', '70x100 cm', '100x140 cm'], imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop", isNewArrival: true },
    { nameKey: "products.m2.name", descriptionKey: "products.m2.desc", price: 59.99, category: 'paisajes', sizes: ['70x100 cm', '100x140 cm', '120x160 cm'], imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop", isNewArrival: false },
    { nameKey: "products.m3.name", descriptionKey: "products.m3.desc", price: 89.99, category: 'paisajes', sizes: ['30x40 cm', '50x70 cm', '70x100 cm'], imageUrl: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=600&auto=format&fit=crop", isNewArrival: true },
    { nameKey: "products.m4.name", descriptionKey: "products.m4.desc", price: 34.99, category: 'paisajes', sizes: ['50x70 cm', '70x100 cm'], imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop", isNewArrival: false },
    { nameKey: "products.m5.name", descriptionKey: "products.m5.desc", price: 65.00, category: 'paisajes', sizes: ['50x70 cm', '70x100 cm', '100x140 cm'], imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop", isNewArrival: false },
    { nameKey: "products.m6.name", descriptionKey: "products.m6.desc", price: 95.00, category: 'paisajes', sizes: ['70x100 cm', '100x140 cm'], imageUrl: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?q=80&w=600&auto=format&fit=crop", isNewArrival: true },
    { nameKey: "products.m7.name", descriptionKey: "products.m7.desc", price: 42.99, category: 'paisajes', sizes: ['50x70 cm', '70x100 cm', '100x140 cm'], imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=600&auto=format&fit=crop", isNewArrival: false },
    { nameKey: "products.m8.name", descriptionKey: "products.m8.desc", price: 49.99, category: 'paisajes', sizes: ['50x70 cm', '70x100 cm', '100x140 cm'], imageUrl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=600&auto=format&fit=crop", isNewArrival: false },
    
    // Abstracto
    { nameKey: "products.w1.name", descriptionKey: "products.w1.desc", price: 39.99, category: 'abstracto', sizes: ['30x40 cm', '50x70 cm'], imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop", isNewArrival: false },
    { nameKey: "products.w2.name", descriptionKey: "products.w2.desc", price: 69.99, category: 'abstracto', sizes: ['30x40 cm', '50x70 cm', '70x100 cm'], imageUrl: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=600&auto=format&fit=crop", isNewArrival: true },
    { nameKey: "products.w3.name", descriptionKey: "products.w3.desc", price: 45.99, category: 'abstracto', sizes: ['20x30 cm', '30x40 cm', '50x70 cm'], imageUrl: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=600&auto=format&fit=crop", isNewArrival: false },
    { nameKey: "products.w4.name", descriptionKey: "products.w4.desc", price: 79.99, category: 'abstracto', sizes: ['30x40 cm', '50x70 cm', '70x100 cm'], imageUrl: "https://images.unsplash.com/photo-1502691876148-a84158679d86?q=80&w=600&auto=format&fit=crop", isNewArrival: true },
    { nameKey: "products.w5.name", descriptionKey: "products.w5.desc", price: 55.00, category: 'abstracto', sizes: ['30x40 cm', '50x70 cm'], imageUrl: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=600&auto=format&fit=crop", isNewArrival: false },
    { nameKey: "products.w6.name", descriptionKey: "products.w6.desc", price: 29.99, category: 'abstracto', sizes: ['30x40 cm', '50x70 cm'], imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop", isNewArrival: true },
    { nameKey: "products.w7.name", descriptionKey: "products.w7.desc", price: 59.99, category: 'abstracto', sizes: ['30x40 cm', '50x70 cm', '70x100 cm'], imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600&auto=format&fit=crop", isNewArrival: false },
    { nameKey: "products.w8.name", descriptionKey: "products.w8.desc", price: 120.00, category: 'abstracto', sizes: ['30x40 cm', '50x70 cm', '70x100 cm'], imageUrl: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?q=80&w=600&auto=format&fit=crop", isNewArrival: true },
    
    // Fotografía
    { nameKey: "products.a1.name", descriptionKey: "products.a1.desc", price: 29.99, category: 'fotografia', sizes: ['30x40 cm', '50x70 cm'], imageUrl: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=600&auto=format&fit=crop", isNewArrival: true },
    { nameKey: "products.a2.name", descriptionKey: "products.a2.desc", price: 19.99, category: 'fotografia', sizes: ['30x40 cm', '50x70 cm'], imageUrl: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=600&auto=format&fit=crop", isNewArrival: false },
    { nameKey: "products.a3.name", descriptionKey: "products.a3.desc", price: 25.00, category: 'fotografia', sizes: ['30x40 cm', '50x70 cm'], imageUrl: "https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?q=80&w=600&auto=format&fit=crop", isNewArrival: true },
    { nameKey: "products.a4.name", descriptionKey: "products.a4.desc", price: 15.99, category: 'fotografia', sizes: ['30x40 cm', '50x70 cm'], imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop", isNewArrival: false },
    { nameKey: "products.a5.name", descriptionKey: "products.a5.desc", price: 22.50, category: 'fotografia', sizes: ['30x40 cm', '50x70 cm'], imageUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=600&auto=format&fit=crop", isNewArrival: true },
    { nameKey: "products.a6.name", descriptionKey: "products.a6.desc", price: 18.00, category: 'fotografia', sizes: ['30x40 cm', '50x70 cm'], imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop", isNewArrival: false },
    { nameKey: "products.a7.name", descriptionKey: "products.a7.desc", price: 14.99, category: 'fotografia', sizes: ['30x40 cm', '50x70 cm'], imageUrl: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=600&auto=format&fit=crop", isNewArrival: false },
    { nameKey: "products.a8.name", descriptionKey: "products.a8.desc", price: 25.00, category: 'fotografia', sizes: ['30x40 cm', '50x70 cm'], imageUrl: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=600&auto=format&fit=crop", isNewArrival: false }
];

const seedDB = async () => {
    await connectDB();
    try {
        await Product.deleteMany();
        const productsWithRatings = products.map(product => ({
            ...product,
            rating: parseFloat((Math.random() * (5.0 - 3.0) + 3.0).toFixed(1))
        }));
        await Product.insertMany(productsWithRatings);
        console.log("✅ BD poblada con 24 productos en total con calificaciones aleatorias");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error en seeding:", error);
        process.exit(1);
    }
};
seedDB();
