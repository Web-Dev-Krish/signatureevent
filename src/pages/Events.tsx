import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, PlayCircle, Sparkles } from 'lucide-react';
import { formatDate } from '../lib/date';

export default function Events() {
  const [events, setEvents] = useState<any[]>([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Wedding', 'Reception', 'Birthday', 'Corporate', 'Anniversary'];

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      });
  }, []);

  const filteredEvents = category === 'All' ? events : events.filter(e => e.type === category);

  return (
    <div className="pt-28 pb-24 min-h-screen relative overflow-hidden bg-[#050505]">
      {/* Background ambient lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] mb-6">
            <Sparkles size={16} />
            <span className="text-sm font-semibold tracking-widest uppercase">Exquisite Experiences</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight">
            Theme & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">Events</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Discover a curated collection of our most breathtaking celebrations, where every detail is a masterpiece of design and execution.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                category === cat 
                  ? 'text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]' 
                  : 'text-gray-400 hover:text-white bg-white/5 hover:bg-white/10'
              }`}
            >
              {category === cat && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] rounded-full"
                  style={{ zIndex: -1 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event, idx) => (
                <motion.div
                  layout
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]"
                >
                  <div className="relative h-80 overflow-hidden">
                    <img 
                      src={event.image_url} 
                      alt={event.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {event.video_url && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-all duration-300 transform group-hover:scale-110 cursor-pointer shadow-xl">
                          <PlayCircle size={32} className="text-white group-hover:text-black transition-colors" />
                        </div>
                      </div>
                    )}
                    
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-[#D4AF37] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-[#D4AF37]/30">
                      {event.type}
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <h3 className="text-2xl font-serif font-bold text-white mb-2 drop-shadow-lg">{event.title}</h3>
                    
                    <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <div className="flex items-center gap-4 text-sm text-gray-300">
                        <div className="flex items-center gap-1.5"><Calendar size={14} className="text-[#D4AF37]" /> {formatDate(event.date)}</div>
                        <div className="flex items-center gap-1.5"><MapPin size={14} className="text-[#D4AF37]" /> {event.venue_name || 'Premium Venue'}</div>
                      </div>
                      
                      <p className="text-gray-400 text-sm line-clamp-2 mt-2">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
