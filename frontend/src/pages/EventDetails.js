import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById } from '../services/eventService';

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      setLoading(true);
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (err) {
        setError('Failed to load event details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadEvent();
  }, [id]);

  if (loading) return <div>Loading event details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!event) return <div>No event found</div>;

  return (
    <div className="event-details">
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>Date: {new Date(event.date).toLocaleString()}</p>
      <p>Location: {event.location}</p>
      <p>Category: {event.category}</p>
      <p>Organizer: {event.createdBy?.name}</p>
      <div className="attendees-list">
        <h3>Attendees ({event.attendees.length})</h3>
        <ul>
          {event.attendees.map(attendee => (
            <li key={attendee._id}>
              {attendee.name} ({attendee.email})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
