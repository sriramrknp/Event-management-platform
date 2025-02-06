import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout, guestLogin } = useAuth();

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">Event Platform</Link>
        <div className="nav-links">
          {user ? (
            <>
              <Link to="/create-event">Create Event</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              <button onClick={guestLogin}>Guest Login</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}