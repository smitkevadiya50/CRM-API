const SitePhotos = require('../models/sitePhotos');
const {saveImageFile} = require('./imageUploadController')

//Get Site photos by the Site_id and the date
const getSitePhots = async (req, res) => {
    try {
        const {site_id, date } = req.body;
        const startOfDay = new Date(date);

        const sitePhotos = await SitePhotos.find({
            site_id: site_id,
            uploadDate: startOfDay
        });
        res.status(200).json({sitePhotos});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//add Site photo: site_id,date
const addSitePhots = async (req, res) => {
    try {
        const {site_id, date} = req.body;
        const sitePhotoFile = req.files && req.files['site_photo'] ? req.files['site_photo'][0] : null;

        const sitePhotos = SitePhotos({
            site_id: site_id,
            uploadDate: date
        });

        const sitePhotosPath = await saveImageFile('site', `${sitePhotos._id}`, sitePhotoFile);
        sitePhotos.url = process.env.BASE_URL + sitePhotosPath.filePath;

        const savedSitePhotos = await sitePhotos.save();

        res.status(200).json({savedSitePhotos});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {getSitePhots,addSitePhots};