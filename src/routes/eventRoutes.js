const express = require('express');
const router = express.Router();
const {addEvent ,getEventByDate, reminder } = require('../controller/eventController');

// Add Event
router.post('',addEvent);
router.get('/by-date',getEventByDate);
router.get('/reminder',reminder);

module.exports = router;
