const Attendance = require('../models/attendance');
const Site = require('../models/site');
const Employee = require('../models/employee');

const getAttendance = async (req, res) => {
    try {
        const { site_id, date } = req.query;
    
        if (!site_id || !date) {
          return res.status(400).json({ message: 'Site ID and date are required' });
        }
    
        const startOfDay = new Date(date).setHours(0, 0, 0, 0);
        const endOfDay = new Date(date).setHours(23, 59, 59, 999);
    
        // Find attendance records
        const attendanceRecords = await Attendance.find({
          site_id,
          date: { $gte: startOfDay, $lt: endOfDay }
        }).populate('employee_id');  // Populate employee details
    
        // Map through attendance records to include employee details
        const detailedAttendance = await Promise.all(attendanceRecords.map(async (record) => {
          const employee = await Employee.findById(record.employee_id).populate('category');
          return {
            _id: record._id,
            employee_id: employee._id,
            start_time: record.start_time,
            end_time: record.end_time,
            date: record.date,
            employee_name: employee.name,
            employee_category: employee.category.name,
            employee_photo: employee.photo,
          };
        }));
    
        res.status(200).json(detailedAttendance);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

// Helper function to find site by employee ID
const findSiteByEmployeeId = async (employee_id) => {
  let site = await Site.findOne({ supervisor: employee_id });
  if (!site) {
    site = await Site.findOne({ worker: employee_id });
  }
  if (!site) {
    site = await Site.findOne({ helper: employee_id });
  }
  if (!site) {
    site = await Site.findOne({ manager: employee_id });
  }
  return site;
};

// Mark the start time when an employee arrives
const markStartTime = async (req, res) => {
  try {
    const { employee_id, start_time } = req.body;

     // Set the date to the current date in IST
     const currentDate = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });

    // Find the site by employee ID
    const site = await findSiteByEmployeeId(employee_id);
    if (!site) {
      return res.status(404).json({ message: 'Site not found for the employee' });
    }

    const site_id = site._id;

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
      date: new Date(currentDate).setHours(0, 0, 0, 0)
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
    const { employee_id, end_time } = req.body;

    // Find the site by employee ID
    const site = await findSiteByEmployeeId(employee_id);
    if (!site) {
      return res.status(404).json({ message: 'Site not found for the employee' });
    }

    const site_id = site._id;

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
