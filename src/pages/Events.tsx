import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, Sparkles } from 'lucide-react';

export default function Events() {
  const [events, setEvents] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/events').then(r => r.json()),
      fetch('/api/event-categories').then(r => r.json())
    ]).then(([eventsData, categoriesData]) => {
      setEvents(eventsData || []);
      const dbCats = (categoriesData || []).map((c: any) => c.name);
      setCategories(['All', ...dbCats]);
      setLoading(false);
    });
  }, []);

  const filteredEvents = activeCategory === 'All' ? events : events.filter(e => e.type === activeCategory);

  return (
    <div className="pt-28 pb-24 min-h-screen relative overflow-hidden bg-[#F9F6F0]">
      {/* Background ambient lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#800000]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-[#800000]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#800000]/10 border border-[#800000]/20 text-[#800000] mb-6">
            <Sparkles size={16} />
            <span className="text-sm font-semibold tracking-widest uppercase">Exquisite Experiences</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6 tracking-tight">
            Theme & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#800000] to-[#9B111E]">Events</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
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
              onClick={() => setActiveCategory(cat)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                activeCategory === cat 
                  ? 'text-white shadow-[0_0_20px_rgba(212,175,55,0.4)]' 
                  : 'text-gray-600 hover:text-gray-900 bg-black/5 hover:bg-black/5'
              }`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeCategoryIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-[#800000] to-[#9B111E] rounded-full"
                  style={{ zIndex: -1 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-[#800000]/30 border-t-[#800000] rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event, idx) => (
                <motion.div
                  layout
                  key={event.id}
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="break-inside-avoid relative rounded-2xl overflow-hidden bg-[#FFFFFF] border border-black/5 group cursor-pointer"
                >
                  <img 
                    src={event.image_url} 
                    alt={event.title || 'Event Media'} 
                    loading="lazy"
                    className="w-full h-auto object-cover" 
                  />
                  
                  {event.video_url && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-black/10 group-hover:bg-[#800000] group-hover:border-[#800000] transition-all duration-300 transform group-hover:scale-110 shadow-xl">
                        <PlayCircle size={32} className="text-gray-900 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  )}
                  
                  {(event.title || event.type) && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent">
                      <div className="flex flex-col items-start gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="bg-[#800000]/90 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                          {event.type}
                        </div>
                        {event.title && (
                          <h3 className="text-xl font-serif font-bold text-gray-900 drop-shadow-md">
                            {event.title}
                          </h3>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
