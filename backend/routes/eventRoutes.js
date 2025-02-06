const express = require('express');
const { createEvent, getEvents, getEventById, rsvpToEvent } = require('../controllers/eventController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticate, createEvent);
router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/:id/rsvp', authenticate, rsvpToEvent);

module.exports = router;