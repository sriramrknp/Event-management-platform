import { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import { getEvents } from '../services/eventService';
import { useAuth } from '../contexts/AuthContext';
import {   } from '../services/Socket';

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('all');
  const { user } = useAuth();

  useEffect(() => {
    const loadEvents = async () => {
      const data = await getEvents();
      setEvents(data);
    };
    loadEvents();
  }, []);

  useEffect(() => {
    socket.on('attendeeUpdate', (updatedEvent) => {
      setEvents(prev => prev.map(event => 
        event._id === updatedEvent._id ? updatedEvent : event
      ));
    });

    return () => socket.off('attendeeUpdate');
  }, []);

  const filteredEvents = events.filter(event => {
    const now = new Date();
    if (filter === 'upcoming') return new Date(event.date) > now;
    if (filter === 'past') return new Date(event.date) <= now;
    return true;
  });

  return (
    <div className="dashboard">
      <div className="filters">
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Events</option>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </select>
      </div>
      <div className="event-grid">
        {filteredEvents.map(event => (
          <EventCard key={event.id} event={event} isGuest={user?.role === 'guest'} />
        ))}
      </div>
    </div>
  );
}