import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Users, Star, ArrowRight, Sparkles } from 'lucide-react';

export default function Venues() {
  const [venues, setVenues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/venues')
      .then(res => res.json())
      .then(data => {
        setVenues(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-24 pb-20 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 py-20 border-b border-slate-200 bg-gradient-to-b from-transparent to-[#FAFAFA]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-[#D4AF37] mb-6 backdrop-blur-md">
              <Sparkles size={16} />
              <span className="text-sm font-semibold tracking-widest uppercase">Luxury Locations</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-6 tracking-tight">Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">Venues</span></h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
              Explore our curated collection of extraordinary spaces, perfect for your timeless celebrations.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {venues.map((venue, idx) => (
              <motion.div 
                key={venue.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="bg-[#FFFFFF] border border-slate-200 rounded-2xl group cursor-pointer overflow-hidden flex flex-col hover:border-[#D4AF37]/40 transition-colors shadow-2xl relative"
              >
                <div className="relative h-80 overflow-hidden">
                  <img src={venue.image_url} alt={venue.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] via-transparent to-transparent opacity-90" />
                  <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md px-4 py-2 flex items-center gap-1.5 text-[#D4AF37] text-sm font-bold rounded-full border border-[#D4AF37]/30">
                    <Star size={14} className="fill-current" /> {venue.rating}
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col relative z-10 -mt-16">
                  <h3 className="text-3xl font-serif font-bold text-slate-900 mb-3 drop-shadow-md">{venue.name}</h3>
                  <div className="flex items-center gap-2 text-[#D4AF37] text-sm mb-4 font-medium">
                    <MapPin size={16} /> {venue.location}
                  </div>
                  <p className="text-slate-600 text-sm mb-8 line-clamp-3 leading-relaxed font-light">{venue.description}</p>
                  
                  <div className="flex justify-between items-center text-sm text-slate-600 mb-8 border-t border-b border-slate-200 py-5 mt-auto">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-slate-600" /> Up to {venue.capacity}
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-600 uppercase tracking-widest">Starts at</div>
                      <div className="text-[#D4AF37] font-bold text-lg">₹{venue.price_per_day}</div>
                    </div>
                  </div>
                  <Link to={`/venues/${venue.id}`} className="w-full py-4 bg-slate-50 border border-[#D4AF37]/30 text-slate-900 flex items-center justify-center gap-2 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#F3E5AB] hover:text-white hover:border-transparent transition-all duration-300 font-bold uppercase tracking-widest text-sm rounded-xl">
                    Explore Venue <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
