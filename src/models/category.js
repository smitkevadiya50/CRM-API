const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
