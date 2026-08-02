import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { 
  LayoutDashboard, CalendarCheck, MapPin, PartyPopper, 
  Sparkles, UtensilsCrossed, FileText, Image as ImageIcon, 
  Video, Calendar, Star, Users, HelpCircle, Settings, LogOut, Menu, X
} from 'lucide-react';

const sidebarLinks = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Bookings', path: '/admin/bookings', icon: CalendarCheck },
  { name: 'Venues', path: '/admin/venues', icon: MapPin },
  { name: 'Events', path: '/admin/events', icon: PartyPopper },
  { name: 'Signature Events', path: '/admin/signature-events', icon: Sparkles },
  { name: 'Malhotra Catering', path: '/admin/catering', icon: UtensilsCrossed },
  { name: 'Blogs', path: '/admin/blogs', icon: FileText },
  { name: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
  { name: 'Videos', path: '/admin/videos', icon: Video },
  { name: 'Booking Calendar', path: '/admin/calendar', icon: Calendar },
  { name: 'Reviews', path: '/admin/reviews', icon: Star },
  { name: 'Customers', path: '/admin/customers', icon: Users },
  { name: 'FAQs', path: '/admin/faqs', icon: HelpCircle },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];

export default function AdminLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-[#F9F6F0] text-gray-600 font-sans">
      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-64 bg-[#FFFFFF] border-r border-black/5 flex flex-col z-50 transform transition-transform duration-300 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-black/5 flex justify-between items-center">
          <Link to="/admin" className="text-xl font-serif font-bold text-gray-900 tracking-wider flex items-center gap-2">
            <span className="text-[#800000]">M</span>ALHOTRA <span className="text-xs text-[#800000] ml-2">CMS</span>
          </Link>
          <button className="lg:hidden text-gray-600 hover:text-gray-900" onClick={() => setIsMobileOpen(false)}>
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {sidebarLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path !== '/admin' && location.pathname.startsWith(link.path));
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm ${
                    isActive 
                      ? 'bg-[#800000]/10 text-[#800000] font-semibold' 
                      : 'text-gray-600 hover:bg-black/5 hover:text-gray-900'
                  }`}
                >
                  <link.icon size={18} className={isActive ? 'text-[#800000]' : 'text-gray-600'} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-black/5">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full text-left text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-[#FFFFFF] border-b border-black/5 flex items-center justify-between px-4 lg:px-8 shrink-0">
          <button className="lg:hidden text-gray-600 hover:text-gray-900" onClick={() => setIsMobileOpen(true)}>
            <Menu size={24} />
          </button>
          
          <div className="flex-1 flex justify-end items-center gap-4">
            <a href="/" target="_blank" className="text-sm text-[#800000] hover:underline">View Live Site</a>
            <div className="w-8 h-8 rounded-full bg-[#800000] text-white flex items-center justify-center font-bold text-sm">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
