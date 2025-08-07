import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../organisms/Header';
import Sidebar from '../../organisms/Sidebar';
import './AppLayout.css';

const AppLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Handle responsive sidebar behavior
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;
      if (isMobile) {
        setIsSidebarCollapsed(false);
        setIsMobileSidebarOpen(false);
      }
    };

    // Set initial state
    handleResize();

    // Listen for resize events
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSidebarToggle = () => {
    const isMobile = window.innerWidth < 1024;
    
    if (isMobile) {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  const handleMobileSidebarClose = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="app-layout">
      {/* Header */}
      <Header 
        onSidebarToggle={handleSidebarToggle}
        isMobileSidebarOpen={isMobileSidebarOpen}
      />

      <div className="app-body">
        {/* Sidebar */}
        <div className={`sidebar-container ${isMobileSidebarOpen ? 'mobile-open' : ''}`}>
          <Sidebar 
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={handleSidebarToggle}
            onMobileClose={handleMobileSidebarClose}
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div 
            className="sidebar-overlay"
            onClick={handleMobileSidebarClose}
            aria-hidden="true"
          />
        )}

        {/* Main Content */}
        <main className={`main-content ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <div className="content-wrapper">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Loading Indicator (for future use) */}
      <div id="loading-indicator" className="loading-indicator hidden">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <span>Loading...</span>
        </div>
      </div>

      {/* Toast Container (for future notifications) */}
      <div id="toast-container" className="toast-container" aria-live="polite" aria-atomic="true">
        {/* Toast notifications will be dynamically inserted here */}
      </div>
    </div>
  );
};

export default AppLayout;