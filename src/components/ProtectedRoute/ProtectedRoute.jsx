import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Loading from '../atoms/Loading';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isInitializing, user } = useAuth();
  const location = useLocation();

  // Show loading while initializing auth state
  if (isInitializing) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)'
      }}>
        <Loading size="large" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Render protected content
  return children;
};

export default ProtectedRoute;