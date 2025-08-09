import { useAuthContext } from '../context/AuthContext';

/**
 * Custom hook for accessing authentication state and methods
 * Provides a clean interface to the auth context
 */
export function useAuth() {
  const context = useAuthContext();

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return {
    // Authentication state
    user: context.user,
    token: context.token,
    isAuthenticated: context.isAuthenticated,
    isLoading: context.isLoading,
    isInitializing: context.isInitializing,
    error: context.error,

    // Authentication methods
    login: context.login,
    register: context.register,
    googleLogin: context.googleLogin,
    logout: context.logout,
    forgotPassword: context.forgotPassword,
    verifyEmail: context.verifyEmail,
    resendVerificationEmail: context.resendVerificationEmail,
    clearError: context.clearError,

    // Computed properties
    hasError: !!context.error,
    isLoggedIn: context.isAuthenticated && !!context.user,
    isVerified: context.user?.isEmailVerified || false,
    userDisplayName: context.user?.name || context.user?.email || 'User',
    userId: context.user?.id,
    userEmail: context.user?.email,

    // Utility methods
    checkAuth: () => context.isAuthenticated,
    requireAuth: () => {
      if (!context.isAuthenticated) {
        throw new Error('Authentication required');
      }
      return true;
    }
  };
}

export default useAuth;