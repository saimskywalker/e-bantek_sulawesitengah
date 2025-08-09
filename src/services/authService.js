/**
 * Mock Authentication Service
 * Frontend-only authentication using localStorage
 * Simulates backend API calls for login, register, and user management
 */

const AUTH_STORAGE_KEY = 'e_bantek_auth';
const USERS_STORAGE_KEY = 'e_bantek_users';

class AuthService {
  constructor() {
    this.initializeStorage();
  }

  initializeStorage() {
    if (!localStorage.getItem(USERS_STORAGE_KEY)) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([]));
    }
  }

  generateToken(userId) {
    return btoa(`${userId}-${Date.now()}-${Math.random()}`);
  }

  generateUserId() {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  getUsers() {
    return JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
  }

  saveUsers(users) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }

  getCurrentAuth() {
    const auth = localStorage.getItem(AUTH_STORAGE_KEY);
    return auth ? JSON.parse(auth) : null;
  }

  saveAuth(authData) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
  }

  clearAuth() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  async delay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async login(email, password) {
    await this.delay(); // Simulate API delay

    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    if (!user.isEmailVerified) {
      throw new Error('Please verify your email before logging in');
    }

    const token = this.generateToken(user.id);
    const authData = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        profilePicture: user.profilePicture,
        isEmailVerified: user.isEmailVerified
      },
      token,
      isAuthenticated: true,
      loginTime: new Date().toISOString()
    };

    this.saveAuth(authData);
    return authData;
  }

  async register(userData) {
    await this.delay(); // Simulate API delay

    const { email, password, name, phone, profilePicture } = userData;
    const users = this.getUsers();

    if (users.find(u => u.email === email)) {
      throw new Error('Email already exists');
    }

    const newUser = {
      id: this.generateUserId(),
      email,
      password, // In real app, this would be hashed
      name: name || '',
      phone: phone || '',
      profilePicture: profilePicture || '',
      isEmailVerified: false, // Simulate email verification needed
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    this.saveUsers(users);

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        phone: newUser.phone,
        profilePicture: newUser.profilePicture,
        isEmailVerified: newUser.isEmailVerified
      },
      message: 'Registration successful. Please verify your email.'
    };
  }

  async logout() {
    await this.delay(200); // Quick delay
    this.clearAuth();
    return { message: 'Logged out successfully' };
  }

  async forgotPassword(email) {
    await this.delay(); // Simulate API delay

    const users = this.getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      throw new Error('Email not found');
    }

    // In real app, this would send an email
    return { message: 'Password reset email sent. Please check your inbox.' };
  }

  async verifyEmail(email) {
    await this.delay(); // Simulate API delay

    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.email === email);

    if (userIndex === -1) {
      throw new Error('User not found');
    }

    users[userIndex].isEmailVerified = true;
    this.saveUsers(users);

    return { message: 'Email verified successfully' };
  }

  async resendVerificationEmail(email) {
    await this.delay(); // Simulate API delay

    const users = this.getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      throw new Error('User not found');
    }

    if (user.isEmailVerified) {
      throw new Error('Email is already verified');
    }

    return { message: 'Verification email sent. Please check your inbox.' };
  }

  async googleLogin() {
    await this.delay(800); // Simulate OAuth flow delay

    // Simulate successful Google login
    const mockGoogleUser = {
      id: this.generateUserId(),
      email: 'user@gmail.com',
      name: 'Google User',
      phone: '',
      profilePicture: 'https://via.placeholder.com/150',
      isEmailVerified: true // Google accounts are pre-verified
    };

    const token = this.generateToken(mockGoogleUser.id);
    const authData = {
      user: mockGoogleUser,
      token,
      isAuthenticated: true,
      loginTime: new Date().toISOString(),
      provider: 'google'
    };

    // Add to users if not exists
    const users = this.getUsers();
    if (!users.find(u => u.email === mockGoogleUser.email)) {
      users.push({
        ...mockGoogleUser,
        password: null, // No password for OAuth users
        createdAt: new Date().toISOString()
      });
      this.saveUsers(users);
    }

    this.saveAuth(authData);
    return authData;
  }

  isAuthenticated() {
    const auth = this.getCurrentAuth();
    return auth && auth.isAuthenticated && auth.token;
  }

  getUser() {
    const auth = this.getCurrentAuth();
    return auth ? auth.user : null;
  }

  getToken() {
    const auth = this.getCurrentAuth();
    return auth ? auth.token : null;
  }
}

export default new AuthService();