import { Link } from 'react-router-dom';
import { useState } from 'react';
import { rsvpToEvent } from '../services/eventService';

export default function EventCard({ event, isGuest }) {

  const [error, setError] = useState('');

  const handleRSVP = async () => {
    try {
      setError('');
      await rsvpToEvent(event._id);
      // You might want to update local state here if needed
    } catch (err) {
      setError(err.response?.data?.message || 'RSVP failed');
    }
  };

  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p>{new Date(event.date).toLocaleDateString()}</p>
      <p>{event.location}</p>
      <p>Attendees: {event.attendees.length}</p>
      <div className="event-actions">
        {!isGuest && (
          <>
            <button onClick={handleRSVP}>RSVP</button>
            {error && <div className="error-message">{error}</div>}
          </>
        )}
        <Link to={`/events/${event._id}`}>View Details</Link>
      </div>

    </div>
  );
}