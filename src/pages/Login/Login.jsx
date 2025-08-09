import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/atoms/Button';
import FormField from '../../components/molecules/FormField';
import GoogleSignIn from '../../components/molecules/GoogleSignIn';
import Typography from '../../components/atoms/Typography';
import Loading from '../../components/atoms/Loading';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    login, 
    googleLogin, 
    isLoading, 
    error, 
    clearError, 
    isAuthenticated 
  } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const redirectTo = location.state?.from || '/dashboard';
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, navigate, location.state]);

  // Clear errors when form changes
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [formData.email, formData.password]);

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Format email tidak valid';
    }

    if (!formData.password.trim()) {
      errors.password = 'Password wajib diisi';
    } else if (formData.password.length < 6) {
      errors.password = 'Password minimal 6 karakter';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear field error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await login(formData.email, formData.password, rememberMe);
      // Navigation will be handled by useEffect
    } catch (err) {
      console.error('Login failed:', err);
      // Error will be shown via auth context
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSuccess = (result) => {
    // Navigation will be handled by useEffect when isAuthenticated changes
    console.log('Google login successful:', result);
  };

  const handleGoogleError = (error) => {
    console.error('Google login failed:', error);
    // Error will be shown via auth context
  };

  const isFormLoading = isLoading || isSubmitting;

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Header */}
        <div className="login-header">
          <Link to="/" className="login-brand">
            <Typography variant="h2" className="brand-name">
              E-Bantek
            </Typography>
            <Typography variant="body2" className="brand-subtitle">
              Sulawesi Tengah
            </Typography>
          </Link>
        </div>

        {/* Login Form */}
        <div className="login-form-container">
          <div className="login-form-header">
            <Typography variant="h3" className="login-title">
              Masuk ke Akun Anda
            </Typography>
            <Typography variant="body1" className="login-subtitle">
              Selamat datang kembali! Silakan masukkan detail akun Anda
            </Typography>
          </div>

          {error && (
            <div className="login-error">
              <div className="error-content">
                <i className="fas fa-exclamation-triangle"></i>
                <span>{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <FormField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Masukkan email Anda"
              required
              error={formErrors.email}
              disabled={isFormLoading}
              autoComplete="email"
              leftIcon={<i className="fas fa-envelope"></i>}
            />

            <FormField
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Masukkan password Anda"
              required
              error={formErrors.password}
              disabled={isFormLoading}
              autoComplete="current-password"
              leftIcon={<i className="fas fa-lock"></i>}
              rightIcon={
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                </button>
              }
            />

            <div className="login-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isFormLoading}
                />
                <span className="checkmark"></span>
                <Typography variant="body2">Ingat saya</Typography>
              </label>

              <Link to="/forgot-password" className="forgot-password-link">
                <Typography variant="body2">Lupa password?</Typography>
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              loading={isFormLoading}
              disabled={isFormLoading}
            >
              {isFormLoading ? 'Masuk...' : 'Masuk'}
            </Button>
          </form>

          {/* OAuth Section */}
          <div className="oauth-section">
            <div className="oauth-divider">
              <span>atau</span>
            </div>

            <GoogleSignIn
              text="Masuk dengan Google"
              variant="secondary"
              size="large"
              fullWidth
              disabled={isFormLoading}
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
          </div>

          {/* Register Link */}
          <div className="login-footer">
            <Typography variant="body2">
              Belum punya akun?{' '}
              <Link to="/register" className="register-link">
                Daftar sekarang
              </Link>
            </Typography>
          </div>
        </div>

        {/* Footer */}
        <div className="login-page-footer">
          <Typography variant="body2" className="footer-text">
            © 2025 E-Bantek Sulawesi Tengah. Dinas Cipta Karya dan Sumber Daya Air.
          </Typography>
        </div>
      </div>

      {/* Background */}
      <div className="login-background">
        <div className="background-pattern"></div>
        <div className="background-overlay"></div>
      </div>
    </div>
  );
};

export default Login;