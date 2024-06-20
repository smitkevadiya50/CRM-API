const express = require('express');
const router = express.Router();

// Import controller
const { getEmployee, addEmployee, deleteEmployee, updateEmployee,getEmployeeByCategoryId} = require('../controller/employeeController');

// Define routes
router.get('/', getEmployee);
router.get('/by-category', getEmployeeByCategoryId);
router.post('/', addEmployee);
router.delete('/:id', deleteEmployee);
router.put('/:id', updateEmployee);

  

// Export the router
module.exports = router;
