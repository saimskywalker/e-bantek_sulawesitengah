import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { USER_ROLES, PERMISSIONS } from '../../context/AuthContext';
import serviceRequestService from '../../services/serviceRequestService';
import Button from '../../components/atoms/Button';
import Typography from '../../components/atoms/Typography';
import Card from '../../components/molecules/Card';
import './Dashboard.css';
import './PemohonDashboard.css';

const PemohonDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, isLoading, hasRole, hasPermission } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [stats, setStats] = useState(null);
  const [recentRequests, setRecentRequests] = useState([]);
  const [drafts, setDrafts] = useState({});
  const [loading, setLoading] = useState(true);

  // Verify user has correct role
  useEffect(() => {
    if (!hasRole(USER_ROLES.PEMOHON)) {
      navigate('/dashboard');
    }
  }, [hasRole, navigate]);

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        
        // Load statistics
        const statistics = await serviceRequestService.getStatistics(user?.id);
        setStats(statistics);
        
        // Load recent requests
        const userRequests = await serviceRequestService.getUserRequests(user?.id);
        setRecentRequests(userRequests.slice(-5).reverse()); // Last 5 requests
        
        // Load drafts
        const userDrafts = serviceRequestService.getDrafts(user?.id);
        setDrafts(userDrafts);
        
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      loadDashboardData();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const confirmLogout = () => setShowLogoutConfirm(true);
  const cancelLogout = () => setShowLogoutConfirm(false);

  // Service types for Level 1 users
  const serviceTypes = [
    {
      id: 'perhitungan-nilai-sisa',
      title: 'Perhitungan Nilai Sisa',
      description: 'Perhitungan nilai sisa dan layak jual aset bangunan',
      icon: 'fas fa-calculator',
      color: 'primary',
      path: '/services/perhitungan-nilai-sisa'
    },
    {
      id: 'assessment-bangunan',
      title: 'Assessment Bangunan',
      description: 'Evaluasi kondisi dan kelayakan bangunan',
      icon: 'fas fa-building',
      color: 'success',
      path: '/services/assessment-bangunan'
    },
    {
      id: 'usulan-pembiayaan',
      title: 'Usulan Pembiayaan',
      description: 'Pengajuan proposal pembiayaan proyek',
      icon: 'fas fa-money-bill-wave',
      color: 'warning',
      path: '/services/usulan-pembiayaan'
    },
    {
      id: 'tim-teknis',
      title: 'Tim Teknis',
      description: 'Permohonan bantuan tim teknis/unsur teknis',
      icon: 'fas fa-users',
      color: 'info',
      path: '/services/tim-teknis'
    },
    {
      id: 'peneliti-kontrak',
      title: 'Peneliti Kontrak',
      description: 'Permintaan penelitian kontrak pekerjaan',
      icon: 'fas fa-search',
      color: 'secondary',
      path: '/services/peneliti-kontrak'
    },
    {
      id: 'pendampingan-pho-fho',
      title: 'Pendampingan PHO/FHO',
      description: 'Pendampingan serah terima pekerjaan',
      icon: 'fas fa-handshake',
      color: 'success',
      path: '/services/pendampingan-pho-fho'
    },
    {
      id: 'pengelola-teknis',
      title: 'Pengelola Teknis',
      description: 'Permohonan pengelola teknis proyek',
      icon: 'fas fa-hard-hat',
      color: 'primary',
      path: '/services/pengelola-teknis'
    }
  ];

  const currentTime = new Date();
  const hour = currentTime.getHours();
  let greeting = 'Selamat Pagi';
  if (hour >= 12 && hour < 17) greeting = 'Selamat Siang';
  else if (hour >= 17 && hour < 19) greeting = 'Selamat Sore';
  else if (hour >= 19) greeting = 'Selamat Malam';

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'DRAFT': return 'secondary';
      case 'SUBMITTED': return 'info';
      case 'UNDER_REVIEW': return 'warning';
      case 'VERIFIED': return 'success';
      case 'APPROVED': return 'success';
      case 'ASSIGNED': return 'primary';
      case 'IN_PROGRESS': return 'primary';
      case 'COMPLETED': return 'success';
      case 'REJECTED': return 'danger';
      default: return 'secondary';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'DRAFT': return 'Draft';
      case 'SUBMITTED': return 'Disubmit';
      case 'UNDER_REVIEW': return 'Ditinjau';
      case 'VERIFIED': return 'Diverifikasi';
      case 'APPROVED': return 'Disetujui';
      case 'ASSIGNED': return 'Ditugaskan';
      case 'IN_PROGRESS': return 'Dalam Proses';
      case 'COMPLETED': return 'Selesai';
      case 'REJECTED': return 'Ditolak';
      default: return status;
    }
  };

  if (loading || isLoading) {
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
    <div className="dashboard-page pemohon-dashboard">
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
                      {user?.organization || user?.email}
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
                Selamat datang di Dashboard Pemohon E-Bantek. Ajukan permohonan layanan bantuan teknis dengan mudah dan pantau status pengajuan Anda.
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
                        Silakan cek email Anda untuk mengaktifkan semua fitur.
                      </Typography>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Statistics Section */}
          <section className="stats-section">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-file-alt"></i>
                </div>
                <div className="stat-content">
                  <Typography variant="h4" className="stat-number">
                    {stats?.total || 0}
                  </Typography>
                  <Typography variant="body2" className="stat-label">
                    Total Pengajuan
                  </Typography>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="stat-content">
                  <Typography variant="h4" className="stat-number">
                    {stats?.inProgress || 0}
                  </Typography>
                  <Typography variant="body2" className="stat-label">
                    Dalam Proses
                  </Typography>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="stat-content">
                  <Typography variant="h4" className="stat-number">
                    {stats?.completed || 0}
                  </Typography>
                  <Typography variant="body2" className="stat-label">
                    Selesai
                  </Typography>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-edit"></i>
                </div>
                <div className="stat-content">
                  <Typography variant="h4" className="stat-number">
                    {Object.keys(drafts).length}
                  </Typography>
                  <Typography variant="body2" className="stat-label">
                    Draft Tersimpan
                  </Typography>
                </div>
              </div>
            </div>
          </section>

          {/* Service Selection */}
          <section className="services-section">
            <Typography variant="h4" className="section-title">
              Layanan Bantuan Teknis
            </Typography>
            <Typography variant="body1" className="section-subtitle">
              Pilih jenis layanan yang Anda butuhkan
            </Typography>
            
            <div className="services-grid">
              {serviceTypes.map((service) => (
                <Card key={service.id} className={`service-card card--${service.color}`}>
                  <div className="service-icon">
                    <i className={service.icon}></i>
                  </div>
                  <div className="service-content">
                    <Typography variant="h6" className="service-title">
                      {service.title}
                    </Typography>
                    <Typography variant="body2" className="service-description">
                      {service.description}
                    </Typography>
                  </div>
                  <div className="service-button">
                    <Link to={service.path} className="btn btn-outline">
                      Ajukan Permohonan
                      <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Recent Requests */}
          <section className="recent-requests-section">
            <div className="section-header">
              <Typography variant="h4" className="section-title">
                Riwayat Pengajuan Terbaru
              </Typography>
              <Link to="/my-requests" className="view-all-link">
                Lihat Semua <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
            
            {recentRequests.length > 0 ? (
              <div className="requests-list">
                {recentRequests.map((request) => (
                  <div key={request.id} className="request-item">
                    <div className="request-info">
                      <Typography variant="body1" className="request-title">
                        {request.serviceType.replace(/_/g, ' ')}
                      </Typography>
                      <Typography variant="caption" className="request-date">
                        {formatDate(request.createdAt)}
                      </Typography>
                    </div>
                    <div className="request-status">
                      <span className={`status-badge status--${getStatusColor(request.status)}`}>
                        {getStatusText(request.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <i className="fas fa-inbox"></i>
                <Typography variant="body1">Belum ada pengajuan</Typography>
                <Typography variant="body2">
                  Mulai dengan mengajukan permohonan layanan di atas
                </Typography>
              </div>
            )}
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

export default PemohonDashboard;