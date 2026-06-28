const express = require('express');
const router = express.Router();
const ecommerceController = require('../controllers/ecommerceController');

router.get('/', ecommerceController.getHomePage);
router.get('/search', ecommerceController.searchProducts);
router.get('/categoria/:cat', ecommerceController.getCategoryPage);
router.get('/producto/:id', ecommerceController.getProductPage);
router.get('/lang/:lang', ecommerceController.changeLanguage);
router.post('/api/checkout', ecommerceController.processCheckout);

module.exports = router;
