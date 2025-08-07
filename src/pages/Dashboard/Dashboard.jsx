import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Dashboard e-Bantek</h1>
          <p className="dashboard-subtitle">Ringkasan dan analitik platform teknis</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary">
            <span>📊</span>
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🏢</div>
          <div className="stat-content">
            <div className="stat-value">1,247</div>
            <div className="stat-label">Total Proyek</div>
            <div className="stat-change positive">+12% bulan ini</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-value">Rp 2.4T</div>
            <div className="stat-label">Nilai Asset</div>
            <div className="stat-change positive">+8% bulan ini</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-value">89%</div>
            <div className="stat-label">Completion Rate</div>
            <div className="stat-change positive">+3% bulan ini</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-value">156</div>
            <div className="stat-label">Tim Aktif</div>
            <div className="stat-change neutral">Sama dengan bulan lalu</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Quick Actions */}
        <div className="dashboard-card quick-actions">
          <div className="card-header">
            <h2 className="card-title">Quick Actions</h2>
          </div>
          <div className="actions-grid">
            <button className="action-btn service-assessment">
              <span className="action-icon">🏢</span>
              <span className="action-label">Hitung Nilai Sisa</span>
            </button>
            <button className="action-btn service-financing">
              <span className="action-icon">🏗️</span>
              <span className="action-label">Asesmen Bangunan</span>
            </button>
            <button className="action-btn service-technical">
              <span className="action-icon">💰</span>
              <span className="action-label">Usulan Pembiayaan</span>
            </button>
            <button className="action-btn service-research">
              <span className="action-icon">👥</span>
              <span className="action-label">Kelola Tim</span>
            </button>
          </div>
        </div>

        {/* Recent Projects */}
        <div className="dashboard-card recent-projects">
          <div className="card-header">
            <h2 className="card-title">Proyek Terbaru</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="projects-list">
            <div className="project-item">
              <div className="project-info">
                <h3 className="project-name">Pembangunan Jembatan Siak</h3>
                <p className="project-details">Tim Teknis • Rp 45.2M</p>
              </div>
              <div className="project-status">
                <span className="status-badge status-progress">In Progress</span>
                <span className="project-progress">68%</span>
              </div>
            </div>

            <div className="project-item">
              <div className="project-info">
                <h3 className="project-name">Asesmen Gedung Perkantoran</h3>
                <p className="project-details">Asesmen • Rp 12.8M</p>
              </div>
              <div className="project-status">
                <span className="status-badge status-completed">Completed</span>
                <span className="project-progress">100%</span>
              </div>
            </div>

            <div className="project-item">
              <div className="project-info">
                <h3 className="project-name">Renovasi Infrastruktur IT</h3>
                <p className="project-details">Pengelola Teknis • Rp 23.1M</p>
              </div>
              <div className="project-status">
                <span className="status-badge status-review">Under Review</span>
                <span className="project-progress">85%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="dashboard-card activity-feed">
          <div className="card-header">
            <h2 className="card-title">Recent Activity</h2>
          </div>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">📊</div>
              <div className="activity-content">
                <p className="activity-text">
                  <strong>Laporan Bulanan</strong> telah di-generate
                </p>
                <span className="activity-time">2 jam lalu</span>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon">✅</div>
              <div className="activity-content">
                <p className="activity-text">
                  <strong>Proyek Jembatan Siak</strong> mencapai milestone baru
                </p>
                <span className="activity-time">4 jam lalu</span>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon">👥</div>
              <div className="activity-content">
                <p className="activity-text">
                  <strong>3 anggota tim baru</strong> bergabung
                </p>
                <span className="activity-time">1 hari lalu</span>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon">💰</div>
              <div className="activity-content">
                <p className="activity-text">
                  <strong>Usulan pembiayaan</strong> telah disetujui
                </p>
                <span className="activity-time">2 hari lalu</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="dashboard-card system-status">
          <div className="card-header">
            <h2 className="card-title">System Status</h2>
          </div>
          <div className="status-list">
            <div className="status-item">
              <div className="status-indicator status-online"></div>
              <span className="status-label">Database</span>
              <span className="status-value">Online</span>
            </div>
            <div className="status-item">
              <div className="status-indicator status-online"></div>
              <span className="status-label">API Services</span>
              <span className="status-value">All Good</span>
            </div>
            <div className="status-item">
              <div className="status-indicator status-warning"></div>
              <span className="status-label">File Storage</span>
              <span className="status-value">85% Full</span>
            </div>
            <div className="status-item">
              <div className="status-indicator status-online"></div>
              <span className="status-label">Backup System</span>
              <span className="status-value">Last: 2h ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Future Features Preview */}
      <div className="future-preview">
        <h2 className="preview-title">Coming Soon</h2>
        <div className="preview-grid">
          <div className="preview-card">
            <div className="preview-icon">🗺️</div>
            <h3>GIS Integration</h3>
            <p>Interactive maps with project locations</p>
          </div>
          <div className="preview-card">
            <div className="preview-icon">🤖</div>
            <h3>AI Assistant</h3>
            <p>Smart recommendations and insights</p>
          </div>
          <div className="preview-card">
            <div className="preview-icon">📱</div>
            <h3>Mobile App</h3>
            <p>Access your data on the go</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;