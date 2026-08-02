import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#F9F6F0] border-t border-black/5 pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
              <span className="text-[#800000]">M</span>ALHOTRA
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Crafting golden moments and timeless celebrations with premium luxury event organizing and catering services.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-gray-600 hover:border-[#800000] hover:text-[#800000] transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-gray-600 hover:border-[#800000] hover:text-[#800000] transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-gray-600 hover:border-[#800000] hover:text-[#800000] transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-gray-600 hover:border-[#800000] hover:text-[#800000] transition-all">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-serif font-semibold text-gray-900 mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="/about" className="text-gray-600 hover:text-[#800000] transition-colors">About Us</Link></li>
              <li><Link to="/events" className="text-gray-600 hover:text-[#800000] transition-colors">Our Events</Link></li>
              <li><Link to="/catering" className="text-gray-600 hover:text-[#800000] transition-colors">Catering Services</Link></li>
              <li><Link to="/venues" className="text-gray-600 hover:text-[#800000] transition-colors">Premium Venues</Link></li>
              <li><Link to="/blogs" className="text-gray-600 hover:text-[#800000] transition-colors">Blogs & News</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif font-semibold text-gray-900 mb-6">Contact Info</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-gray-600">
                <MapPin className="text-[#800000] shrink-0 mt-1" size={18} />
                <span>171 -2, 32 W-2, Damodar Nagar, Kanpur, Uttar Pradesh 208027</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Phone className="text-[#800000] shrink-0" size={18} />
                <span>+91 93547 10637</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Mail className="text-[#800000] shrink-0" size={18} />
                <span>contact@malhotraevents.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif font-semibold text-gray-900 mb-6">Newsletter</h4>
            <p className="text-gray-600 mb-4">Subscribe to receive updates on premium venues and exclusive offers.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-[#FFFFFF] border border-black/5 px-4 py-2 w-full focus:outline-none focus:border-[#800000] text-gray-900"
              />
              <button type="submit" className="bg-[#800000] text-white px-4 py-2 font-semibold hover:bg-[#9B111E] transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-black/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Malhotra Events. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</a>
            <Link to="/admin" className="text-gray-600 hover:text-gray-900 transition-colors">Admin Panel</Link>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
