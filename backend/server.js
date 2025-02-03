require('dotenv').config();
const path = require('path');
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

app.use(cors()); 
app.use(express.json()); 

// Connect to MongoDB
connectDB();

// Import Routes
app.use('/api/games', require('./routes/gameRoutes'));
app.use('/images', express.static(path.join(__dirname, 'images')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
