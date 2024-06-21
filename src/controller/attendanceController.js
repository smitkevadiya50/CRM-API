const Attendance = require('../models/attendance');

const getAttendance = async (req, res) => {
    try {
        const site = await Attendance.find();
        res.status(200).json(site);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Mark the start time when an employee arrives
const markStartTime = async (req, res) => {
    try {
      const { employee_id, site_id, start_time } = req.body;
  
      // Check if there is already an attendance record for today for the employee at the site
      let attendance = await Attendance.findOne({
        employee_id,
        site_id,
        date: { $gte: new Date().setHours(0, 0, 0, 0), $lt: new Date().setHours(23, 59, 59, 999) }
      });
  
      if (attendance) {
        return res.status(400).json({ message: 'Attendance already started for today' });
      }
  
      attendance = new Attendance({
        employee_id,
        site_id,
        start_time,
        end_time: null,
        date: new Date().setHours(0, 0, 0, 0)
      });
  
      await attendance.save();
      res.status(201).json(attendance);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Mark the end time when an employee leaves
  const markEndTime = async (req, res) => {
    try {
      const { employee_id, site_id, end_time } = req.body;
  
      // Find the attendance record for today for the employee at the site
      let attendance = await Attendance.findOne({
        employee_id,
        site_id,
        date: { $gte: new Date().setHours(0, 0, 0, 0), $lt: new Date().setHours(23, 59, 59, 999) }
      });
  
      if (!attendance) {
        return res.status(404).json({ message: 'No attendance record found for today' });
      }
  
      if (attendance.end_time) {
        return res.status(400).json({ message: 'Attendance already ended for today' });
      }
  
      attendance.end_time = end_time;
  
      await attendance.save();
      res.status(200).json(attendance);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = {
    getAttendance,
    markStartTime,
    markEndTime
};
