import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import EmailStatus from '../../components/molecules/EmailStatus';
import Typography from '../../components/atoms/Typography';
import Loading from '../../components/atoms/Loading';
import './EmailVerification.css';

const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { user, resendVerificationEmail, verifyEmail, isLoading } = useAuth();
  
  const [verificationStatus, setVerificationStatus] = useState('loading'); // 'loading', 'pending', 'verified', 'expired', 'resent', 'error'
  const [userEmail, setUserEmail] = useState('');

  // Get token and email from URL params (for email verification links)
  const token = searchParams.get('token');
  const emailParam = searchParams.get('email');

  useEffect(() => {
    const initializeVerification = async () => {
      // If there's a token in the URL, this is a verification link click
      if (token) {
        try {
          setVerificationStatus('loading');
          
          // Simulate verification API call
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Mock verification logic - in real app, this would call the API
          if (token === 'expired') {
            setVerificationStatus('expired');
          } else {
            await verifyEmail?.(token);
            setVerificationStatus('verified');
            
            // Redirect to dashboard after 3 seconds
            setTimeout(() => {
              navigate('/dashboard');
            }, 3000);
          }
        } catch (error) {
          console.error('Verification failed:', error);
          setVerificationStatus('error');
        }
      } else {
        // No token - this is a pending verification page
        setVerificationStatus('pending');
      }

      // Set user email from URL param, route state, or current user
      const email = emailParam || location.state?.email || user?.email || '';
      setUserEmail(email);
    };

    initializeVerification();
  }, [token, emailParam, user?.email, verifyEmail, navigate]);

  const handleResendEmail = async () => {
    try {
      await resendVerificationEmail?.(userEmail);
      setVerificationStatus('resent');
      
      // Reset to pending after 3 seconds
      setTimeout(() => {
        setVerificationStatus('pending');
      }, 3000);
    } catch (error) {
      console.error('Resend failed:', error);
      setVerificationStatus('error');
    }
  };

  const handleContinue = () => {
    navigate('/dashboard');
  };

  const handleClose = () => {
    if (verificationStatus === 'verified') {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  if (verificationStatus === 'loading') {
    return (
      <div className="email-verification-page">
        <div className="email-verification-container">
          <div className="verification-loading">
            <Loading size="large" />
            <Typography variant="h4" className="loading-title">
              Memverifikasi Email...
            </Typography>
            <Typography variant="body1" className="loading-subtitle">
              Mohon tunggu sebentar
            </Typography>
          </div>
        </div>
        <div className="verification-background">
          <div className="background-pattern"></div>
          <div className="background-overlay"></div>
        </div>
      </div>
    );
  }

  if (verificationStatus === 'error') {
    return (
      <div className="email-verification-page">
        <div className="email-verification-container">
          <div className="verification-error">
            <div className="error-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <Typography variant="h4" className="error-title">
              Terjadi Kesalahan
            </Typography>
            <Typography variant="body1" className="error-message">
              Tidak dapat memproses verifikasi email. Silakan coba lagi atau hubungi tim support.
            </Typography>
            <div className="error-actions">
              <Link to="/login" className="btn btn-primary">
                Kembali ke Login
              </Link>
            </div>
          </div>
        </div>
        <div className="verification-background">
          <div className="background-pattern"></div>
          <div className="background-overlay"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="email-verification-page">
      <div className="email-verification-container">
        {/* Header */}
        <div className="verification-header">
          <Link to="/" className="verification-brand">
            <Typography variant="h2" className="brand-name">
              E-Bantek
            </Typography>
            <Typography variant="body2" className="brand-subtitle">
              Sulawesi Tengah
            </Typography>
          </Link>
        </div>

        {/* Verification Status */}
        <div className="verification-content">
          <EmailStatus
            status={verificationStatus}
            email={userEmail}
            onResend={handleResendEmail}
            onClose={handleClose}
          />

          {verificationStatus === 'verified' && (
            <div className="verification-success-info">
              <Typography variant="body2" className="success-info">
                Anda akan diarahkan ke dashboard dalam beberapa detik...
              </Typography>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <div className="verification-navigation">
          {verificationStatus !== 'verified' && (
            <div className="nav-links">
              <Link to="/login" className="nav-link">
                <i className="fas fa-arrow-left"></i>
                Kembali ke Login
              </Link>
              <Link to="/register" className="nav-link">
                Daftar akun baru
              </Link>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="verification-page-footer">
          <Typography variant="body2" className="footer-text">
            © 2025 E-Bantek Sulawesi Tengah. Dinas Cipta Karya dan Sumber Daya Air.
          </Typography>
        </div>
      </div>

      {/* Background */}
      <div className="verification-background">
        <div className="background-pattern"></div>
        <div className="background-overlay"></div>
      </div>
    </div>
  );
};

export default EmailVerification;