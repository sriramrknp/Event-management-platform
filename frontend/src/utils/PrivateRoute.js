// src/utils/PrivateRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute() {
  const { user, loading } = useAuth();
  const token = localStorage.getItem('token');

  // Optionally render a loading indicator while checking auth status
  if (loading) return <div>Loading...</div>;

  console.log("PrivateRoute Debug:", { user, token });
  return user && token ? <Outlet /> : <Navigate to="/login" />;
}
