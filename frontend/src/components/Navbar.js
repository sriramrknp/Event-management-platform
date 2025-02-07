import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {

  const navigate = useNavigate();
  const { user, logout, guestLogin } = useAuth();


  const handleGuestLogin = async () => {
    const success = await guestLogin();
    if (success) {
      navigate('/');
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
      <Link to="/" className="logo" style={{ color: 'red', fontSize: '24px' }}>
      Event Platform
      </Link>

        <div className="nav-links">
          {user ? (
            <>
              <span className="welcome-message" style={{ color: 'red', fontSize: '15px' }}>
                Hi, {user.role === 'guest' ? 'Guest' : user.name}
              </span>
              <Link to="/create-event" style={{ color: 'red', fontSize: '15px' }} >Create Event</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              <button onClick={handleGuestLogin}>Guest Login</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}