const mongoose = require('mongoose');

// Define the schema for the event
const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Event name
    date: { type: Date, required: true },  // Event date
    time: { type: String, required: true },  // Event time
    location: { type: String, required: true },  // Event location
    description: { type: String, required: true },  // Event description
    capacity: { type: Number, required: true },  // Total event capacity
    availableSeats: { type: Number, required: true },  // Available seats
    attendees: [String]  // List of attendees (could be an array of IDs or names)
});

// Create a model from the schema
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
