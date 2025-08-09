import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Landing from '../../pages/Landing';
import Loading from '../atoms/Loading';

const RootRedirect = () => {
  const { isAuthenticated, isInitializing } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect if user is fully authenticated (not just initializing)
    if (!isInitializing && isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, isInitializing, navigate]);

  // Show loading while auth is initializing
  if (isInitializing) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-secondary-50) 100%)'
      }}>
        <Loading size="large" />
      </div>
    );
  }

  // Show landing page for unauthenticated users
  return <Landing />;
};

export default RootRedirect;