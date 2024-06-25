const express = require('express');
const router = express.Router();

// Import controller
const {getAttendance, markStartTime, markEndTime, getCurrentMonthData} = require('../controller/attendanceController');

// Define routes
router.get('/', getAttendance);
router.post('/start', markStartTime);
router.post('/end', markEndTime);
router.get('/get-current-month-data', getCurrentMonthData);

// Export the router
module.exports = router;
