import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-page">
      {/* Navigation Bar */}
      <nav className="landing-navbar">
        <div className="container">
          <div className="navbar-content">
            <div className="navbar-brand">
              <div className="brand-logo">
                <i className="fas fa-hard-hat"></i>
                <span className="brand-text">
                  <span className="brand-main">E-Bantek</span>
                  <span className="brand-sub">Digital Construction</span>
                </span>
              </div>
            </div>
            
            <ul className="navbar-menu">
              <li className="navbar-item">
                <a href="#hero" className="navbar-link">Beranda</a>
              </li>
              <li className="navbar-item">
                <a href="#features" className="navbar-link">Layanan</a>
              </li>
              <li className="navbar-item">
                <a href="#about" className="navbar-link">Tentang</a>
              </li>
              <li className="navbar-item">
                <a href="#future-features" className="navbar-link">Teknologi</a>
              </li>
              <li className="navbar-item">
                <Link to="/app/login" className="navbar-link navbar-cta">
                  <i className="fas fa-sign-in-alt"></i>
                  Login
                </Link>
              </li>
            </ul>

            <button className="mobile-menu-toggle">
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                <span className="highlight">E-Bantek</span> Sulawesi Tengah
              </h1>
              <h2 className="hero-subtitle">Wujudkan Bangunan Berkualitas, Bangun Masa Depan Bersama</h2>
              <p className="hero-description">
                Dinas Cipta Karya dan Sumber Daya Air Provinsi Sulawesi Tengah menghadirkan platform digital 
                E-Bantek yang memudahkan akses layanan bantuan teknis konstruksi. Dengan dukungan teknologi terkini, 
                tim ahli berpengalaman, dan komitmen transparansi penuh, kami mendukung pembangunan infrastruktur 
                berkualitas di seluruh wilayah Sulawesi Tengah.
              </p>
              <div className="hero-actions">
                <Link to="/app/login" className="btn btn-primary">
                  Ready to Login
                </Link>
                <Link to="#features" className="btn btn-secondary">
                  Pelajari Lebih Lanjut
                </Link>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-image-container">
                <div className="main-hero-image">
                  <img 
                    src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Smart Construction Technology"
                    className="hero-main-img"
                    loading="eager"
                  />
                  <div className="image-overlay">
                    <div className="tech-badge">
                      <i className="fas fa-microchip"></i>
                      <span>AI-Powered</span>
                    </div>
                  </div>
                </div>
                
                <div className="floating-cards">
                  <div className="floating-card stat-card">
                    <div className="card-icon">
                      <i className="fas fa-chart-line"></i>
                    </div>
                    <div className="card-content">
                      <div className="card-number">350+</div>
                      <div className="card-label">Proyek Selesai</div>
                    </div>
                  </div>
                  
                  <div className="floating-card ai-card">
                    <div className="card-icon">
                      <i className="fas fa-brain"></i>
                    </div>
                    <div className="card-content">
                      <div className="card-number">95%</div>
                      <div className="card-label">AI Accuracy</div>
                    </div>
                  </div>
                  
                  <div className="floating-card iot-card">
                    <div className="card-icon">
                      <i className="fas fa-wifi"></i>
                    </div>
                    <div className="card-content">
                      <div className="card-number">24/7</div>
                      <div className="card-label">IoT Monitor</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Layanan Bantuan Teknis</h2>
            <p className="section-subtitle">
              Tujuh layanan bantuan teknis profesional dengan standar ISO 9001:2015 untuk mendukung pembangunan 
              infrastruktur berkualitas tinggi di seluruh wilayah Sulawesi Tengah
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card service-assessment">
              <div className="feature-icon"><i className="fas fa-chart-line"></i></div>
              <h3 className="feature-title">Perhitungan Nilai Sisa</h3>
              <p className="feature-tagline">Evaluasi Aset yang Akurat dan Terpercaya</p>
              <p className="feature-description">
                Layanan evaluasi teknis komprehensif untuk menentukan nilai ekonomis bangunan yang akan dibongkar 
                dengan metodologi standar nasional. Tim ahli bersertifikat menggunakan teknologi modern untuk 
                analisis yang objektif dan akurat.
              </p>
              <Link to="/app/services/perhitungan-nilai-sisa" className="feature-link">
                Ajukan Layanan →
              </Link>
            </div>

            <div className="feature-card service-financing">
              <div className="feature-icon"><i className="fas fa-search-plus"></i></div>
              <h3 className="feature-title">Asesmen Bangunan</h3>
              <p className="feature-tagline">Inspeksi Menyeluruh untuk Keamanan Optimal</p>
              <p className="feature-description">
                Inspeksi dan evaluasi kondisi bangunan dengan standar keamanan tinggi, analisis struktural mendalam, 
                dan rekomendasi tindakan korektif yang tepat untuk memastikan keamanan pengguna dan keberlanjutan fungsi bangunan.
              </p>
              <Link to="/app/services/asesmen-bangunan" className="feature-link">
                Ajukan Layanan →
              </Link>
            </div>

            <div className="feature-card service-technical">
              <div className="feature-icon"><i className="fas fa-file-invoice-dollar"></i></div>
              <h3 className="feature-title">Usulan Pembiayaan</h3>
              <p className="feature-tagline">Perencanaan Anggaran yang Tepat dan Efisien</p>
              <p className="feature-description">
                Dukungan penyusunan proposal pembiayaan dengan analisis biaya komprehensif, estimasi yang akurat, 
                dan perencanaan teknis sesuai standar pengadaan pemerintah dan regulasi keuangan negara.
              </p>
              <Link to="/app/services/usulan-pembiayaan" className="feature-link">
                Ajukan Layanan →
              </Link>
            </div>

            <div className="feature-card service-research">
              <div className="feature-icon"><i className="fas fa-users-cog"></i></div>
              <h3 className="feature-title">Tim Teknis Profesional</h3>
              <p className="feature-tagline">Keahlian Profesional di Setiap Tahap Proyek</p>
              <p className="feature-description">
                Penyediaan tenaga ahli berpengalaman dan tersertifikasi untuk supervisi dan bimbingan teknis berkualitas tinggi. 
                Tim dengan keahlian spesifik sesuai kebutuhan proyek konstruksi dan infrastruktur.
              </p>
              <Link to="/app/services/tim-teknis" className="feature-link">
                Ajukan Layanan →
              </Link>
            </div>

            <div className="feature-card service-management">
              <div className="feature-icon"><i className="fas fa-file-contract"></i></div>
              <h3 className="feature-title">Peneliti Kontrak</h3>
              <p className="feature-tagline">Analisis Kontrak yang Cermat dan Objektif</p>
              <p className="feature-description">
                Layanan riset dan analisis kontrak konstruksi untuk mendukung proses amendemen dan modifikasi. 
                Memberikan rekomendasi berbasis analisis teknis dan regulasi untuk memastikan pelaksanaan kontrak yang optimal.
              </p>
              <Link to="/app/services/peneliti-kontrak" className="feature-link">
                Ajukan Layanan →
              </Link>
            </div>

            <div className="feature-card service-assessment">
              <div className="feature-icon"><i className="fas fa-handshake"></i></div>
              <h3 className="feature-title">Serah Terima Pekerjaan</h3>
              <p className="feature-tagline">Proses yang Profesional dan Akuntabel</p>
              <p className="feature-description">
                Pendampingan komprehensif dalam proses serah terima hasil pekerjaan konstruksi. Memastikan semua aspek teknis, 
                administratif, dan kualitas hasil kerja sesuai spesifikasi kontrak melalui verifikasi menyeluruh.
              </p>
              <Link to="/app/services/serah-terima" className="feature-link">
                Ajukan Layanan →
              </Link>
            </div>

            <div className="feature-card service-financing">
              <div className="feature-icon"><i className="fas fa-cogs"></i></div>
              <h3 className="feature-title">Pengelola Teknis</h3>
              <p className="feature-tagline">Manajemen Teknis Terintegrasi dan Efektif</p>
              <p className="feature-description">
                Layanan pengelolaan teknis komprehensif untuk mendukung administrasi dan koordinasi proyek konstruksi. 
                Meliputi pengelolaan dokumen, koordinasi stakeholder, dan pemantauan progres dengan pendekatan manajemen modern.
              </p>
              <Link to="/app/services/pengelola-teknis" className="feature-link">
                Ajukan Layanan →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        {/* Construction Background Pattern */}
        <div className="construction-bg">
          <div className="blueprint-grid"></div>
          <div className="floating-elements">
            <div className="floating-element ai-chip"><i className="fas fa-robot"></i></div>
            <div className="floating-element construction-icon"><i className="fas fa-building"></i></div>
            <div className="floating-element tech-icon"><i className="fas fa-bolt"></i></div>
            <div className="floating-element blueprint-icon"><i className="fas fa-drafting-compass"></i></div>
          </div>
        </div>
        
        <div className="container">
          <div className="about-content">
            <div className="about-header">
              <div className="section-badge construction-badge">
                <i className="fas fa-hard-hat"></i>
                <span>Tentang Platform</span>
              </div>
              <h2 className="about-title">
                <span className="title-main">E-Bantek</span>
                <span className="title-accent">Digital Construction</span>
              </h2>
              <h3 className="about-subtitle">
                Membangun Masa Depan dengan 
                <span className="highlight-text"> Teknologi AI</span> & 
                <span className="highlight-text">Konstruksi Cerdas</span>
              </h3>
            </div>

            <div className="about-main-content">
              <div className="about-content-wrapper">
                <div className="about-text-section">
                  <p className="about-description">
                    Dinas Cipta Karya dan Sumber Daya Air Provinsi Sulawesi Tengah menghadirkan revolusi digital 
                    dalam layanan bantuan teknis konstruksi melalui platform E-Bantek. Mengintegrasikan 
                    <strong> kecerdasan buatan (AI)</strong>, <strong>Internet of Things (IoT)</strong>, dan 
                    <strong>teknologi konstruksi 4.0</strong> untuk memberikan layanan yang lebih akurat, efisien, dan berkelanjutan.
                  </p>
                  
                  <div className="tech-stats">
                    <div className="tech-stat">
                      <div className="stat-icon"><i className="fas fa-microscope"></i></div>
                      <div className="stat-content">
                        <div className="stat-number">95%</div>
                        <div className="stat-label">AI Accuracy</div>
                      </div>
                    </div>
                    <div className="tech-stat">
                      <div className="stat-icon"><i className="fas fa-eye"></i></div>
                      <div className="stat-content">
                        <div className="stat-number">24/7</div>
                        <div className="stat-label">Smart Monitoring</div>
                      </div>
                    </div>
                    <div className="tech-stat">
                      <div className="stat-icon"><i className="fas fa-wifi"></i></div>
                      <div className="stat-content">
                        <div className="stat-number">IoT</div>
                        <div className="stat-label">Connected Systems</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="about-visual-section">
                  <div className="about-images-grid">
                    <div className="about-image-card primary-image">
                      <img 
                        src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                        alt="Construction Engineer with AI Technology"
                        className="about-img"
                        loading="lazy"
                      />
                      <div className="image-badge">
                        <i className="fas fa-cogs"></i>
                        <span>Smart Engineering</span>
                      </div>
                    </div>
                    
                    <div className="about-image-card secondary-image">
                      <img 
                        src="https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                        alt="Digital Blueprint Technology"
                        className="about-img"
                        loading="lazy"
                      />
                      <div className="image-badge">
                        <i className="fas fa-drafting-compass"></i>
                        <span>Digital Blueprint</span>
                      </div>
                    </div>
                    
                    <div className="about-image-card tertiary-image">
                      <img 
                        src="https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                        alt="Future Construction Technology"
                        className="about-img"
                        loading="lazy"
                      />
                      <div className="image-badge">
                        <i className="fas fa-rocket"></i>
                        <span>Future Tech</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="about-features-section">
                <div className="features-grid-modern">
                  <div className="feature-card-modern ai-feature">
                    <div className="feature-icon-modern">
                      <i className="fas fa-brain"></i>
                    </div>
                    <h4 className="feature-title-modern">AI-Powered Analytics</h4>
                    <p className="feature-desc-modern">Machine learning untuk analisis prediktif dan optimasi konstruksi</p>
                  </div>

                  <div className="feature-card-modern construction-feature">
                    <div className="feature-icon-modern">
                      <i className="fas fa-hard-hat"></i>
                    </div>
                    <h4 className="feature-title-modern">Smart Construction</h4>
                    <p className="feature-desc-modern">Teknologi konstruksi modern dengan standar internasional</p>
                  </div>

                  <div className="feature-card-modern iot-feature">
                    <div className="feature-icon-modern">
                      <i className="fas fa-network-wired"></i>
                    </div>
                    <h4 className="feature-title-modern">IoT Integration</h4>
                    <p className="feature-desc-modern">Monitoring real-time dengan sensor dan dashboard cerdas</p>
                  </div>

                  <div className="feature-card-modern blockchain-feature">
                    <div className="feature-icon-modern">
                      <i className="fas fa-shield-alt"></i>
                    </div>
                    <h4 className="feature-title-modern">Blockchain Security</h4>
                    <p className="feature-desc-modern">Keamanan data tinggi dengan teknologi blockchain</p>
                  </div>

                  <div className="feature-card-modern sustainability-feature">
                    <div className="feature-icon-modern">
                      <i className="fas fa-leaf"></i>
                    </div>
                    <h4 className="feature-title-modern">Green Technology</h4>
                    <p className="feature-desc-modern">Konstruksi berkelanjutan dengan teknologi ramah lingkungan</p>
                  </div>

                  <div className="feature-card-modern future-feature">
                    <div className="feature-icon-modern">
                      <i className="fas fa-rocket"></i>
                    </div>
                    <h4 className="feature-title-modern">Future Ready</h4>
                    <p className="feature-desc-modern">Platform siap mengadopsi teknologi masa depan</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-cta">
              <div className="cta-content-about">
                <h4 className="cta-title-about">Bergabung dengan Era Konstruksi Digital</h4>
                <p className="cta-desc-about">Rasakan pengalaman bantuan teknis dengan teknologi terdepan</p>
                <div className="cta-buttons-about">
                  <Link to="/app/login" className="btn btn-primary btn-futuristic">
                    <i className="fas fa-sign-in-alt"></i>
                    <span>Ready to Login</span>
                  </Link>
                  <Link to="#future-features" className="btn btn-secondary btn-construction">
                    <i className="fas fa-microscope"></i>
                    <span>Pelajari Teknologi AI</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Features Section */}
      <section id="future-features" className="future-features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Fitur Masa Depan</h2>
            <p className="section-subtitle">
              Inovasi teknologi untuk pengalaman yang lebih baik
            </p>
          </div>

          <div className="future-grid">
            <div className="future-card">
              <div className="future-icon"><i className="fas fa-map-marked-alt"></i></div>
              <h3 className="future-title">GIS Mapping</h3>
              <p className="future-description">Peta interaktif dengan visualisasi data geografis</p>
              <span className="future-badge">Coming Soon</span>
            </div>

            <div className="future-card">
              <div className="future-icon"><i className="fas fa-robot"></i></div>
              <h3 className="future-title">AI Assistant</h3>
              <p className="future-description">Chatbot AI untuk bantuan dan panduan otomatis</p>
              <span className="future-badge">Beta</span>
            </div>

            <div className="future-card">
              <div className="future-icon"><i className="fas fa-chart-bar"></i></div>
              <h3 className="future-title">Auto Reports</h3>
              <p className="future-description">Generate laporan PDF/Excel secara otomatis</p>
              <span className="future-badge">Coming Soon</span>
            </div>

            <div className="future-card">
              <div className="future-icon"><i className="fas fa-globe-americas"></i></div>
              <h3 className="future-title">Transparency Portal</h3>
              <p className="future-description">Portal publik untuk transparansi proyek</p>
              <span className="future-badge">Coming Soon</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Siap untuk Memulai?</h2>
            <p className="cta-subtitle">
              Bergabunglah dengan ribuan pengguna yang telah merasakan efisiensi platform e-Bantek
            </p>
            <div className="cta-actions">
              <Link to="/app/login" className="btn btn-primary btn-lg">
                Ready to Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="landing-footer">
        <div className="footer-pattern"></div>
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand-section">
              <div className="footer-brand">
                <div className="footer-logo">
                  <i className="fas fa-hard-hat"></i>
                  <span className="footer-brand-text">
                    <span className="footer-brand-main">E-Bantek</span>
                    <span className="footer-brand-sub">Digital Construction Platform</span>
                  </span>
                </div>
                <p className="footer-description">
                  Platform digital terdepan untuk layanan bantuan teknis konstruksi dengan teknologi AI, 
                  IoT, dan sistem terintegrasi untuk mendukung pembangunan infrastruktur Sulawesi Tengah.
                </p>
                <div className="footer-certifications">
                  <div className="certification-badge">
                    <i className="fas fa-certificate"></i>
                    <span>ISO 9001:2015</span>
                  </div>
                  <div className="certification-badge">
                    <i className="fas fa-shield-check"></i>
                    <span>Tersertifikat Pemerintah</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="footer-links-grid">
              <div className="footer-section">
                <h4 className="footer-title">
                  <i className="fas fa-cogs"></i>
                  Layanan
                </h4>
                <ul className="footer-list">
                  <li><Link to="#features">Perhitungan Nilai Sisa</Link></li>
                  <li><Link to="#features">Asesmen Bangunan</Link></li>
                  <li><Link to="#features">Usulan Pembiayaan</Link></li>
                  <li><Link to="#features">Tim Teknis Profesional</Link></li>
                </ul>
              </div>

              <div className="footer-section">
                <h4 className="footer-title">
                  <i className="fas fa-info-circle"></i>
                  Platform
                </h4>
                <ul className="footer-list">
                  <li><Link to="#about">Tentang E-Bantek</Link></li>
                  <li><Link to="#future-features">Fitur Platform</Link></li>
                  <li><Link to="/app/help">Bantuan</Link></li>
                  <li><Link to="/app/login">Login</Link></li>
                </ul>
              </div>

              <div className="footer-section">
                <h4 className="footer-title">
                  <i className="fas fa-map-marker-alt"></i>
                  Kontak
                </h4>
                <div className="contact-details">
                  <div className="contact-item">
                    <i className="fas fa-building"></i>
                    <div>
                      <strong>Alamat</strong>
                      <p>Jl. Prof. Dr. Moh. Yamin No. 33, Palu</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-phone"></i>
                    <div>
                      <strong>Telepon</strong>
                      <p>(0451) 4015509</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-envelope"></i>
                    <div>
                      <strong>Email</strong>
                      <p>cikasda@sultengprov.go.id</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <div className="footer-social">
                <h5>Ikuti Kami</h5>
                <div className="social-links">
                  <a href="#" className="social-link facebook">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="social-link instagram">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="social-link youtube">
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a href="#" className="social-link linkedin">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
              
              <div className="footer-legal">
                <div className="footer-copyright">
                  <p>&copy; 2025 E-Bantek Provinsi Sulawesi Tengah</p>
                  <p>Dinas Cipta Karya dan Sumber Daya Air</p>
                </div>
                <div className="footer-legal-links">
                  <Link to="/privacy">Kebijakan Privasi</Link>
                  <span>|</span>
                  <Link to="/terms">Syarat & Ketentuan</Link>
                  <span>|</span>
                  <Link to="/security">Keamanan</Link>
                </div>
              </div>

              <div className="footer-login-cta">
                <Link to="/app/login" className="footer-cta-button">
                  <i className="fas fa-sign-in-alt"></i>
                  <span>Ready to Login</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;