import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateEvent from './pages/CreateEvent';
import EventDetails from './pages/EventDetails';

import Navbar from './components/Navbar';
import './App.css';

import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/events/:id" element={<EventDetails />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;