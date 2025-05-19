import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { useAuth } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';

function App() {
  const { user } = useAuth();
  return (
    <>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
export default App;