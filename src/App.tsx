import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layout/Layout';

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen bg-[#050505] flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
  </div>
);

// Lazy-loaded Pages
const Home = lazy(() => import('./pages/Home'));
const Venues = lazy(() => import('./pages/Venues'));
const VenueDetails = lazy(() => import('./pages/VenueDetails'));
const Events = lazy(() => import('./pages/Events'));
const SignatureEvents = lazy(() => import('./pages/SignatureEvents'));
const BirthdayMankameshwar = lazy(() => import('./pages/BirthdayMankameshwar'));
const PoolVatika = lazy(() => import('./pages/PoolVatika'));
const Catering = lazy(() => import('./pages/Catering'));
const Blogs = lazy(() => import('./pages/Blogs'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

// Admin Pages
const Login = lazy(() => import('./pages/admin/Login'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminBookings = lazy(() => import('./pages/admin/Bookings'));
const AdminVenues = lazy(() => import('./pages/admin/Venues'));
const AdminEvents = lazy(() => import('./pages/admin/Events'));
const AdminCatering = lazy(() => import('./pages/admin/Catering'));
const AdminBlogs = lazy(() => import('./pages/admin/Blogs'));
const AdminReviews = lazy(() => import('./pages/admin/Reviews'));
const AdminSettings = lazy(() => import('./pages/admin/Settings'));
const AdminSignatureEvents = lazy(() => import('./pages/admin/SignatureEvents'));
const AdminGallery = lazy(() => import('./pages/admin/Gallery'));
const AdminVideos = lazy(() => import('./pages/admin/Videos'));
const AdminCalendar = lazy(() => import('./pages/admin/Calendar'));
const AdminCustomers = lazy(() => import('./pages/admin/Customers'));
const AdminFaqs = lazy(() => import('./pages/admin/Faqs'));
const AdminPageMedia = lazy(() => import('./pages/admin/PageMedia'));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="venues" element={<Venues />} />
              <Route path="venues/:id" element={<VenueDetails />} />
              <Route path="events" element={<Events />} />
              <Route path="signature-events" element={<SignatureEvents />} />
              <Route path="signature-events/birthday-mankameshwar" element={<BirthdayMankameshwar />} />
              <Route path="signature-events/pool-vatika" element={<PoolVatika />} />
              <Route path="catering" element={<Catering />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            {/* Public Admin Login Route */}
            <Route path="/admin/login" element={<Login />} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="venues" element={<AdminVenues />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="catering" element={<AdminCatering />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="reviews" element={<AdminReviews />} />
              <Route path="settings" element={<AdminSettings />} />
              
              <Route path="signature-events" element={<AdminSignatureEvents />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="videos" element={<AdminVideos />} />
              <Route path="calendar" element={<AdminCalendar />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="faqs" element={<AdminFaqs />} />
              <Route path="page-media" element={<AdminPageMedia />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;