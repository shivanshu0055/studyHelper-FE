import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
// import { persist } from 'zustand/middleware';

const ProtectedRoute = ({ children }) => {
    
    const isAuthenticated=useAuthStore((state)=>state.isAuthenticated)

   const hasHydrated = useAuthStore.persist.hasHydrated(); // Zustand-specific

  if (!hasHydrated) return null; // or a loading screen

  return isAuthenticated ? children : <Navigate to="/signin" replace />;

}

export default ProtectedRoute