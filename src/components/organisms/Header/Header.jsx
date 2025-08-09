import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header nav-theme">
      <div className="header-container">
        {/* Logo and Brand */}
        <div className="header-brand">
          <Link to="/" className="brand-link">
            <div className="brand-logo">
              <span className="logo-text">e-Bantek</span>
            </div>
            <div className="brand-tagline">
              <span className="tagline-text">Platform Teknis</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="header-nav hidden-mobile">
          <ul className="nav-list">
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${isActiveRoute('/') ? 'active' : ''}`}
              >
                Beranda
              </Link>
            </li>
            <li className="nav-item dropdown">
              <button className="nav-link dropdown-toggle">
                Layanan
                <svg className="dropdown-icon" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M2 4l4 4 4-4H2z"/>
                </svg>
              </button>
              <div className="dropdown-menu">
                <Link to="/services/perhitungan-nilai-sisa" className="dropdown-item">
                  Perhitungan Nilai Sisa
                </Link>
                <Link to="/services/asesmen-bangunan" className="dropdown-item">
                  Asesmen Bangunan  
                </Link>
                <Link to="/services/usulan-pembiayaan" className="dropdown-item">
                  Usulan Pembiayaan
                </Link>
                <Link to="/services/tim-teknis" className="dropdown-item">
                  Tim Teknis
                </Link>
                <Link to="/services/peneliti-kontrak" className="dropdown-item">
                  Peneliti Kontrak
                </Link>
                <Link to="/services/pendampingan-pho-fho" className="dropdown-item">
                  Pendampingan PHO/FHO
                </Link>
                <Link to="/services/pengelola-teknis" className="dropdown-item">
                  Pengelola Teknis
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <Link 
                to="/transparency" 
                className={`nav-link ${isActiveRoute('/transparency') ? 'active' : ''}`}
              >
                Transparansi
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/reports" 
                className={`nav-link ${isActiveRoute('/reports') ? 'active' : ''}`}
              >
                Laporan
              </Link>
            </li>
          </ul>
        </nav>

        {/* User Actions */}
        <div className="header-actions hidden-mobile">
          <button className="action-btn notification-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076A12.84 12.84 0 0010 15a12.84 12.84 0 006.742-.69.75.75 0 00.515-1.076C16.454 11.665 16 9.887 16 8a6 6 0 00-6-6zM6.75 15a3.25 3.25 0 006.5 0H6.75z"/>
            </svg>
            <span className="sr-only">Notifications</span>
          </button>
          
          <div className="user-menu">
            <button className="user-btn">
              <div className="user-avatar">
                <span>U</span>
              </div>
              <span className="user-name">User</span>
              <svg className="dropdown-icon" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M2 4l4 4 4-4H2z"/>
              </svg>
            </button>
            <div className="user-dropdown">
              <Link to="/profile" className="dropdown-item">Profile</Link>
              <Link to="/settings" className="dropdown-item">Settings</Link>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item">Logout</button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn hidden-desktop"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            {isMobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="mobile-nav hidden-desktop">
          <nav className="mobile-nav-content">
            <Link to="/" className="mobile-nav-link" onClick={toggleMobileMenu}>
              Beranda
            </Link>
            <div className="mobile-nav-section">
              <h4 className="mobile-nav-title">Layanan</h4>
              <Link to="/services/perhitungan-nilai-sisa" className="mobile-nav-link" onClick={toggleMobileMenu}>
                Perhitungan Nilai Sisa
              </Link>
              <Link to="/services/asesmen-bangunan" className="mobile-nav-link" onClick={toggleMobileMenu}>
                Asesmen Bangunan
              </Link>
              <Link to="/services/usulan-pembiayaan" className="mobile-nav-link" onClick={toggleMobileMenu}>
                Usulan Pembiayaan
              </Link>
              <Link to="/services/tim-teknis" className="mobile-nav-link" onClick={toggleMobileMenu}>
                Tim Teknis
              </Link>
              <Link to="/services/peneliti-kontrak" className="mobile-nav-link" onClick={toggleMobileMenu}>
                Peneliti Kontrak
              </Link>
              <Link to="/services/pendampingan-pho-fho" className="mobile-nav-link" onClick={toggleMobileMenu}>
                Pendampingan PHO/FHO
              </Link>
              <Link to="/services/pengelola-teknis" className="mobile-nav-link" onClick={toggleMobileMenu}>
                Pengelola Teknis
              </Link>
            </div>
            <Link to="/transparency" className="mobile-nav-link" onClick={toggleMobileMenu}>
              Transparansi
            </Link>
            <Link to="/reports" className="mobile-nav-link" onClick={toggleMobileMenu}>
              Laporan
            </Link>
            <div className="mobile-nav-divider"></div>
            <Link to="/profile" className="mobile-nav-link" onClick={toggleMobileMenu}>
              Profile
            </Link>
            <Link to="/settings" className="mobile-nav-link" onClick={toggleMobileMenu}>
              Settings
            </Link>
            <button className="mobile-nav-link logout-btn" onClick={toggleMobileMenu}>
              Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;