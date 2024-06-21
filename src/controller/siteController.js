const Site = require('../models/site');

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

        // Create a new site document
        const newSite = new Site({
            site_name,
            site_location,
            owner_name,
            owner_number,
            supervisor,
            manager,
            worker,
            helper,
            joining_date,
            ending_date,
            start_time,
            end_time,
            site_logo
        });

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
  
      // Extract the update data from the request body
      const updateData = req.body;
  
      // Update the site by ID
      const updatedSite = await Site.findByIdAndUpdate(id, updateData, { new: true });
  
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
