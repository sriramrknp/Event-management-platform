import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById } from '../services/eventService';

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const loadEvent = async () => {
      const data = await getEventById(id);
      setEvent(data);
    };
    loadEvent();
  }, [id]);

  if (!event) return <div>Loading...</div>;

  return (
    <div className="event-details">
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>Date: {new Date(event.date).toLocaleString()}</p>
      <p>Location: {event.location}</p>
      <p>Attendees: {event.attendees.length}</p>
    </div>
  );
}