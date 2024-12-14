const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

// Fetch all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching events', error: err.message });
    }
});


// RSVP to an event
router.post('/', async (req, res) => {
    try {
        const event = new Event(req.body);
        event.availableSeats = event.capacity; // Set available seats to capacity
        await event.save();
        res.status(201).json({ message: 'Event created successfully', event });
    } catch (err) {
        res.status(400).json({ message: 'Error creating event', error: err.message });
    }
});

module.exports = router;
