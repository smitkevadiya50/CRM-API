const Employee = require('../models/employee');

const getEmployee = async (req, res) => {
    try {
        // Fetch all employees without populating category
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addEmployee = async (req, res) => {
    try {
        const { name, reference_name, age, number,address, category, joining_date, photo, adhar_photo } = req.body;

        // Create a new employee document
        const newEmployee = new Employee({
            name,
            reference_name,
            age,
            number,
            address,
            category,
            joining_date,
            photo,
            adhar_photo
        });

        // Save the employee document to the database
        const savedEmployee = await newEmployee.save();

        // Send the saved employee as the response
        res.status(201).json(savedEmployee);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

const deleteEmployee = async (req, res) => {
    try {
        // Extract the employee ID from the request parameters
        const { id } = req.params;

        // Delete the employee by ID
        const deletedEmployee = await Employee.findByIdAndDelete(id);

        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: "Employee Deleted!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateEmployee = async (req, res) => {
    try {
      // Extract the employee ID from the request parameters
      const { id } = req.params;
  
      // Extract the update data from the request body
      const updateData = req.body;
  
      // Update the employee by ID
      const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, { new: true });
  
      if (!updatedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.status(200).json(updatedEmployee);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const getEmployeeByCategoryId = async (req, res) => {
    try {
      const supervisorCategoryId = '66737bd17ca8abd0e8dbaee9';
      const managerCategoryId = '66737bbc7ca8abd0e8dbaee7';
      const workerCategoryId = '66737b647ca8abd0e8dbaee4';
      const helperCategoryId = '667467adb1f1a69a1f7b17d7';
  
      // Fetch employees by category
      const supervisors = await Employee.find({ category: supervisorCategoryId });
      const managers = await Employee.find({ category: managerCategoryId });
      const worker = await Employee.find({ category: workerCategoryId });
      const helper = await Employee.find({ category: helperCategoryId });
  
      res.status(200).json({ supervisors, managers, worker, helper });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };  
  


module.exports = {
    getEmployee,
    addEmployee,
    deleteEmployee,
    updateEmployee,
    getEmployeeByCategoryId
};
