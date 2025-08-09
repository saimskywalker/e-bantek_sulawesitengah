# Authentication Service Documentation

## Overview
Frontend-only authentication system using localStorage for mock backend functionality. Designed for easy integration with real backend APIs later.

## Files Created
- `authService.js` - Mock authentication service
- `../context/AuthContext.jsx` - React context for auth state
- `../hooks/useAuth.js` - Custom hook for auth operations

## Features
✅ User registration with extended fields  
✅ Email/password login  
✅ Google OAuth simulation  
✅ Forgot password flow  
✅ Email verification UI flow  
✅ Token-based authentication  
✅ Persistent auth state  
✅ Error handling  

## Mock Users Storage
The system creates and manages users in localStorage:
- Key: `e_bantek_users` - Array of user objects
- Key: `e_bantek_auth` - Current authentication state

## Usage Example
```jsx
import { useAuth } from './hooks/useAuth';

function MyComponent() {
  const { 
    user, 
    isAuthenticated, 
    login, 
    register, 
    logout 
  } = useAuth();

  // Authentication logic here
}
```

## Mock Data
- Default users are created as needed
- Google login simulates: user@gmail.com
- All passwords are stored in plain text (demo only)
- Email verification is UI-only simulation

## Backend Integration Ready
When backend is ready:
1. Replace authService.js methods with real API calls
2. Remove localStorage operations
3. Add proper token validation
4. Update error handling for API responses

The AuthContext and useAuth hook will work unchanged!