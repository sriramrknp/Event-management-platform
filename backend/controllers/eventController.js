const Event = require('../models/Event');

// Create a new event
exports.createEvent = async (req, res) => {
    try {
      const { title, description, date, location, category } = req.body;
      
      // Validate required fields
      if (!title || !description || !date || !location) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      const event = new Event({
        title,
        description,
        date: new Date(date),
        location,
        category: category || 'general',
        createdBy: req.user.id
      });
  
      await event.save();
      res.status(201).json(event);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

// Get all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('attendees', 'name email');
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('attendees', 'name email')
      .populate('createdBy', 'name');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(event);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid event ID format' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// RSVP to an event
exports.rsvpToEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) throw new Error('Event not found');
    if (event.attendees.includes(req.user.id)) throw new Error('Already RSVPed');
    event.attendees.push(req.user.id);
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};