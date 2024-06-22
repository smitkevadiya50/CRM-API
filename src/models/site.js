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
    ref: 'Employee'
  },
  manager: {
    type: mongoose.Schema.ObjectId,
    ref: 'Employee'
  },
  worker: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Employee'
  },
  helper: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Employee'
  },
  joining_date: {
    type: Date,
    required: true,
  },
  ending_date: {
    type: Date,
    required: true,
  },
  start_time:{
    type: String,
    required: true,
  },
  end_time: {
    type: String,
    required: true,
  },
  site_logo: {
    type: String,
    required: true,
  },
});

const Site = mongoose.model('Site', siteSchema);

module.exports = Site;