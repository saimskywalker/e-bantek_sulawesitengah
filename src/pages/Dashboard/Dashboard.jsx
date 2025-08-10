import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { USER_ROLES } from '../../context/AuthContext';
import Button from '../../components/atoms/Button';
import Typography from '../../components/atoms/Typography';
import Card from '../../components/molecules/Card';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout, isLoading, userRole, getDashboardPath } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Redirect to role-specific dashboard
  useEffect(() => {
    if (userRole && !isLoading) {
      const rolePath = getDashboardPath();
      if (rolePath !== '/dashboard') {
        navigate(rolePath, { replace: true });
      }
    }
  }, [userRole, isLoading, navigate, getDashboardPath]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(true);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const currentTime = new Date();
  const hour = currentTime.getHours();
  let greeting = 'Selamat Pagi';
  if (hour >= 12 && hour < 17) greeting = 'Selamat Siang';
  else if (hour >= 17 && hour < 19) greeting = 'Selamat Sore';
  else if (hour >= 19) greeting = 'Selamat Malam';

  const quickActions = [
    {
      id: 'perhitungan-nilai-sisa',
      title: 'Perhitungan Nilai Sisa',
      description: 'Analisis teknis untuk evaluasi kondisi bangunan',
      icon: 'fas fa-calculator',
      color: 'primary',
      path: '/app/services/perhitungan-nilai-sisa'
    },
    {
      id: 'asesmen-bangunan',
      title: 'Asesmen Bangunan',
      description: 'Evaluasi komprehensif struktur dan keamanan',
      icon: 'fas fa-building',
      color: 'success',
      path: '/app/services/asesmen-bangunan'
    },
    {
      id: 'usulan-pembiayaan',
      title: 'Usulan Pembiayaan',
      description: 'Perencanaan anggaran dan proposal keuangan',
      icon: 'fas fa-money-bill-wave',
      color: 'warning',
      path: '/app/services/usulan-pembiayaan'
    },
    {
      id: 'tim-teknis',
      title: 'Tim Teknis',
      description: 'Konsultasi dengan ahli konstruksi berpengalaman',
      icon: 'fas fa-users',
      color: 'info',
      path: '/app/services/tim-teknis'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Mendaftar akun',
      timestamp: user?.createdAt || new Date().toISOString(),
      status: 'completed'
    },
    {
      id: 2,
      action: 'Verifikasi email',
      timestamp: new Date().toISOString(),
      status: user?.isEmailVerified ? 'completed' : 'pending'
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
        <Typography variant="body1">Memuat dashboard...</Typography>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      {/* Header */}
      <header className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div className="brand-section">
              <Link to="/" className="dashboard-brand">
                <Typography variant="h2" className="brand-name">
                  E-Bantek
                </Typography>
                <Typography variant="caption" className="brand-subtitle">
                  Sulawesi Tengah
                </Typography>
              </Link>
            </div>
            
            <div className="header-actions">
              <div className="user-menu">
                <div className="user-info">
                  <div className="user-avatar">
                    {user?.profilePicture ? (
                      <img src={user.profilePicture} alt="Profile" />
                    ) : (
                      <i className="fas fa-user"></i>
                    )}
                  </div>
                  <div className="user-details">
                    <Typography variant="body2" className="user-name">
                      {user?.name || 'User'}
                    </Typography>
                    <Typography variant="caption" className="user-email">
                      {user?.email}
                    </Typography>
                  </div>
                </div>
                
                <Button
                  variant="secondary"
                  size="small"
                  onClick={confirmLogout}
                  icon={<i className="fas fa-sign-out-alt"></i>}
                >
                  Keluar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="container">
          {/* Welcome Section */}
          <section className="welcome-section">
            <div className="welcome-content">
              <Typography variant="h3" className="welcome-title">
                {greeting}, {user?.name?.split(' ')[0] || 'User'}! 👋
              </Typography>
              <Typography variant="body1" className="welcome-subtitle">
                Selamat datang di Platform E-Bantek. Akses layanan bantuan teknis konstruksi dengan mudah dan efisien.
              </Typography>
              
              {!user?.isEmailVerified && (
                <div className="verification-notice">
                  <div className="notice-content">
                    <i className="fas fa-exclamation-triangle"></i>
                    <div className="notice-text">
                      <Typography variant="body2" weight="medium">
                        Email belum diverifikasi
                      </Typography>
                      <Typography variant="caption">
                        Silakan cek email Anda dan klik link verifikasi untuk mengaktifkan semua fitur.
                      </Typography>
                    </div>
                  </div>
                  <Button variant="primary" size="small">
                    Kirim Ulang Email
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* Quick Actions */}
          <section className="quick-actions-section">
            <Typography variant="h4" className="section-title">
              Layanan Utama
            </Typography>
            
            <div className="quick-actions-grid">
              {quickActions.map((action) => (
                <Card key={action.id} className={`quick-action-card card--${action.color}`}>
                  <div className="action-icon">
                    <i className={action.icon}></i>
                  </div>
                  <div className="action-content">
                    <Typography variant="h6" className="action-title">
                      {action.title}
                    </Typography>
                    <Typography variant="body2" className="action-description">
                      {action.description}
                    </Typography>
                  </div>
                  <div className="action-button">
                    <Link to={action.path} className="btn btn-outline">
                      Akses Layanan
                      <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Dashboard Stats */}
          <section className="stats-section">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-file-alt"></i>
                </div>
                <div className="stat-content">
                  <Typography variant="h4" className="stat-number">
                    0
                  </Typography>
                  <Typography variant="body2" className="stat-label">
                    Pengajuan Aktif
                  </Typography>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="stat-content">
                  <Typography variant="h4" className="stat-number">
                    0
                  </Typography>
                  <Typography variant="body2" className="stat-label">
                    Layanan Selesai
                  </Typography>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="stat-content">
                  <Typography variant="h4" className="stat-number">
                    0
                  </Typography>
                  <Typography variant="body2" className="stat-label">
                    Dalam Proses
                  </Typography>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-calendar-alt"></i>
                </div>
                <div className="stat-content">
                  <Typography variant="h4" className="stat-number">
                    {formatDate(user?.createdAt || new Date().toISOString()).split(',')[0]}
                  </Typography>
                  <Typography variant="body2" className="stat-label">
                    Bergabung Sejak
                  </Typography>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Activities */}
          <section className="activities-section">
            <Typography variant="h4" className="section-title">
              Aktivitas Terbaru
            </Typography>
            
            <div className="activities-list">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-status">
                    <div className={`status-indicator status--${activity.status}`}>
                      {activity.status === 'completed' ? (
                        <i className="fas fa-check"></i>
                      ) : (
                        <i className="fas fa-clock"></i>
                      )}
                    </div>
                  </div>
                  <div className="activity-content">
                    <Typography variant="body2" className="activity-action">
                      {activity.action}
                    </Typography>
                    <Typography variant="caption" className="activity-time">
                      {formatDate(activity.timestamp)}
                    </Typography>
                  </div>
                </div>
              ))}
              
              <div className="activity-item activity-placeholder">
                <div className="activity-status">
                  <div className="status-indicator status--upcoming">
                    <i className="fas fa-plus"></i>
                  </div>
                </div>
                <div className="activity-content">
                  <Typography variant="body2" className="activity-action">
                    Aktivitas Anda akan muncul di sini
                  </Typography>
                  <Typography variant="caption" className="activity-time">
                    Mulai gunakan layanan E-Bantek untuk melihat riwayat aktivitas
                  </Typography>
                </div>
              </div>
            </div>
          </section>

          {/* Coming Soon Features */}
          <section className="coming-soon-section">
            <Typography variant="h4" className="section-title">
              Fitur Mendatang
            </Typography>
            
            <div className="coming-soon-grid">
              <div className="coming-soon-card">
                <div className="feature-icon">
                  <i className="fas fa-map-marked-alt"></i>
                </div>
                <Typography variant="h6" className="feature-title">
                  GIS Mapping
                </Typography>
                <Typography variant="body2" className="feature-description">
                  Peta interaktif untuk visualisasi data geografis dan lokasi proyek
                </Typography>
                <div className="feature-badge">Segera Hadir</div>
              </div>
              
              <div className="coming-soon-card">
                <div className="feature-icon">
                  <i className="fas fa-robot"></i>
                </div>
                <Typography variant="h6" className="feature-title">
                  AI Assistant
                </Typography>
                <Typography variant="body2" className="feature-description">
                  Asisten AI untuk membantu menjawab pertanyaan dan memberikan panduan
                </Typography>
                <div className="feature-badge">Segera Hadir</div>
              </div>
              
              <div className="coming-soon-card">
                <div className="feature-icon">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <Typography variant="h6" className="feature-title">
                  Mobile App
                </Typography>
                <Typography variant="body2" className="feature-description">
                  Aplikasi mobile untuk akses layanan E-Bantek kapan saja, di mana saja
                </Typography>
                <div className="feature-badge">Segera Hadir</div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <Typography variant="h5">Konfirmasi Keluar</Typography>
            </div>
            <div className="modal-body">
              <Typography variant="body1">
                Apakah Anda yakin ingin keluar dari akun Anda?
              </Typography>
            </div>
            <div className="modal-actions">
              <Button variant="secondary" onClick={cancelLogout}>
                Batal
              </Button>
              <Button variant="primary" onClick={handleLogout}>
                Ya, Keluar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;