import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1 className="dashboard-title">Selamat Datang di E-Bantek</h1>
          <p className="dashboard-subtitle">Platform Digital Bantuan Teknis Konstruksi</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-tasks"></i>
            </div>
            <div className="stat-info">
              <h3>12</h3>
              <p>Proyek Aktif</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-info">
              <h3>87</h3>
              <p>Proyek Selesai</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="stat-info">
              <h3>24</h3>
              <p>Tim Teknis</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="stat-info">
              <h3>95%</h3>
              <p>Tingkat Kepuasan</p>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <h2>Aksi Cepat</h2>
          <div className="actions-grid">
            <div className="action-card">
              <div className="action-icon">
                <i className="fas fa-plus-circle"></i>
              </div>
              <h3>Ajukan Layanan</h3>
              <p>Ajukan permohonan bantuan teknis baru</p>
            </div>

            <div className="action-card">
              <div className="action-icon">
                <i className="fas fa-file-alt"></i>
              </div>
              <h3>Lihat Laporan</h3>
              <p>Akses laporan proyek dan statistik</p>
            </div>

            <div className="action-card">
              <div className="action-icon">
                <i className="fas fa-calendar-check"></i>
              </div>
              <h3>Jadwal Tim</h3>
              <p>Kelola jadwal tim teknis</p>
            </div>
          </div>
        </div>

        <div className="recent-projects">
          <h2>Proyek Terbaru</h2>
          <div className="projects-list">
            <div className="project-item">
              <div className="project-info">
                <h4>Asesmen Bangunan Perkantoran</h4>
                <p>Status: <span className="status in-progress">Sedang Berlangsung</span></p>
              </div>
              <div className="project-date">
                <span>15 Jan 2025</span>
              </div>
            </div>

            <div className="project-item">
              <div className="project-info">
                <h4>Perhitungan Nilai Sisa Gedung</h4>
                <p>Status: <span className="status completed">Selesai</span></p>
              </div>
              <div className="project-date">
                <span>10 Jan 2025</span>
              </div>
            </div>

            <div className="project-item">
              <div className="project-info">
                <h4>Usulan Pembiayaan Infrastruktur</h4>
                <p>Status: <span className="status pending">Menunggu Review</span></p>
              </div>
              <div className="project-date">
                <span>8 Jan 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;