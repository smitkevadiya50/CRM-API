require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors'); 

// Routes
const employeeRoutes = require('./src/routes/employeeRoutes');
const siteRoutes = require('./src/routes/siteRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.use('/employee', employeeRoutes);
app.use('/site', siteRoutes);
app.use('/category', categoryRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
