import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../services/eventService';

export default function CreateEvent() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: 'general',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createEvent(formData);
      navigate('/');
    } catch (error) {
      alert('Error creating event. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="event-form">
      <h2>Create New Event</h2>
      {loading && <div>Creating event...</div>}
      <form onSubmit={handleSubmit}>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          <option value="general">General</option>
          <option value="conference">Conference</option>
          <option value="workshop">Workshop</option>
          <option value="social">Social</option>
        </select>
        <input
          type="text"
          placeholder="Event Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <input
          type="datetime-local"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
        />
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          <option value="general">General</option>
          <option value="conference">Conference</option>
          <option value="workshop">Workshop</option>
          <option value="social">Social</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}
