const mongoose = require('mongoose');

const sitePhotosSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  site_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site',
    required: true
},
  uploadDate: {
    type: Date
  }
});

const SitePhotos = mongoose.model('SitePhotos', sitePhotosSchema);

module.exports = SitePhotos;
