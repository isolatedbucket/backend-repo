require('dotenv').config();
console.log('MONGO_URI from .env:', process.env.MONGO_URI);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/events', require('./routes/eventRoutes')); // Correctly integrate event routes

// The backend should listen on the port provided by Render (process.env.PORT)
const PORT = process.env.PORT || 5000;  // Default to 5000 if not provided
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Add this to the backend server.js to handle the POST request for events
app.post('/events', async (req, res) => {
    const { name, date, time, location, description, capacity, availableSeats } = req.body;
    const newEvent = new Event({
        name,
        date,
        time,
        location,
        description,
        capacity,
        availableSeats,
        attendees: []
    });

    try {
        await newEvent.save();
        res.status(201).json(newEvent);  // Send back the newly created event
    } catch (err) {
        res.status(400).json({ message: 'Error creating event', error: err });
    }
});
