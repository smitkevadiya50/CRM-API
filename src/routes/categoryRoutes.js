const express = require('express');
const router = express.Router();

// Import controller
const {getCategory, addCategory} = require('../controller/categoryController');

// Define routes
router.get('/', getCategory);
router.post('/', addCategory);

  

// Export the router
module.exports = router;
