const Category = require('../models/category');

const getCategory = async (req, res) => {
    try {
        // Fetch all Categorys
        const category = await Category.find();
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addCategory = async (req, res) => {
    try {
        const { name } = req.body;

        // Create a new employee document
        const newCategory = new Category({
            name
        });

        // Save the employee document to the database
        const savedCategory = await newCategory.save();

        // Send the saved employee as the response
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

module.exports = {getCategory, addCategory};