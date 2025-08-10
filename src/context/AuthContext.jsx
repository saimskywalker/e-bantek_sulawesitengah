import React, { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import authService from '../services/authService';

const AuthContext = createContext();

// Auth action types
const AUTH_ACTIONS = {
  INIT_AUTH: 'INIT_AUTH',
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  REGISTER_START: 'REGISTER_START',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_ERROR: 'REGISTER_ERROR',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_LOADING: 'SET_LOADING'
};

// User roles definition
export const USER_ROLES = {
  PEMOHON: 'LEVEL_1',        // Level 1 - OPD/Dinas (Requesters)
  PENGELOLA_TEKNIS: 'LEVEL_1_5', // Level 1.5 - Technical Managers
  OPERATOR: 'LEVEL_2',       // Level 2 - Operators (Verifiers) 
  KEPALA_SEKSI: 'LEVEL_3',   // Level 3 - Kepala Seksi/Bidang (Approvers)
  ADMINISTRATOR: 'LEVEL_4'   // Level 4 - System Administrators
};

// Permission definitions
export const PERMISSIONS = {
  // Level 1 permissions
  CREATE_REQUEST: 'create_request',
  VIEW_OWN_REQUESTS: 'view_own_requests',
  EDIT_OWN_REQUESTS: 'edit_own_requests',
  
  // Level 1.5 permissions  
  VIEW_ASSIGNED_REQUESTS: 'view_assigned_requests',
  UPDATE_REQUEST_PROGRESS: 'update_request_progress',
  COMMUNICATE_WITH_REQUESTER: 'communicate_with_requester',
  
  // Level 2 permissions
  VIEW_ALL_REQUESTS: 'view_all_requests',
  VERIFY_REQUESTS: 'verify_requests',
  APPROVE_REJECT_REQUESTS: 'approve_reject_requests',
  
  // Level 3 permissions
  ASSIGN_TECHNICAL_MANAGERS: 'assign_technical_managers',
  FINAL_APPROVAL: 'final_approval',
  VIEW_REPORTS: 'view_reports',
  
  // Level 4 permissions
  MANAGE_USERS: 'manage_users',
  SYSTEM_ADMINISTRATION: 'system_administration',
  VIEW_ANALYTICS: 'view_analytics',
  MANAGE_ROLES: 'manage_roles'
};

// Role permissions mapping
export const ROLE_PERMISSIONS = {
  [USER_ROLES.PEMOHON]: [
    PERMISSIONS.CREATE_REQUEST,
    PERMISSIONS.VIEW_OWN_REQUESTS,
    PERMISSIONS.EDIT_OWN_REQUESTS
  ],
  [USER_ROLES.PENGELOLA_TEKNIS]: [
    PERMISSIONS.VIEW_ASSIGNED_REQUESTS,
    PERMISSIONS.UPDATE_REQUEST_PROGRESS,
    PERMISSIONS.COMMUNICATE_WITH_REQUESTER
  ],
  [USER_ROLES.OPERATOR]: [
    PERMISSIONS.VIEW_ALL_REQUESTS,
    PERMISSIONS.VERIFY_REQUESTS,
    PERMISSIONS.APPROVE_REJECT_REQUESTS
  ],
  [USER_ROLES.KEPALA_SEKSI]: [
    PERMISSIONS.VIEW_ALL_REQUESTS,
    PERMISSIONS.ASSIGN_TECHNICAL_MANAGERS,
    PERMISSIONS.FINAL_APPROVAL,
    PERMISSIONS.VIEW_REPORTS
  ],
  [USER_ROLES.ADMINISTRATOR]: [
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.SYSTEM_ADMINISTRATION,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.MANAGE_ROLES,
    PERMISSIONS.VIEW_ALL_REQUESTS
  ]
};

// Initial auth state
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isInitializing: true,
  error: null,
  userRole: null,
  permissions: []
};

