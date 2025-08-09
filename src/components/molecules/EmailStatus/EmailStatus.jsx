import { useState } from 'react';
import Button from '../../atoms/Button';
import Typography from '../../atoms/Typography';
import './EmailStatus.css';

const EmailStatus = ({
  status = 'pending', // 'pending', 'verified', 'expired', 'resent'
  email,
  onResend,
  onClose,
  className = ''
}) => {
  const [isResending, setIsResending] = useState(false);

  const handleResend = async () => {
    if (!onResend || isResending) return;
    
    setIsResending(true);
    try {
      await onResend();
    } catch (error) {
      console.error('Resend failed:', error);
    } finally {
      setIsResending(false);
    }
  };

  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          icon: 'fas fa-envelope',
          iconClass: 'status-icon--pending',
          title: 'Cek Email Anda',
          message: `Kami telah mengirimkan link verifikasi ke ${email || 'alamat email Anda'}. Silakan cek inbox dan folder spam Anda.`,
          actions: (
            <div className="status-actions">
              <Button
                variant="secondary"
                size="medium"
                onClick={handleResend}
                loading={isResending}
                disabled={isResending}
              >
                {isResending ? 'Mengirim...' : 'Kirim Ulang'}
              </Button>
            </div>
          )
        };
      
      case 'verified':
        return {
          icon: 'fas fa-check-circle',
          iconClass: 'status-icon--verified',
          title: 'Email Terverifikasi!',
          message: 'Email Anda telah berhasil diverifikasi. Akun Anda sekarang sudah aktif dan siap digunakan.',
          actions: (
            <div className="status-actions">
              <Button
                variant="primary"
                size="medium"
                onClick={onClose}
              >
                Lanjutkan
              </Button>
            </div>
          )
        };
      
      case 'expired':
        return {
          icon: 'fas fa-clock',
          iconClass: 'status-icon--expired',
          title: 'Link Verifikasi Kedaluwarsa',
          message: 'Link verifikasi telah kedaluwarsa. Silakan minta link verifikasi baru untuk mengaktifkan akun Anda.',
          actions: (
            <div className="status-actions">
              <Button
                variant="primary"
                size="medium"
                onClick={handleResend}
                loading={isResending}
                disabled={isResending}
              >
                {isResending ? 'Mengirim...' : 'Kirim Link Baru'}
              </Button>
            </div>
          )
        };
      
      case 'resent':
        return {
          icon: 'fas fa-paper-plane',
          iconClass: 'status-icon--resent',
          title: 'Email Terkirim Ulang',
          message: `Link verifikasi baru telah dikirim ke ${email || 'alamat email Anda'}. Silakan cek inbox Anda.`,
          actions: (
            <div className="status-actions">
              <Button
                variant="secondary"
                size="medium"
                onClick={onClose}
              >
                Tutup
              </Button>
            </div>
          )
        };
      
      default:
        return {
          icon: 'fas fa-info-circle',
          iconClass: 'status-icon--info',
          title: 'Informasi Email',
          message: 'Status email tidak diketahui.',
          actions: null
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`email-status email-status--${status} ${className}`}>
      <div className="email-status__content">
        <div className="email-status__icon">
          <i className={`${config.icon} ${config.iconClass}`}></i>
        </div>
        
        <div className="email-status__text">
          <Typography variant="h4" className="email-status__title">
            {config.title}
          </Typography>
          <Typography variant="body1" className="email-status__message">
            {config.message}
          </Typography>
        </div>

        {config.actions && (
          <div className="email-status__actions">
            {config.actions}
          </div>
        )}
      </div>

      {status === 'pending' && (
        <div className="email-status__help">
          <Typography variant="body2" className="help-title">
            Tidak menerima email?
          </Typography>
          <ul className="help-list">
            <li>Cek folder spam atau junk email</li>
            <li>Pastikan alamat email sudah benar</li>
            <li>Tunggu beberapa menit untuk email masuk</li>
            <li>Klik "Kirim Ulang" jika perlu</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmailStatus;