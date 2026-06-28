const Product = require('../models/Product');
const mongoose = require('mongoose');

const fallbackProducts = [
    // Paisajes
    { _id: 'm1', nameKey: "products.m1.name", descriptionKey: "products.m1.desc", price: 49.99, category: 'paisajes', sizes: ['Pequeño', 'Mediano', 'Grande'], imageUrl: "https://picsum.photos/id/10/600/800", isNewArrival: true, rating: 4.5 },
    { _id: 'm2', nameKey: "products.m2.name", descriptionKey: "products.m2.desc", price: 59.99, category: 'paisajes', sizes: ['Mediano', 'Grande'], imageUrl: "https://picsum.photos/id/11/600/800", isNewArrival: false, rating: 4.0 },
    { _id: 'm3', nameKey: "products.m3.name", descriptionKey: "products.m3.desc", price: 89.99, category: 'paisajes', sizes: ['Pequeño', 'Mediano', 'Grande'], imageUrl: "https://picsum.photos/id/12/600/800", isNewArrival: true, rating: 5.0 },
    { _id: 'm4', nameKey: "products.m4.name", descriptionKey: "products.m4.desc", price: 34.99, category: 'paisajes', sizes: ['Mediano', 'Grande'], imageUrl: "https://picsum.photos/id/13/600/800", isNewArrival: false, rating: 3.5 },
    { _id: 'm5', nameKey: "products.m5.name", descriptionKey: "products.m5.desc", price: 65.00, category: 'paisajes', sizes: ['Pequeño', 'Mediano', 'Grande'], imageUrl: "https://picsum.photos/id/14/600/800", isNewArrival: false, rating: 4.8 },
    { _id: 'm6', nameKey: "products.m6.name", descriptionKey: "products.m6.desc", price: 95.00, category: 'paisajes', sizes: ['Mediano', 'Grande'], imageUrl: "https://picsum.photos/id/15/600/800", isNewArrival: true, rating: 4.9 },
    { _id: 'm7', nameKey: "products.m7.name", descriptionKey: "products.m7.desc", price: 42.99, category: 'paisajes', sizes: ['Pequeño', 'Mediano', 'Grande'], imageUrl: "https://picsum.photos/id/16/600/800", isNewArrival: false, rating: 4.2 },
    { _id: 'm8', nameKey: "products.m8.name", descriptionKey: "products.m8.desc", price: 49.99, category: 'paisajes', sizes: ['Pequeño', 'Mediano', 'Grande'], imageUrl: "https://picsum.photos/id/17/600/800", isNewArrival: false, rating: 4.4 },
    
    // Abstracto
    { _id: 'w1', nameKey: "products.w1.name", descriptionKey: "products.w1.desc", price: 39.99, category: 'abstracto', sizes: ['Pequeño', 'Mediano'], imageUrl: "https://picsum.photos/id/18/600/800", isNewArrival: false, rating: 4.6 },
    { _id: 'w2', nameKey: "products.w2.name", descriptionKey: "products.w2.desc", price: 69.99, category: 'abstracto', sizes: ['Pequeño', 'Mediano', 'Grande'], imageUrl: "https://picsum.photos/id/19/600/800", isNewArrival: true, rating: 4.9 },
    { _id: 'w3', nameKey: "products.w3.name", descriptionKey: "products.w3.desc", price: 45.99, category: 'abstracto', sizes: ['Pequeño', 'Mediano', 'Grande'], imageUrl: "https://picsum.photos/id/20/600/800", isNewArrival: false, rating: 4.3 },
    { _id: 'w4', nameKey: "products.w4.name", descriptionKey: "products.w4.desc", price: 79.99, category: 'abstracto', sizes: ['Pequeño', 'Mediano', 'Grande'], imageUrl: "https://picsum.photos/id/21/600/800", isNewArrival: true, rating: 4.8 },
    { _id: 'w5', nameKey: "products.w5.name", descriptionKey: "products.w5.desc", price: 55.00, category: 'abstracto', sizes: ['Pequeño', 'Mediano'], imageUrl: "https://picsum.photos/id/22/600/800", isNewArrival: false, rating: 4.1 },
    { _id: 'w6', nameKey: "products.w6.name", descriptionKey: "products.w6.desc", price: 29.99, category: 'abstracto', sizes: ['Pequeño', 'Mediano'], imageUrl: "https://picsum.photos/id/23/600/800", isNewArrival: true, rating: 4.7 },
    { _id: 'w7', nameKey: "products.w7.name", descriptionKey: "products.w7.desc", price: 59.99, category: 'abstracto', sizes: ['Pequeño', 'Mediano', 'Grande'], imageUrl: "https://picsum.photos/id/24/600/800", isNewArrival: false, rating: 4.5 },
    { _id: 'w8', nameKey: "products.w8.name", descriptionKey: "products.w8.desc", price: 120.00, category: 'abstracto', sizes: ['Pequeño', 'Mediano', 'Grande'], imageUrl: "https://picsum.photos/id/25/600/800", isNewArrival: true, rating: 5.0 },
    
    // Fotografía
    { _id: 'a1', nameKey: "products.a1.name", descriptionKey: "products.a1.desc", price: 29.99, category: 'fotografia', sizes: ['Única'], imageUrl: "https://picsum.photos/id/26/600/800", isNewArrival: true, rating: 4.4 },
    { _id: 'a2', nameKey: "products.a2.name", descriptionKey: "products.a2.desc", price: 19.99, category: 'fotografia', sizes: ['Única'], imageUrl: "https://picsum.photos/id/27/600/800", isNewArrival: false, rating: 4.2 },
    { _id: 'a3', nameKey: "products.a3.name", descriptionKey: "products.a3.desc", price: 25.00, category: 'fotografia', sizes: ['Única'], imageUrl: "https://picsum.photos/id/28/600/800", isNewArrival: true, rating: 4.8 },
    { _id: 'a4', nameKey: "products.a4.name", descriptionKey: "products.a4.desc", price: 15.99, category: 'fotografia', sizes: ['Única'], imageUrl: "https://picsum.photos/id/29/600/800", isNewArrival: false, rating: 3.9 },
    { _id: 'a5', nameKey: "products.a5.name", descriptionKey: "products.a5.desc", price: 22.50, category: 'fotografia', sizes: ['Única'], imageUrl: "https://picsum.photos/id/30/600/800", isNewArrival: true, rating: 4.7 },
    { _id: 'a6', nameKey: "products.a6.name", descriptionKey: "products.a6.desc", price: 18.00, category: 'fotografia', sizes: ['Única'], imageUrl: "https://picsum.photos/id/31/600/800", isNewArrival: false, rating: 4.3 },
    { _id: 'a7', nameKey: "products.a7.name", descriptionKey: "products.a7.desc", price: 14.99, category: 'fotografia', sizes: ['Única'], imageUrl: "https://picsum.photos/id/32/600/800", isNewArrival: false, rating: 4.6 },
    { _id: 'a8', nameKey: "products.a8.name", descriptionKey: "products.a8.desc", price: 25.00, category: 'fotografia', sizes: ['Única'], imageUrl: "https://picsum.photos/id/33/600/800", isNewArrival: false, rating: 4.5 }
];

async function fetchProducts() {
    try {
        if (mongoose.connection.readyState !== 1) {
            return fallbackProducts;
        }
        let p = await Product.find().lean();
        if (p.length === 0) return fallbackProducts;
        return p;
    } catch(err) {
        return fallbackProducts;
    }
}

exports.getHomePage = async (req, res) => {
    try {
        const products = await fetchProducts();
        
        const paisajesProducts = products.filter(p => p.category === 'paisajes');
        const abstractoProducts = products.filter(p => p.category === 'abstracto');
        const fotografiaProducts = products.filter(p => p.category === 'fotografia');
        
        res.render('home', {
            title: req.t('home.title'),
            paisajesProducts, abstractoProducts, fotografiaProducts,
            lang: req.language || 'es', t: req.t
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno");
    }
};

exports.getProductPage = async (req, res) => {
    try {
        const products = await fetchProducts();
        const product = products.find(p => p._id.toString() === req.params.id);
        
        if (!product) return res.status(404).send("Producto no encontrado");

        res.render('product', {
            title: req.t(product.nameKey),
            product,
            lang: req.language || 'es', t: req.t
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno");
    }
};

exports.searchProducts = async (req, res) => {
    try {
        const query = req.query.q || '';
        const lowerQuery = query.toLowerCase();
        const products = await fetchProducts();
        
        const filteredProducts = products.filter(p => {
            const name = req.t(p.nameKey).toLowerCase();
            const desc = req.t(p.descriptionKey).toLowerCase();
            return name.includes(lowerQuery) || desc.includes(lowerQuery);
        });

        res.render('search', {
            title: "Resultados de Búsqueda",
            searchQuery: query,
            products: filteredProducts,
            lang: req.language || 'es', t: req.t
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno");
    }
};

exports.getCategoryPage = async (req, res) => {
    try {
        const cat = req.params.cat;
        let products = await fetchProducts();
        
        const filtered = products.filter(p => p.category === cat);
        
        let catTitle = cat.toUpperCase();
        if(cat === 'paisajes') catTitle = req.t('nav.landscapes');
        if(cat === 'abstracto') catTitle = req.t('nav.abstract');
        if(cat === 'fotografia') catTitle = req.t('nav.photography');
        
        res.render('category', {
            title: catTitle,
            categoryTitle: catTitle,
            products: filtered
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error del servidor");
    }
};

exports.changeLanguage = (req, res) => {
    res.cookie('i18next', req.params.lang);
    const referer = req.get('Referer');
    if (referer && !referer.includes('/lang/')) {
        res.redirect(referer);
    } else {
        res.redirect('/');
    }
};

exports.processCheckout = async (req, res) => {
    try {
        const cart = req.body.cart || [];
        if (cart.length === 0) return res.status(400).json({ error: "Carrito vacío" });
        
        // Simulamos un retraso de red para que se vea el spinner de "Procesando pago..."
        setTimeout(() => {
            res.json({ success: true });
        }, 1500);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en checkout" });
    }
};
