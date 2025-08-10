import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { USER_ROLES } from '../../context/AuthContext';
import Button from '../../components/atoms/Button';
import FormField from '../../components/molecules/FormField';
import GoogleSignIn from '../../components/molecules/GoogleSignIn';
import Typography from '../../components/atoms/Typography';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const { 
    register, 
    googleLogin,
    isLoading, 
    error, 
    clearError, 
    isAuthenticated,
    getDashboardPath
  } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    profilePicture: null,
    role: USER_ROLES.PEMOHON, // Default to Level 1
    organization: '',
    position: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const dashboardPath = getDashboardPath?.() || '/dashboard';
      navigate(dashboardPath, { replace: true });
    }
  }, [isAuthenticated, navigate, getDashboardPath]);

  // Clear errors when form changes
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [formData, clearError]);

  const validateForm = () => {
    const errors = {};

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Format email tidak valid';
    }

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Nama lengkap wajib diisi';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Nama minimal 2 karakter';
    }

    // Phone validation
    if (formData.phone && !/^[\d\-\+\s\(\)]+$/.test(formData.phone)) {
      errors.phone = 'Format nomor telepon tidak valid';
    }

    // Password validation
    if (!formData.password.trim()) {
      errors.password = 'Password wajib diisi';
    } else {
      if (formData.password.length < 8) {
        errors.password = 'Password minimal 8 karakter';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        errors.password = 'Password harus mengandung huruf besar, huruf kecil, dan angka';
      }
    }

    // Confirm password validation
    if (!formData.confirmPassword.trim()) {
      errors.confirmPassword = 'Konfirmasi password wajib diisi';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Password tidak cocok';
    }

    // Role validation
    if (!formData.role) {
      errors.role = 'Role wajib dipilih';
    }

    // Organization validation (required for non-Pemohon roles)
    if (formData.role !== USER_ROLES.PEMOHON && !formData.organization.trim()) {
      errors.organization = 'Nama organisasi/instansi wajib diisi';
    }

    // Position validation (required for non-Pemohon roles)
    if (formData.role !== USER_ROLES.PEMOHON && !formData.position.trim()) {
      errors.position = 'Jabatan wajib diisi';
    }

    // Terms validation
    if (!acceptTerms) {
      errors.terms = 'Anda harus menyetujui syarat dan ketentuan';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      symbols: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    strength = Object.values(checks).filter(Boolean).length;
    
    if (strength < 2) return { level: 'weak', text: 'Lemah', color: '#ef4444' };
    if (strength < 4) return { level: 'medium', text: 'Sedang', color: '#f59e0b' };
    return { level: 'strong', text: 'Kuat', color: '#22c55e' };
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setFormErrors(prev => ({
          ...prev,
          profilePicture: 'File harus berupa gambar'
        }));
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFormErrors(prev => ({
          ...prev,
          profilePicture: 'Ukuran file maksimal 5MB'
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        profilePicture: file
      }));

      // Clear error
      setFormErrors(prev => ({
        ...prev,
        profilePicture: ''
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
      const userData = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phone || '',
        profilePicture: formData.profilePicture ? URL.createObjectURL(formData.profilePicture) : '',
        role: formData.role,
        organization: formData.organization || '',
        position: formData.position || ''
      };

      await register(userData);
      setRegistrationSuccess(true);
      
      // Redirect to email verification after 3 seconds
      setTimeout(() => {
        navigate('/email-verification', { 
          state: { 
            email: formData.email,
            fromRegistration: true
          }
        });
      }, 3000);
      
    } catch (err) {
      console.error('Registration failed:', err);
      // Error will be shown via auth context
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSuccess = (result) => {
    // Navigation will be handled by useEffect when isAuthenticated changes
    console.log('Google registration successful:', result);
  };

  const handleGoogleError = (error) => {
    console.error('Google registration failed:', error);
    // Error will be shown via auth context
  };

  const isFormLoading = isLoading || isSubmitting;

  if (registrationSuccess) {
    return (
      <div className="register-page">
        <div className="register-container">
          <div className="registration-success">
            <div className="success-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <Typography variant="h3" className="success-title">
              Pendaftaran Berhasil!
            </Typography>
            <Typography variant="body1" className="success-message">
              Akun Anda telah berhasil dibuat! Kami akan mengarahkan Anda ke halaman verifikasi email 
              untuk melanjutkan proses aktivasi akun.
            </Typography>
            <div className="success-actions">
              <Link to="/email-verification" className="btn btn-primary">
                Lanjut ke Verifikasi Email
              </Link>
            </div>
          </div>
        </div>
        <div className="register-background">
          <div className="background-pattern"></div>
          <div className="background-overlay"></div>
        </div>
      </div>
    );
  }

  const passwordStrength = formData.password ? getPasswordStrength(formData.password) : null;

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Header */}
        <div className="register-header">
          <Link to="/" className="register-brand">
            <Typography variant="h2" className="brand-name">
              E-Bantek
            </Typography>
            <Typography variant="body2" className="brand-subtitle">
              Sulawesi Tengah
            </Typography>
          </Link>
        </div>

        {/* Registration Form */}
        <div className="register-form-container">
          <div className="register-form-header">
            <Typography variant="h3" className="register-title">
              Buat Akun Baru
            </Typography>
            <Typography variant="body1" className="register-subtitle">
              Daftar untuk mengakses layanan bantuan teknis E-Bantek
            </Typography>
          </div>

          {error && (
            <div className="register-error">
              <div className="error-content">
                <i className="fas fa-exclamation-triangle"></i>
                <span>{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="register-form" noValidate>
            {/* Profile Picture Upload */}
            <div className="profile-picture-section">
              <Typography variant="body2" className="section-label">
                Foto Profil (Opsional)
              </Typography>
              <div className="profile-picture-upload">
                <div className="picture-preview">
                  {formData.profilePicture ? (
                    <img 
                      src={URL.createObjectURL(formData.profilePicture)} 
                      alt="Profile preview"
                      className="preview-image"
                    />
                  ) : (
                    <div className="preview-placeholder">
                      <i className="fas fa-user"></i>
                    </div>
                  )}
                </div>
                <div className="upload-controls">
                  <input
                    type="file"
                    id="profilePicture"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file-input"
                    disabled={isFormLoading}
                  />
                  <label htmlFor="profilePicture" className="upload-button">
                    <i className="fas fa-camera"></i>
                    <span>Pilih Foto</span>
                  </label>
                  <Typography variant="caption" className="upload-hint">
                    JPG, PNG, atau GIF (Maks. 5MB)
                  </Typography>
                </div>
              </div>
              {formErrors.profilePicture && (
                <span className="field-error">{formErrors.profilePicture}</span>
              )}
            </div>

            {/* Basic Information */}
            <div className="form-section">
              <Typography variant="body2" className="section-label">
                Informasi Dasar
              </Typography>
              
              <FormField
                label="Nama Lengkap"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Masukkan nama lengkap Anda"
                required
                error={formErrors.name}
                disabled={isFormLoading}
                autoComplete="name"
                leftIcon={<i className="fas fa-user"></i>}
              />

              <FormField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Masukkan alamat email Anda"
                required
                error={formErrors.email}
                disabled={isFormLoading}
                autoComplete="email"
                leftIcon={<i className="fas fa-envelope"></i>}
              />

              <FormField
                label="Nomor Telepon"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Contoh: 08123456789"
                error={formErrors.phone}
                disabled={isFormLoading}
                autoComplete="tel"
                leftIcon={<i className="fas fa-phone"></i>}
                helperText="Opsional - untuk notifikasi SMS"
              />
            </div>

            {/* Role and Organization Section */}
            <div className="form-section">
              <Typography variant="body2" className="section-label">
                Informasi Organisasi
              </Typography>
              
              <div className="form-field">
                <Typography variant="body2" className="form-field__label" weight="medium">
                  Jenis Akun <span className="form-field__required">*</span>
                </Typography>
                <div className="select-wrapper">
                  <i className="fas fa-user-tag select-icon"></i>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className={`form-select ${formErrors.role ? 'form-select--error' : ''}`}
                    disabled={isFormLoading}
                    required
                  >
                    <option value={USER_ROLES.PEMOHON}>OPD/Instansi Pemohon</option>
                    <option value={USER_ROLES.PENGELOLA_TEKNIS}>Pengelola Teknis</option>
                    <option value={USER_ROLES.OPERATOR}>Operator Verifikasi</option>
                    <option value={USER_ROLES.KEPALA_SEKSI}>Kepala Seksi/Bidang</option>
                    <option value={USER_ROLES.ADMINISTRATOR}>Administrator Sistem</option>
                  </select>
                </div>
                {formErrors.role && (
                  <span className="field-error">{formErrors.role}</span>
                )}
              </div>

              {formData.role !== USER_ROLES.PEMOHON && (
                <>
                  <FormField
                    label="Nama Organisasi/Instansi"
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    placeholder="Contoh: Dinas PUPR Sulawesi Tengah"
                    required
                    error={formErrors.organization}
                    disabled={isFormLoading}
                    leftIcon={<i className="fas fa-building"></i>}
                    helperText="Nama lengkap organisasi atau instansi"
                  />

                  <FormField
                    label="Jabatan"
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    placeholder="Contoh: Staff Teknis"
                    required
                    error={formErrors.position}
                    disabled={isFormLoading}
                    leftIcon={<i className="fas fa-id-badge"></i>}
                    helperText="Jabatan atau posisi di organisasi"
                  />
                </>
              )}
            </div>

            {/* Password Section */}
            <div className="form-section">
              <Typography variant="body2" className="section-label">
                Keamanan Akun
              </Typography>
              
              <FormField
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Buat password yang kuat"
                required
                error={formErrors.password}
                disabled={isFormLoading}
                autoComplete="new-password"
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

              {formData.password && passwordStrength && (
                <div className="password-strength">
                  <div className="strength-label">
                    <Typography variant="caption">
                      Kekuatan Password: 
                      <span style={{ color: passwordStrength.color, fontWeight: 'bold' }}>
                        {passwordStrength.text}
                      </span>
                    </Typography>
                  </div>
                  <div className="strength-bar">
                    <div 
                      className={`strength-fill strength-${passwordStrength.level}`}
                      style={{ backgroundColor: passwordStrength.color }}
                    ></div>
                  </div>
                </div>
              )}

              <FormField
                label="Konfirmasi Password"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Ketik ulang password Anda"
                required
                error={formErrors.confirmPassword}
                disabled={isFormLoading}
                autoComplete="new-password"
                leftIcon={<i className="fas fa-lock"></i>}
                rightIcon={
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
                    aria-label={showConfirmPassword ? "Sembunyikan password" : "Tampilkan password"}
                  >
                    <i className={showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                  </button>
                }
              />
            </div>

            {/* Terms and Conditions */}
            <div className="terms-section">
              <label className="terms-checkbox">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  disabled={isFormLoading}
                />
                <span className="checkmark"></span>
                <Typography variant="body2" className="terms-text">
                  Saya menyetujui{' '}
                  <Link to="/terms" target="_blank" className="terms-link">
                    Syarat dan Ketentuan
                  </Link>
                  {' '}serta{' '}
                  <Link to="/privacy" target="_blank" className="terms-link">
                    Kebijakan Privasi
                  </Link>
                  {' '}E-Bantek Sulawesi Tengah
                </Typography>
              </label>
              {formErrors.terms && (
                <span className="field-error">{formErrors.terms}</span>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              loading={isFormLoading}
              disabled={isFormLoading}
            >
              {isFormLoading ? 'Mendaftar...' : 'Daftar Sekarang'}
            </Button>
          </form>

          {/* OAuth Section */}
          <div className="oauth-section">
            <div className="oauth-divider">
              <span>atau</span>
            </div>

            <GoogleSignIn
              text="Daftar dengan Google"
              variant="secondary"
              size="large"
              fullWidth
              disabled={isFormLoading}
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
          </div>

          {/* Login Link */}
          <div className="register-footer">
            <Typography variant="body2">
              Sudah punya akun?{' '}
              <Link to="/login" className="login-link">
                Masuk di sini
              </Link>
            </Typography>
          </div>
        </div>

        {/* Footer */}
        <div className="register-page-footer">
          <Typography variant="body2" className="footer-text">
            © 2025 E-Bantek Sulawesi Tengah. Dinas Cipta Karya dan Sumber Daya Air.
          </Typography>
        </div>
      </div>

      {/* Background */}
      <div className="register-background">
        <div className="background-pattern"></div>
        <div className="background-overlay"></div>
      </div>
    </div>
  );
};

export default Register;