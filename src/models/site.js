const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
  site_name: {
    type: String,
    required: true,
  },
  site_location: {
    type: String,
    required: true,
  },
  owner_name: {
    type: String,
    required: true,
  },
  owner_number: {
    type: String,
    required: true,
  },
  supervisor: {
    type: mongoose.Schema.ObjectId,
    ref: 'Employee',
    required: true,
  },
  manager: {
    type: mongoose.Schema.ObjectId,
    ref: 'Employee',
    required: true,
  },
  worker: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Employee',
    required: true,
  },
  helper: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Employee',
    required: true,
  },
  joining_date: {
    type: Date,
    required: true,
  },
  ending_date: {
    type: Date,
    required: true,
  },
  site_logo: {
    type: String,
    required: true,
  },
});

const Site = mongoose.model('Site', siteSchema);

module.exports = Site;