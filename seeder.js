require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectDB = require('./config/db');

const products = [
    // Paisajes
    { nameKey: "products.m1.name", descriptionKey: "products.m1.desc", price: 49.99, category: 'paisajes', sizes: ['M', 'L', 'XL'], imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop", isNewArrival: true },
    { nameKey: "products.m2.name", descriptionKey: "products.m2.desc", price: 59.99, category: 'paisajes', sizes: ['L', 'XL', 'XXL'], imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600&auto=format&fit=crop", isNewArrival: false },
    { nameKey: "products.m3.name", descriptionKey: "products.m3.desc", price: 89.99, category: 'paisajes', sizes: ['S', 'M', 'L'], imageUrl: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=600&auto=format&fit=crop", isNewArrival: true },
    { nameKey: "products.m4.name", descriptionKey: "products.m4.desc", price: 34.99, category: 'paisajes', sizes: ['M', 'L'], imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&auto=format&fit=crop", isNewArrival: false },
    { nameKey: "products.m5.name", descriptionKey: "products.m5.desc", price: 65.00, category: 'paisajes', sizes: ['M', 'L', 'XL'], imageUrl: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=600&auto=format&fit=crop", isNewArrival: false },
    { nameKey: "products.m6.name", descriptionKey: "products.m6.desc", price: 95.00, category: 'paisajes', sizes: ['L', 'XL'], imageUrl: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=600&auto=format&fit=crop", isNewArrival: true },
    { nameKey: "products.m7.name", descriptionKey: "products.m7.desc", price: 42.99, category: 'paisajes', sizes: ['M', 'L', 'XL'], imageUrl: "https://images.unsplash.com/photo-1624378439575-d1ead6bb17f8?q=80&w=600&auto=format&fit=crop", isNewArrival: false },
    { nameKey: "products.m8.name", descriptionKey: "products.m8.desc", price: 49.99, category: 'paisajes', sizes: ['M', 'L', 'XL'], imageUrl: "https://images.unsplash.com/photo-1610260714777-a51ed10ed98c?q=80&w=600&auto=format&fit=crop", isNewArrival: false },
    
    // Abstracto
    { nameKey: "products.w1.name", descriptionKey: "products.w1.desc", price: 39.99, category: 'abstracto', sizes: ['S', 'M'], imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop", isNewArrival: false },
    { nameKey: "products.w2.name", descriptionKey: "products.w2.desc", price: 69.99, category: 'abstracto', sizes: ['S', 'M', 'L'], imageUrl: "https://images.unsplash.com/photo-1550614000-4b95d466e08d?q=80&w=600&auto=format&fit=crop", isNewArrival: true },
    { nameKey: "products.w3.name", descriptionKey: "products.w3.desc", price: 45.99, category: 'abstracto', sizes: ['XS', 'S', 'M'], imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=600&auto=format&fit=crop", isNewArrival: false },
    { nameKey: "products.w4.name", descriptionKey: "products.w4.desc", price: 79.99, category: 'abstracto', sizes: ['S', 'M', 'L'], imageUrl: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=600&auto=format&fit=crop", isNewArrival: true },
    { nameKey: "products.w5.name", descriptionKey: "products.w5.desc", price: 55.00, category: 'abstracto', sizes: ['S', 'M'], imageUrl: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=600&auto=format&fit=crop", isNewArrival: false },
    { nameKey: "products.w6.name", descriptionKey: "products.w6.desc", price: 29.99, category: 'abstracto', sizes: ['S', 'M'], imageUrl: "https://images.unsplash.com/photo-1514311548104-ae305aac4af8?q=80&w=600&auto=format&fit=crop", isNewArrival: true },
    { nameKey: "products.w7.name", descriptionKey: "products.w7.desc", price: 59.99, category: 'abstracto', sizes: ['S', 'M', 'L'], imageUrl: "https://images.unsplash.com/photo-1509631179647-0c50005a8d9a?q=80&w=600&auto=format&fit=crop", isNewArrival: false },
    { nameKey: "products.w8.name", descriptionKey: "products.w8.desc", price: 120.00, category: 'abstracto', sizes: ['S', 'M', 'L'], imageUrl: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=600&auto=format&fit=crop", isNewArrival: true },
    
    // Fotografía
    { nameKey: "products.a1.name", descriptionKey: "products.a1.desc", price: 29.99, category: 'fotografia', sizes: ['Unica'], imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop", isNewArrival: true },
    { nameKey: "products.a2.name", descriptionKey: "products.a2.desc", price: 19.99, category: 'fotografia', sizes: ['Unica'], imageUrl: "https://images.unsplash.com/photo-1590845947698-8924d7409b56?q=80&w=600&auto=format&fit=crop", isNewArrival: false },
    { nameKey: "products.a3.name", descriptionKey: "products.a3.desc", price: 25.00, category: 'fotografia', sizes: ['Unica'], imageUrl: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=600&auto=format&fit=crop", isNewArrival: true },
    { nameKey: "products.a4.name", descriptionKey: "products.a4.desc", price: 15.99, category: 'fotografia', sizes: ['Unica'], imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop", isNewArrival: false },
    { nameKey: "products.a5.name", descriptionKey: "products.a5.desc", price: 22.50, category: 'fotografia', sizes: ['Unica'], imageUrl: "https://images.unsplash.com/photo-1542280756-74b2f55e73e1?q=80&w=600&auto=format&fit=crop", isNewArrival: true },
    { nameKey: "products.a6.name", descriptionKey: "products.a6.desc", price: 18.00, category: 'fotografia', sizes: ['Unica'], imageUrl: "https://images.unsplash.com/photo-1599643478524-fb66f7f6f2dc?q=80&w=600&auto=format&fit=crop", isNewArrival: false },
    { nameKey: "products.a7.name", descriptionKey: "products.a7.desc", price: 14.99, category: 'fotografia', sizes: ['Unica'], imageUrl: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=600&auto=format&fit=crop", isNewArrival: false },
    { nameKey: "products.a8.name", descriptionKey: "products.a8.desc", price: 25.00, category: 'fotografia', sizes: ['Unica'], imageUrl: "https://images.unsplash.com/photo-1626497764746-6dc36546b388?q=80&w=600&auto=format&fit=crop", isNewArrival: false }
];

const seedDB = async () => {
    await connectDB();
    try {
        await Product.deleteMany();
        await Product.insertMany(products);
        console.log("✅ BD poblada con 24 productos en total");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error en seeding:", error);
        process.exit(1);
    }
};
seedDB();
