import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { USER_ROLES } from '../../context/AuthContext';
import PropTypes from 'prop-types';

const RoleBasedRoute = ({ 
  children, 
  allowedRoles = [], 
  requiredPermissions = [], 
  fallbackPath = '/dashboard',
  showUnauthorized = false 
}) => {
  const { 
    isAuthenticated, 
    isInitializing, 
    userRole, 
    hasPermission, 
    hasAnyRole,
    getDashboardPath 
  } = useAuth();

  // Still loading auth state
  if (isInitializing) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
        <p>Memuat...</p>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check role requirements
  if (allowedRoles.length > 0 && !hasAnyRole(allowedRoles)) {
    if (showUnauthorized) {
      return (
        <div className="unauthorized-container">
          <div className="unauthorized-content">
            <i className="fas fa-ban"></i>
            <h3>Akses Ditolak</h3>
            <p>Anda tidak memiliki akses untuk halaman ini.</p>
            <button onClick={() => window.history.back()}>
              Kembali
            </button>
          </div>
        </div>
      );
    }
    // Redirect to appropriate dashboard based on user role
    return <Navigate to={getDashboardPath()} replace />;
  }

  // Check permission requirements
  if (requiredPermissions.length > 0) {
    const hasAllPermissions = requiredPermissions.every(permission => 
      hasPermission(permission)
    );
    
    if (!hasAllPermissions) {
      if (showUnauthorized) {
        return (
          <div className="unauthorized-container">
            <div className="unauthorized-content">
              <i className="fas fa-lock"></i>
              <h3>Tidak Ada Izin</h3>
              <p>Anda tidak memiliki izin yang diperlukan untuk fitur ini.</p>
              <button onClick={() => window.history.back()}>
                Kembali
              </button>
            </div>
          </div>
        );
      }
      return <Navigate to={fallbackPath} replace />;
    }
  }

  // All checks passed - render children
  return children;
};

RoleBasedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
  requiredPermissions: PropTypes.arrayOf(PropTypes.string),
  fallbackPath: PropTypes.string,
  showUnauthorized: PropTypes.bool
};

export default RoleBasedRoute;