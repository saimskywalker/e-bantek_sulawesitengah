import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isCollapsed, onToggleCollapse }) => {
  const location = useLocation();
  const [expandedSection, setExpandedSection] = useState('services');

  const isActiveRoute = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const serviceModules = [
    {
      id: 'perhitungan-nilai-sisa',
      name: 'Perhitungan Nilai Sisa',
      description: 'Hitung nilai sisa aset',
      icon: '🏢',
      path: '/services/perhitungan-nilai-sisa',
      color: 'service-assessment'
    },
    {
      id: 'asesmen-bangunan',
      name: 'Asesmen Bangunan',
      description: 'Evaluasi kondisi bangunan',
      icon: '🏗️',
      path: '/services/asesmen-bangunan',
      color: 'service-financing'
    },
    {
      id: 'usulan-pembiayaan',
      name: 'Usulan Pembiayaan',
      description: 'Proposal pembiayaan',
      icon: '💰',
      path: '/services/usulan-pembiayaan',
      color: 'service-technical'
    },
    {
      id: 'tim-teknis',
      name: 'Tim Teknis',
      description: 'Manajemen tim teknis',
      icon: '👥',
      path: '/services/tim-teknis',
      color: 'service-research'
    },
    {
      id: 'peneliti-kontrak',
      name: 'Peneliti Kontrak',
      description: 'Riset dan analisis kontrak',
      icon: '🔍',
      path: '/services/peneliti-kontrak',
      color: 'service-management'
    },
    {
      id: 'pendampingan-pho-fho',
      name: 'Pendampingan PHO/FHO',
      description: 'Serah terima pekerjaan',
      icon: '✅',
      path: '/services/pendampingan-pho-fho',
      color: 'service-assessment'
    },
    {
      id: 'pengelola-teknis',
      name: 'Pengelola Teknis',
      description: 'Pengelolaan teknis proyek',
      icon: '⚙️',
      path: '/services/pengelola-teknis',
      color: 'service-financing'
    }
  ];

  const futureFeatures = [
    {
      id: 'gis-mapping',
      name: 'GIS Mapping',
      description: 'Peta interaktif',
      icon: '🗺️',
      path: '/features/gis-mapping',
      badge: 'Soon'
    },
    {
      id: 'ai-helpdesk',
      name: 'AI Assistant',
      description: 'Bantuan AI',
      icon: '🤖',
      path: '/features/ai-helpdesk',
      badge: 'Beta'
    },
    {
      id: 'reports',
      name: 'Reports',
      description: 'Laporan otomatis',
      icon: '📊',
      path: '/reports'
    },
    {
      id: 'transparency',
      name: 'Transparansi',
      description: 'Portal publik',
      icon: '🌐',
      path: '/transparency'
    }
  ];

  return (
    <aside className={`sidebar sidebar-theme ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="sidebar-toggle">
          <button 
            className="toggle-btn"
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path 
                fillRule="evenodd" 
                d={isCollapsed 
                  ? "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  : "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                }
              />
            </svg>
          </button>
        </div>

        {!isCollapsed && (
          <div className="sidebar-title">
            <h2>Menu Utama</h2>
            <p>Platform e-Bantek</p>
          </div>
        )}
      </div>

      {/* Sidebar Navigation */}
      <nav className="sidebar-nav">
        {/* Quick Links */}
        <div className="nav-section">
          {!isCollapsed && <h3 className="section-title">Quick Access</h3>}
          
        </div>

        {/* Core Services */}
        <div className="nav-section">
          {!isCollapsed && (
            <button 
              className={`section-toggle ${expandedSection === 'services' ? 'expanded' : ''}`}
              onClick={() => toggleSection('services')}
            >
              <h3 className="section-title">Layanan Utama</h3>
              <svg className="section-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 6l4 4 4-4H4z"/>
              </svg>
            </button>
          )}

          {(isCollapsed || expandedSection === 'services') && (
            <div className="nav-group">
              {serviceModules.map((service) => (
                <Link
                  key={service.id}
                  to={service.path}
                  className={`sidebar-link service-link ${service.color} ${
                    isActiveRoute(service.path) ? 'active' : ''
                  }`}
                  title={service.name}
                >
                  <span className="link-icon">{service.icon}</span>
                  {!isCollapsed && (
                    <div className="link-content">
                      <span className="link-title">{service.name}</span>
                      <span className="link-description">{service.description}</span>
                    </div>
                  )}
                  {!isCollapsed && isActiveRoute(service.path) && (
                    <span className="active-indicator"></span>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Additional Features */}
        <div className="nav-section">
          {!isCollapsed && (
            <button 
              className={`section-toggle ${expandedSection === 'features' ? 'expanded' : ''}`}
              onClick={() => toggleSection('features')}
            >
              <h3 className="section-title">Fitur Tambahan</h3>
              <svg className="section-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 6l4 4 4-4H4z"/>
              </svg>
            </button>
          )}

          {(isCollapsed || expandedSection === 'features') && (
            <div className="nav-group">
              {futureFeatures.map((feature) => (
                <Link
                  key={feature.id}
                  to={feature.path}
                  className={`sidebar-link feature-link ${
                    isActiveRoute(feature.path) ? 'active' : ''
                  }`}
                  title={feature.name}
                >
                  <span className="link-icon">{feature.icon}</span>
                  {!isCollapsed && (
                    <div className="link-content">
                      <span className="link-title">
                        {feature.name}
                        {feature.badge && (
                          <span className={`link-badge badge-${feature.badge.toLowerCase()}`}>
                            {feature.badge}
                          </span>
                        )}
                      </span>
                      <span className="link-description">{feature.description}</span>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        {!isCollapsed && (
          <div className="footer-content">
            <div className="help-section">
              <Link to="/help" className="help-link">
                <span className="help-icon">❓</span>
                <span>Bantuan & Support</span>
              </Link>
            </div>
            <div className="version-info">
              <span className="version-text">e-Bantek v1.0.0</span>
            </div>
          </div>
        )}
        
        {isCollapsed && (
          <Link to="/help" className="help-link-collapsed" title="Bantuan">
            <span className="help-icon">❓</span>
          </Link>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;