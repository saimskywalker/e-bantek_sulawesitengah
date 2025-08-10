import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../components/templates/AppLayout';
import { ProtectedRoute, RoleBasedRoute } from '../components/ProtectedRoute';
import RootRedirect from '../components/RootRedirect';
import { USER_ROLES } from '../context/AuthContext';

// Import page components
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import EmailVerification from '../pages/EmailVerification';
import Dashboard from '../pages/Dashboard';
import PemohonDashboard from '../pages/Dashboard/PemohonDashboard';
import NotFound from '../pages/NotFound';

// Import placeholder components
import ServicePlaceholder from '../components/placeholders/ServicePlaceholder';
import FeaturePlaceholder from '../components/placeholders/FeaturePlaceholder';
import ComponentShowcase from '../components/examples/ComponentShowcase';

// Create router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRedirect />,
    errorElement: <NotFound />
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <NotFound />
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <NotFound />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
    errorElement: <NotFound />
  },
  {
    path: '/email-verification',
    element: <EmailVerification />,
    errorElement: <NotFound />
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />
  },
  {
    path: '/dashboard/pemohon',
    element: (
      <RoleBasedRoute allowedRoles={[USER_ROLES.PEMOHON]}>
        <PemohonDashboard />
      </RoleBasedRoute>
    ),
    errorElement: <NotFound />
  },
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: (
          <FeaturePlaceholder 
            featureName="Coming Soon" 
            description="Dashboard sedang dalam pengembangan. Fitur akan segera tersedia dengan sistem autentikasi yang lengkap."
          />
        )
      },
      
      // Core Service Routes
      {
        path: 'services/perhitungan-nilai-sisa',
        element: <ServicePlaceholder serviceName="Perhitungan Nilai Sisa" />
      },
      {
        path: 'services/asesmen-bangunan',
        element: <ServicePlaceholder serviceName="Asesmen Bangunan" />
      },
      {
        path: 'services/usulan-pembiayaan',
        element: <ServicePlaceholder serviceName="Usulan Pembiayaan" />
      },
      {
        path: 'services/tim-teknis',
        element: <ServicePlaceholder serviceName="Tim Teknis" />
      },
      {
        path: 'services/peneliti-kontrak',
        element: <ServicePlaceholder serviceName="Peneliti Kontrak" />
      },
      {
        path: 'services/pendampingan-pho-fho',
        element: <ServicePlaceholder serviceName="Pendampingan PHO/FHO" />
      },
      {
        path: 'services/pengelola-teknis',
        element: <ServicePlaceholder serviceName="Pengelola Teknis" />
      },

      // Future Feature Routes
      {
        path: 'features/gis-mapping',
        element: (
          <FeaturePlaceholder 
            featureName="GIS Mapping" 
            description="Peta interaktif untuk visualisasi data geografis dan lokasi proyek"
          />
        )
      },
      {
        path: 'features/ai-helpdesk',
        element: (
          <FeaturePlaceholder 
            featureName="AI Assistant" 
            description="Asisten AI untuk membantu menjawab pertanyaan dan memberikan panduan"
          />
        )
      },
      {
        path: 'reports',
        element: (
          <FeaturePlaceholder 
            featureName="Reports" 
            description="Sistem laporan otomatis dengan export ke PDF dan Excel"
          />
        )
      },
      {
        path: 'transparency',
        element: (
          <FeaturePlaceholder 
            featureName="Portal Transparansi" 
            description="Portal publik untuk transparansi informasi proyek dan keuangan"
          />
        )
      },

      // User Management Routes (placeholders)
      {
        path: 'profile',
        element: (
          <FeaturePlaceholder 
            featureName="User Profile" 
            description="Pengaturan profil pengguna dan preferensi akun"
          />
        )
      },
      {
        path: 'settings',
        element: (
          <FeaturePlaceholder 
            featureName="Settings" 
            description="Pengaturan aplikasi dan konfigurasi sistem"
          />
        )
      },
      {
        path: 'help',
        element: (
          <FeaturePlaceholder 
            featureName="Help & Support" 
            description="Bantuan pengguna dan dokumentasi sistem"
          />
        )
      },
      
      // Component Library Showcase (for development)
      {
        path: 'components',
        element: <ComponentShowcase />
      }
    ]
  },
  
  // Catch all route for 404
  {
    path: '*',
    element: <NotFound />
  }
]);

export default router;