// Auth reducer
function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.INIT_AUTH:
      const userRole = action.payload.user?.role || null;
      const permissions = userRole ? ROLE_PERMISSIONS[userRole] || [] : [];
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: action.payload.isAuthenticated,
        isInitializing: false,
        userRole,
        permissions
      };

    case AUTH_ACTIONS.LOGIN_START:
    case AUTH_ACTIONS.REGISTER_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      const loginUserRole = action.payload.user?.role || null;
      const loginPermissions = loginUserRole ? ROLE_PERMISSIONS[loginUserRole] || [] : [];
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        userRole: loginUserRole,
        permissions: loginPermissions
      };

    case AUTH_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null
      };

    case AUTH_ACTIONS.LOGIN_ERROR:
    case AUTH_ACTIONS.REGISTER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        error: null,
        userRole: null,
        permissions: []
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    default:
      return state;
  }
}

// Auth context provider component
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state from storage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const authData = authService.getCurrentAuth();
        if (authData && authData.isAuthenticated) {
          dispatch({
            type: AUTH_ACTIONS.INIT_AUTH,
            payload: {
              user: authData.user,
              token: authData.token,
              isAuthenticated: true
            }
          });
        } else {
          dispatch({
            type: AUTH_ACTIONS.INIT_AUTH,
            payload: {
              user: null,
              token: null,
              isAuthenticated: false
            }
          });
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        dispatch({
          type: AUTH_ACTIONS.INIT_AUTH,
          payload: {
            user: null,
            token: null,
            isAuthenticated: false
          }
        });
      }
    };

    initializeAuth();
  }, []);

  // Auth actions
  const login = async (email, password, rememberMe = false) => {
    try {
      dispatch({ type: AUTH_ACTIONS.LOGIN_START });
      const authData = await authService.login(email, password);
      
      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: authData
      });
      
      return authData;
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_ERROR,
        payload: error.message
      });
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.REGISTER_START });
      const result = await authService.register(userData);
      
      dispatch({ type: AUTH_ACTIONS.REGISTER_SUCCESS });
      return result;
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.REGISTER_ERROR,
        payload: error.message
      });
      throw error;
    }
  };

  const googleLogin = async () => {
    try {
      dispatch({ type: AUTH_ACTIONS.LOGIN_START });
      const authData = await authService.googleLogin();
      
      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: authData
      });
      
      return authData;
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_ERROR,
        payload: error.message
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if service fails
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  };

  const forgotPassword = async (email) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      const result = await authService.forgotPassword(email);
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      return result;
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      throw error;
    }
  };

  const verifyEmail = async (email) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      const result = await authService.verifyEmail(email);
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      return result;
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      throw error;
    }
  };

  const resendVerificationEmail = async (email) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      const result = await authService.resendVerificationEmail(email);
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      return result;
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      throw error;
    }
  };

  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Permission checking utilities
  const hasPermission = (permission) => {
    return state.permissions.includes(permission);
  };

  const hasRole = (role) => {
    return state.userRole === role;
  };

  const hasAnyRole = (roles) => {
    return roles.includes(state.userRole);
  };

  const getDashboardPath = () => {
    switch (state.userRole) {
      case USER_ROLES.PEMOHON:
        return '/dashboard/pemohon';
      case USER_ROLES.PENGELOLA_TEKNIS:
        return '/dashboard/pengelola-teknis';
      case USER_ROLES.OPERATOR:
        return '/dashboard/operator';
      case USER_ROLES.KEPALA_SEKSI:
        return '/dashboard/kepala-seksi';
      case USER_ROLES.ADMINISTRATOR:
        return '/dashboard/administrator';
      default:
        return '/dashboard';
    }
  };

  // Context value
  const value = {
    // State
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    isInitializing: state.isInitializing,
    error: state.error,
    userRole: state.userRole,
    permissions: state.permissions,
    
    // Actions
    login,
    register,
    googleLogin,
    logout,
    forgotPassword,
    verifyEmail,
    resendVerificationEmail,
    clearError,
    
    // Permission utilities
    hasPermission,
    hasRole,
    hasAnyRole,
    getDashboardPath
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

// PropTypes
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthContext;