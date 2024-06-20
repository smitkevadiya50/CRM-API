const express = require('express');
const router = express.Router();

// Import controller
const { getSite, addSite, updateSite, deleteSite } = require('../controller/siteController');

// Define routes
router.get('/', getSite);
router.post('/', addSite);
router.put('/:id', updateSite);
router.delete('/:id', deleteSite);
  

// Export the router
module.exports = router;
