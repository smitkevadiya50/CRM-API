const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();

const upload = multer({ storage: storage }).fields([{ name: 'site_photo' }]);

const {getSitePhots,addSitePhots} = require('../controller/sitePhotosController');

//Get Site photos by the Site_id and the date
router.get("/",getSitePhots);

//add Site photo: site_id,date
router.post("/",upload,addSitePhots);

module.exports = router;