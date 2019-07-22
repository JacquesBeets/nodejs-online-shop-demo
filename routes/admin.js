const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();


// GET
router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts);

router.get('/edit-product/:productId', adminController.getEditProduct);

// POST
router.post('/add-product', adminController.getEditProduct);
router.post('/edit-product');

module.exports = router;
