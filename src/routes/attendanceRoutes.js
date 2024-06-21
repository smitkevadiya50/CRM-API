const express = require('express');
const router = express.Router();

// Import controller
const {getAttendance, markStartTime, markEndTime} = require('../controller/attendanceController');

// Define routes
router.post('/start', markStartTime);
router.post('/end', markEndTime);

  

// Export the router
module.exports = router;
