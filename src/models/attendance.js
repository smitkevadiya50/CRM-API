const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Employee',
    required: true,
  },
  site_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Site',
    required: true,
  },
  start_time: {
    type: String,
    required: true,
  },
  end_time: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
