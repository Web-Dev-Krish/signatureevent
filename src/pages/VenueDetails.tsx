import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Users, Star, CheckCircle, Image as ImageIcon, Video, ChevronLeft, ChevronRight, Phone, MessageCircle } from 'lucide-react';
import { ymdToDateString } from '../lib/date';
import { motion } from 'framer-motion';

export default function VenueDetails() {
  const { id } = useParams();
  const [venue, setVenue] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [unavailableDates, setUnavailableDates] = useState<any[]>([]);
  const [venueMedia, setVenueMedia] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/venues?id=${id}`)
      .then(res => res.json())
      .then(data => {
        setVenue(data);
        setLoading(false);
      });
    
    fetch(`/api/venue-media?venue_id=${id}`)
      .then(res => res.json())
      .then(data => setVenueMedia(data || []));
    
    fetch(`/api/venue-availability?venue_id=${id}`)
      .then(res => res.json())
      .then(data => setUnavailableDates(data || []));
  }, [id]);

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const isDateUnavailable = (date: Date) => {
    const dateStr = ymdToDateString(date.getFullYear(), date.getMonth(), date.getDate());
    return unavailableDates.some((d: any) => (d.date || '').slice(0, 10) === dateStr);
  };

  const renderCalendar = () => {
    const days = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 border border-white/5 opacity-30 bg-[#151515]"></div>);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), d);
      const unavailable = isDateUnavailable(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const isPast = date < today;
      
      days.push(
        <div key={`day-${d}`} className={`min-h-[60px] p-2 border border-white/5 ${
          unavailable ? 'bg-red-900/20' : isPast ? 'bg-[#151515] opacity-30' : 'bg-[#151515] hover:bg-white/5'
        } transition-colors cursor-pointer`}>
          <div className={`font-bold text-sm ${unavailable ? 'text-red-400' : isPast ? 'text-gray-600' : 'text-gray-300'}`}>{d}</div>
          {unavailable && <div className="text-xs text-red-400 mt-1">Unavailable</div>}
        </div>
      );
    }

    return days;
  };

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
    </div>
  );
  
  if (!venue) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white text-xl">Venue not found</div>;

  return (
    <div className="bg-[#050505] min-h-screen">
      {/* Hero */}
      <div className="relative h-[60vh] md:h-[85vh] overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          src={venue.image_url} 
          alt={venue.name} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-16 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 text-[#D4AF37] mb-6 bg-black/40 backdrop-blur-md w-fit px-4 py-2 rounded-full border border-white/10">
              <Star className="fill-current" size={18} />
              <span className="text-sm font-bold tracking-widest">{venue.rating} / 5</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg">{venue.name}</h1>
            <div className="flex flex-wrap gap-8 text-gray-300 text-lg font-light">
              <div className="flex items-center gap-3"><MapPin className="text-[#D4AF37]" size={20} /> {venue.location}</div>
              <div className="flex items-center gap-3"><Users className="text-[#D4AF37]" size={20} /> Up to {venue.capacity} Guests</div>
              <div className="flex items-center gap-3">
                <span className="text-[#D4AF37] font-serif font-bold text-xl">₹</span> 
                From {venue.price_per_day}/day
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-20">
            <section>
              <h2 className="text-4xl font-serif font-bold text-white mb-8 border-b border-white/10 pb-4">Overview</h2>
              <p className="text-gray-300 leading-relaxed text-lg font-light whitespace-pre-line">{venue.description}</p>
            </section>

            <section>
              <h2 className="text-4xl font-serif font-bold text-white mb-8 border-b border-white/10 pb-4">Facilities & Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {venue.facilities?.map((fac: any, i: number) => (
                  <div key={i} className="flex items-center gap-4 text-gray-300 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-[#D4AF37]/30 transition-colors">
                    <CheckCircle size={20} className="text-[#D4AF37] shrink-0" /> 
                    <span className="font-light">{fac}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-4xl font-serif font-bold text-white mb-8 border-b border-white/10 pb-4">Available Events</h2>
              <div className="flex flex-wrap gap-4">
                {venue.event_types?.map((type: any, i: number) => (
                  <span key={i} className="px-6 py-3 bg-[#111] border border-white/10 text-gray-300 rounded-full text-sm uppercase tracking-wider font-semibold hover:border-[#D4AF37]/50 transition-colors cursor-default">
                    {type}
                  </span>
                ))}
              </div>
            </section>

            {/* Gallery */}
            <section>
              <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-4 border-b border-white/10 pb-4">
                <h2 className="text-4xl font-serif font-bold text-white">Gallery</h2>
                <div className="flex gap-4 text-gray-400">
                  <button className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors"><ImageIcon size={20}/> <span className="uppercase tracking-widest text-sm font-bold">Photos</span></button>
                  <button className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors"><Video size={20}/> <span className="uppercase tracking-widest text-sm font-bold">Videos</span></button>
                </div>
              </div>
              {venueMedia.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {venueMedia.map((media) => (
                    <div key={media.id} className="rounded-2xl overflow-hidden group relative">
                      {media.media_type === 'image' ? (
                        <img src={media.media_url} alt={media.caption || 'Gallery'} loading="lazy" className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <video src={media.media_url} controls className="w-full h-64 object-cover" poster={media.thumbnail_url} />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {media.caption && (
                        <p className="absolute bottom-4 left-4 right-4 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                          {media.caption}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-2xl overflow-hidden">
                    <img src={venue.image_url} className="w-full h-64 object-cover" alt="Gallery 1" />
                  </div>
                  <div className="bg-[#111] flex items-center justify-center h-64 rounded-2xl border border-white/5">
                    <span className="text-gray-500 uppercase tracking-widest text-sm">More images coming soon</span>
                  </div>
                </div>
              )}
            </section>

            {/* Availability Calendar */}
            <section>
              <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-4 border-b border-white/10 pb-4">
                <h2 className="text-4xl font-serif font-bold text-white">Availability Calendar</h2>
                <div className="flex items-center gap-6 bg-[#111] rounded-full px-6 py-2 border border-white/10">
                  <button onClick={prevMonth} className="p-2 hover:text-[#D4AF37] transition-colors text-gray-400"><ChevronLeft size={20} /></button>
                  <span className="text-white font-bold min-w-[140px] text-center uppercase tracking-widest text-sm">
                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </span>
                  <button onClick={nextMonth} className="p-2 hover:text-[#D4AF37] transition-colors text-gray-400"><ChevronRight size={20} /></button>
                </div>
              </div>
              <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="grid grid-cols-7 bg-[#0A0A0A] border-b border-white/10">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-4 text-center text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7">
                  {renderCalendar()}
                </div>
              </div>
              <div className="flex flex-wrap gap-6 mt-6 text-sm uppercase tracking-widest font-bold">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-red-900/40 border border-red-500/30 rounded"></div>
                  <span className="text-gray-500">Unavailable</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-[#151515] opacity-30 rounded"></div>
                  <span className="text-gray-500">Past dates</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-[#111] rounded border border-white/10"></div>
                  <span className="text-[#D4AF37]">Available</span>
                </div>
              </div>
            </section>

            {/* Map */}
            <section>
              <h2 className="text-4xl font-serif font-bold text-white mb-8 border-b border-white/10 pb-4">Location</h2>
              {venue.map_html ? (
                <div className="map-embed rounded-2xl border border-white/10 overflow-hidden shadow-2xl" dangerouslySetInnerHTML={{ __html: venue.map_html }} />
              ) : (
                <div className="map-embed bg-[#111] border border-white/10 flex items-center justify-center text-gray-500 rounded-2xl shadow-2xl">
                  <div className="text-center px-4">
                    <MapPin size={40} className="mx-auto mb-4 text-[#D4AF37] opacity-50" />
                    <p className="uppercase tracking-widest font-bold text-sm mb-2">Map coming soon</p>
                    <p className="text-gray-400 font-light">{venue.location}</p>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar / Quick Info */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-b from-[#111] to-[#0A0A0A] border border-white/10 rounded-2xl p-8 sticky top-28 shadow-2xl">
              <h3 className="text-3xl font-serif font-bold text-white mb-8 border-b border-white/10 pb-6">Interested in this venue?</h3>

              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
                  <span className="text-gray-400 text-sm flex items-center gap-3 uppercase tracking-widest font-bold">
                    <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center border border-white/10"><Users size={14} className="text-[#D4AF37]" /></div>
                    Capacity
                  </span>
                  <span className="text-white font-semibold">Up to {venue.capacity}</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
                  <span className="text-gray-400 text-sm flex items-center gap-3 uppercase tracking-widest font-bold">
                    <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center border border-white/10"><span className="text-[#D4AF37] font-serif">₹</span></div>
                    Starting Price
                  </span>
                  <span className="text-[#D4AF37] font-bold text-lg">₹{venue.price_per_day}/day</span>
                </div>
              </div>

              <p className="text-gray-400 text-sm mb-8 leading-relaxed font-light">
                Our expert team will help you plan every detail to perfection. Reach out and we'll get back to you shortly.
              </p>

              <Link
                to="/contact"
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-bold py-5 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-2 rounded-xl mb-4"
              >
                Contact Us
              </Link>
              <a
                href="tel:+919354710637"
                className="w-full bg-white/5 border border-white/10 text-white py-4 hover:border-[#D4AF37] hover:bg-white/10 transition-colors uppercase tracking-widest text-sm flex items-center justify-center gap-3 rounded-xl mb-4 font-bold"
              >
                <Phone size={16} className="text-[#D4AF37]" /> +91 93547 10637
              </a>
              <a
                href="https://wa.me/919354710637"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white/5 border border-white/10 text-white py-4 hover:border-[#25D366] hover:bg-white/10 transition-colors uppercase tracking-widest text-sm flex items-center justify-center gap-3 rounded-xl font-bold"
              >
                <MessageCircle size={16} className="text-[#25D366]" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
