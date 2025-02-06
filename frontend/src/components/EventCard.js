import { Link } from 'react-router-dom';
import { rsvpToEvent } from '../services/eventService';

export default function EventCard({ event, isGuest }) {

  const handleRSVP = async () => {
    await rsvpToEvent(event._id);
  };

  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p>{new Date(event.date).toLocaleDateString()}</p>
      <p>{event.location}</p>
      <p>Attendees: {event.attendees.length}</p>
      <div className="event-actions">
        {!isGuest && <button onClick={handleRSVP}>RSVP</button>}
        <Link to={`/events/${event.id}`}>View Details</Link>
      </div>
    </div>
  );
}