const Site = require('../models/site');
const Attendance = require('../models/attendance');
const {saveImageFile, deleteImageFile} = require('./imageUploadController')

const getSite = async (req, res) => {
    try {
        const site = await Site.find();
        res.status(200).json(site);
    } catch (error) {
        res.status(500).send(error);
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
    deleteSite
};
