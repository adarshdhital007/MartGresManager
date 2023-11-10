const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/inventory.controller'); 

// Define your routes for product CRUD operations
router.post('/products', ProductController.createProduct);
router.get('/products', ProductController.getAllProduct);
router.get('/products/:productId', ProductController.getProductById);
router.put('/products/:productId', ProductController.updateProduct);
router.delete('/products/:productId', ProductController.deleteProduct);

module.exports = router;
