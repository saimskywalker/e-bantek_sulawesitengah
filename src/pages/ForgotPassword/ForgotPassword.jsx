import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/atoms/Button';
import FormField from '../../components/molecules/FormField';
import Typography from '../../components/atoms/Typography';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotPassword, isLoading, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const validateEmail = (emailValue) => {
    if (!emailValue.trim()) {
      return 'Email wajib diisi';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      return 'Format email tidak valid';
    }
    return '';
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    // Clear errors when user types
    if (emailError) {
      setEmailError('');
    }
    if (submitError) {
      setSubmitError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await forgotPassword(email);
      setIsSuccess(true);
    } catch (err) {
      setSubmitError(err.message || 'Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setIsSuccess(false);
    setEmail('');
    setEmailError('');
    setSubmitError('');
  };

  const isFormLoading = isLoading || isSubmitting;

  // Success state
  if (isSuccess) {
    return (
      <div className="forgot-password-page">
        <div className="forgot-password-container">
          <div className="forgot-password-header">
            <Link to="/" className="forgot-password-brand">
              <Typography variant="h2" className="brand-name">
                E-Bantek
              </Typography>
              <Typography variant="body2" className="brand-subtitle">
                Sulawesi Tengah
              </Typography>
            </Link>
          </div>

          <div className="success-container">
            <div className="success-icon">
              <i className="fas fa-envelope-circle-check"></i>
            </div>
            
            <div className="success-content">
              <Typography variant="h3" className="success-title">
                Email Terkirim!
              </Typography>
              
              <Typography variant="body1" className="success-message">
                Kami telah mengirimkan link reset password ke alamat email:
              </Typography>
              
              <div className="email-display">
                <Typography variant="body1" weight="semibold">
                  {email}
                </Typography>
              </div>
              
              <div className="success-instructions">
                <Typography variant="body2" className="instruction-item">
                  📧 Periksa kotak masuk email Anda
                </Typography>
                <Typography variant="body2" className="instruction-item">
                  🔗 Klik link "Reset Password" di email
                </Typography>
                <Typography variant="body2" className="instruction-item">
                  ⏱️ Link berlaku selama 15 menit
                </Typography>
                <Typography variant="body2" className="instruction-item">
                  📁 Jika tidak ada di inbox, cek folder spam
                </Typography>
              </div>
              
              <div className="success-actions">
                <Link to="/login" className="btn btn-primary">
                  Kembali ke Login
                </Link>
                
                <Button 
                  variant="secondary" 
                  onClick={handleRetry}
                  className="retry-button"
                >
                  Kirim Ulang Email
                </Button>
              </div>
            </div>
          </div>

          <div className="forgot-password-footer">
            <Typography variant="body2" className="footer-text">
              © 2025 E-Bantek Sulawesi Tengah. Dinas Cipta Karya dan Sumber Daya Air.
            </Typography>
          </div>
        </div>

        <div className="forgot-password-background">
          <div className="background-pattern"></div>
          <div className="background-overlay"></div>
        </div>
      </div>
    );
  }

  // Form state
  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <div className="forgot-password-header">
          <Link to="/" className="forgot-password-brand">
            <Typography variant="h2" className="brand-name">
              E-Bantek
            </Typography>
            <Typography variant="body2" className="brand-subtitle">
              Sulawesi Tengah
            </Typography>
          </Link>
        </div>

        <div className="forgot-password-form-container">
          <div className="forgot-password-form-header">
            <div className="header-icon">
              <i className="fas fa-key"></i>
            </div>
            
            <Typography variant="h3" className="forgot-password-title">
              Lupa Password?
            </Typography>
            
            <Typography variant="body1" className="forgot-password-subtitle">
              Tidak masalah! Masukkan alamat email Anda dan kami akan mengirimkan 
              link untuk mereset password Anda.
            </Typography>
          </div>

          {submitError && (
            <div className="forgot-password-error">
              <div className="error-content">
                <i className="fas fa-exclamation-triangle"></i>
                <span>{submitError}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="forgot-password-form" noValidate>
            <FormField
              label="Alamat Email"
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Masukkan alamat email Anda"
              required
              error={emailError}
              disabled={isFormLoading}
              autoComplete="email"
              autoFocus
              leftIcon={<i className="fas fa-envelope"></i>}
              helperText="Email yang terdaftar di akun E-Bantek Anda"
            />

            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              loading={isFormLoading}
              disabled={isFormLoading || !email.trim()}
            >
              {isFormLoading ? 'Mengirim Email...' : 'Kirim Link Reset Password'}
            </Button>
          </form>

          <div className="forgot-password-help">
            <div className="help-section">
              <Typography variant="h6" className="help-title">
                Bantuan Reset Password
              </Typography>
              
              <div className="help-items">
                <div className="help-item">
                  <i className="fas fa-info-circle"></i>
                  <Typography variant="body2">
                    Pastikan email yang Anda masukkan adalah email yang terdaftar di akun E-Bantek
                  </Typography>
                </div>
                
                <div className="help-item">
                  <i className="fas fa-clock"></i>
                  <Typography variant="body2">
                    Link reset password akan berlaku selama 15 menit setelah dikirim
                  </Typography>
                </div>
                
                <div className="help-item">
                  <i className="fas fa-shield-alt"></i>
                  <Typography variant="body2">
                    Jangan bagikan link reset password kepada siapa pun demi keamanan akun Anda
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          <div className="forgot-password-navigation">
            <Typography variant="body2">
              Ingat password Anda?{' '}
              <Link to="/login" className="login-link">
                Masuk di sini
              </Link>
            </Typography>
            
            <Typography variant="body2">
              Belum punya akun?{' '}
              <Link to="/register" className="register-link">
                Daftar sekarang
              </Link>
            </Typography>
          </div>
        </div>

        <div className="forgot-password-footer">
          <Typography variant="body2" className="footer-text">
            © 2025 E-Bantek Sulawesi Tengah. Dinas Cipta Karya dan Sumber Daya Air.
          </Typography>
        </div>
      </div>

      <div className="forgot-password-background">
        <div className="background-pattern"></div>
        <div className="background-overlay"></div>
      </div>
    </div>
  );
};

export default ForgotPassword;