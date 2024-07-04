const Site = require('../models/site');
const Attendance = require('../models/attendance');
const Employee = require('../models/employee');
const {saveImageFile, deleteImageFile} = require('./imageUploadController')

const getSite = async (req, res) => {
    try {
        const site = await Site.find();
        res.status(200).json(site);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getSiteByManager = async (req, res) => {

  try {
    const { managerId, date } = req.query;
    const startOfDay = new Date(date).setHours(0, 0, 0, 0);

    const sites = await Site.find({manager: managerId}).populate({
      path: "worker",
      select: "name reference_name photo"
    }).populate({
      path: "helper",
      select: "name reference_name photo"
    }).populate({
      path: "manager",
      select: "name reference_name photo"
    }).populate({
      path: "supervisor",
      select: "name reference_name photo"
    });

    const attendanceRecords = await Attendance.find({ date: startOfDay });
    let siteDetailsList = [];

    for (const site of sites) {
      let siteDetails = {
        site_id: site.id,
        site_name: site.site_name,
        site_location: site.site_location,
        owner_name: site.owner_name,
        owner_number: site.owner_number,
        site_logo: site.site_logo,
        supervisor: site.supervisor,
        manager: site.manager,
        worker: [],
        helper: []
      };
      // Integrate workers with attendance

      for (const worker of site.worker) {
        const workerWithAttendance = {
          ...worker.toObject(),
          attendance: attendanceRecords.find(record => record.employee_id.equals(worker._id) && record.site_id.equals(site._id)) || null
        };
        siteDetails.worker.push(workerWithAttendance);
      }

      // Integrate helpers with attendance
      for (const helper of site.helper) {
        const helperWithAttendance = {
          ...helper.toObject(),
          attendance: attendanceRecords.find(record => record.employee_id.equals(helper._id) && record.site_id.equals(site._id)) || null
        };
        siteDetails.helper.push(helperWithAttendance);
      }
      siteDetailsList.push(siteDetails);
    }
    

    res.status(200).json({"sites":siteDetailsList});    
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const addSite = async (req, res) => {
    try {
        const { site_name, site_location, owner_name, owner_number, supervisor, manager, worker, helper, joining_date, ending_date, start_time, end_time, site_logo } = req.body;
        // Ensure req.files is defined and properly handles missing files
        const logoFile = req.files && req.files['site_logo'] ? req.files['site_logo'][0] : null;

         const workerList = worker ? worker.split(','): [];
         const helperlist = helper ? helper.split(','): [];
         const managerId = manager ? manager : null;
         const supervisorId = supervisor ? supervisor : null;

        console.log(helper);
        // Check if photo file is present
        if (!logoFile) {
          throw new Error('logo file is required');
        }

        // Create a new site document
        const newSite = new Site({
            site_name,
            site_location,
            owner_name,
            owner_number,
            supervisor: supervisorId,
            manager: managerId,
            worker: workerList,
            helper: helperlist,
            joining_date,
            ending_date,
            start_time,
            end_time
        });

        const siteId = newSite._id;

        // Handle logo upload
        const logoPath = await saveImageFile('logo', `${siteId}`, logoFile);
        newSite.site_logo = process.env.BASE_URL + logoPath.filePath;

        // Save the site document to the database
        const savedSite = await newSite.save();

        // Send the saved site as the response
        res.status(201).json(savedSite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateSite = async (req, res) => {
    try {
      // Extract the site ID from the request parameters
      const { id } = req.params;
  
      const { site_name, site_location, owner_name, owner_number, supervisor, manager, worker, helper, joining_date, ending_date, start_time, end_time } = req.body;
      // Ensure req.files is defined and properly handles missing files
      const logoFile = req.files && req.files['site_logo'] ? req.files['site_logo'][0] : null;

      // Check if photo file is present
      if (!logoFile) {
        throw new Error('logo file is required');
      }

      // Handle logo upload
      const logoPath = await saveImageFile('logo', `${id}`, logoFile);
      site_logo = process.env.BASE_URL + logoPath.filePath;
  
      // Update the site by ID
      const updatedSite = await Site.findByIdAndUpdate(id, { 
        site_name, 
        site_location, 
        owner_name, 
        owner_number, 
        supervisor, manager, 
        worker, 
        helper, 
        joining_date, 
        ending_date, 
        start_time, 
        end_time, 
        site_logo 

      }, { new: true });
  
      if (!updatedSite) {
        return res.status(404).json({ message: 'Site not found' });
      }
  
      res.status(200).json(updatedSite);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const deleteSite = async (req, res) => {
    try {
      // Extract the site ID from the request parameters
      const { id } = req.params;

      const deleteSite = await Site.findByIdAndDelete(id);
      deleteImageFile('logo', id);
      await Attendance.deleteMany({ site_id: id });
  
      if (!deleteSite) {
        return res.status(404).json({ message: 'Site not found' });
      }
      res.status(200).json({ message: "Site Deleted!" });
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    addSite,
    getSite,
    updateSite,
    deleteSite,
    getSiteByManager
};
