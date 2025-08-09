import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

function AuthTest() {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    googleLogin,
    clearError
  } = useAuth();

  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Test User');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      clearError();
      await login(email, password);
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      clearError();
      await register({
        email,
        password,
        name,
        phone: '123-456-7890'
      });
      alert('Registration successful! Please verify your email.');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      clearError();
      await googleLogin();
    } catch (err) {
      console.error('Google login failed:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h2>🔐 Auth System Test</h2>
      
      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          Error: {error}
        </div>
      )}

      {isAuthenticated ? (
        <div>
          <h3>✅ Authenticated User</h3>
          <p><strong>Name:</strong> {user?.name || 'N/A'}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Phone:</strong> {user?.phone || 'N/A'}</p>
          <p><strong>Email Verified:</strong> {user?.isEmailVerified ? '✅' : '❌'}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h3>🔓 Not Authenticated</h3>
          
          <form onSubmit={handleLogin}>
            <h4>Login Test</h4>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ margin: '5px', padding: '5px' }}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ margin: '5px', padding: '5px' }}
              />
            </div>
            <button type="submit">Login</button>
          </form>

          <form onSubmit={handleRegister}>
            <h4>Register Test</h4>
            <div>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ margin: '5px', padding: '5px' }}
              />
            </div>
            <button type="submit">Register</button>
          </form>

          <div>
            <h4>OAuth Test</h4>
            <button onClick={handleGoogleLogin}>Sign in with Google</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AuthTest;