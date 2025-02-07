import { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import { getEvents } from '../services/eventService';
import { useAuth } from '../contexts/AuthContext';
import { socket } from '../services/Socket';

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  useEffect(() => {
    socket.on('attendeeUpdate', (updatedEvent) => {
      setEvents(prev =>
        prev.map(event =>
          event._id === updatedEvent._id ? updatedEvent : event
        )
      );
    });
    return () => socket.off('attendeeUpdate');
  }, []);

  // Apply status filter (upcoming, past, or all)
  const filterByStatus = (events) => {
    const now = new Date();
    if (filter === 'upcoming') {
      return events.filter(event => new Date(event.date) > now);
    }
    if (filter === 'past') {
      return events.filter(event => new Date(event.date) <= now);
    }
    return events;
  };

  // Apply date range filter if either startDate or endDate is specified
  const filterByDateRange = (events) => {
    if (!startDate && !endDate) return events;
    return events.filter(event => {
      const eventDate = new Date(event.date);
      let valid = true;
      if (startDate) {
        valid = valid && (eventDate >= new Date(startDate));
      }
      if (endDate) {
        valid = valid && (eventDate <= new Date(endDate));
      }
      return valid;
    });
  };

  const filteredEvents = filterByDateRange(filterByStatus(events));

  return (
    <div className="dashboard">
      <h2>Welcome to the App!</h2>
      <div className="filters">
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="all">All Events</option>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </select>
        <div className="date-filters">
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
        </div>
      </div>
      {loading ? (
        <div>Loading events...</div>
      ) : (
        <div className="event-grid">
          {filteredEvents.map(event => (
            <EventCard key={event._id} event={event} isGuest={user?.role === 'guest'} />
          ))}
        </div>
      )}
    </div>
  );
}
