import { Link, useRouteError } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const error = useRouteError();
  
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          {/* 404 Visual */}
          <div className="error-visual">
            <div className="error-code">404</div>
            <div className="error-icon">🏗️</div>
          </div>
          
          {/* Error Message */}
          <div className="error-message">
            <h1 className="error-title">Halaman Tidak Ditemukan</h1>
            <p className="error-description">
              Maaf, halaman yang Anda cari tidak dapat ditemukan. 
              Mungkin halaman telah dipindahkan atau URL yang Anda masukkan salah.
            </p>
            
            {/* Show error details in development */}
            {error && import.meta.env.DEV && (
              <details className="error-details">
                <summary>Error Details (Development)</summary>
                <pre>{error.statusText || error.message}</pre>
                {error.stack && <pre>{error.stack}</pre>}
              </details>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="error-actions">
            <Link to="/" className="btn btn-primary">
              <span>🏠</span>
              Kembali ke Beranda
            </Link>
            <Link to="/app/dashboard" className="btn btn-secondary">
              <span>📊</span>
              Ke Dashboard
            </Link>
          </div>
          
          {/* Quick Links */}
          <div className="quick-links">
            <h3>Mungkin Anda mencari:</h3>
            <div className="links-grid">
              <Link to="/app/services/perhitungan-nilai-sisa" className="quick-link">
                <span className="link-icon">🏢</span>
                <span className="link-text">Perhitungan Nilai Sisa</span>
              </Link>
              <Link to="/app/services/asesmen-bangunan" className="quick-link">
                <span className="link-icon">🏗️</span>
                <span className="link-text">Asesmen Bangunan</span>
              </Link>
              <Link to="/app/services/usulan-pembiayaan" className="quick-link">
                <span className="link-icon">💰</span>
                <span className="link-text">Usulan Pembiayaan</span>
              </Link>
              <Link to="/app/reports" className="quick-link">
                <span className="link-icon">📊</span>
                <span className="link-text">Reports</span>
              </Link>
            </div>
          </div>
          
          {/* Support Info */}
          <div className="support-info">
            <p>
              Butuh bantuan? <Link to="/app/help" className="support-link">Hubungi Support</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;