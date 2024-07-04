const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();

const upload = multer({ storage: storage }).fields([{ name: 'site_logo' }]);

// Import controller
const { getSite, addSite, updateSite, deleteSite,getSiteByManager } = require('../controller/siteController');

// Define routes
router.get('/', getSite);
router.get('/get-site-by-manager', getSiteByManager);
router.post('/',upload, addSite);
router.put('/:id',upload, updateSite);
router.delete('/:id', deleteSite);
  

// Export the router
module.exports = router;
