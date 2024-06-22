const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();

const upload = multer({ storage: storage }).fields([{ name: 'photo' }, { name: 'adhar_photo' }]);

// Import controller
const { getEmployee, addEmployee, deleteEmployee, updateEmployee,getEmployeeByCategoryId} = require('../controller/employeeController');

// Define routes
router.get('/', getEmployee);
router.get('/by-category', getEmployeeByCategoryId);
router.post('/',upload, addEmployee);
router.delete('/:id', deleteEmployee);
router.put('/:id',upload, updateEmployee);

  

// Export the router
module.exports = router;
