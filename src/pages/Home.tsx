import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, MapPin, Users, ArrowRight, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Home() {
  const [venues, setVenues] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/venues?limit=3').then(res => res.json()).then(setVenues);
    fetch('/api/testimonials').then(res => res.json()).then(setTestimonials);
  }, []);

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Luxury Background Image */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://xaaqlitnmzuihgjwaqwt.supabase.co/storage/v1/object/public/media/homehero.jpeg")' }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-black/60 bg-gradient-to-b from-black/80 via-black/40 to-[#FAFAFA]" />
        
        {/* Ambient Lights */}
        <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-[#D4AF37]/10 rounded-full blur-[150px] pointer-events-none z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none z-10" />
        
        <div className="relative z-20 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-slate-50 border border-slate-200 text-[#D4AF37] mb-6 md:mb-8 backdrop-blur-md">
              <Sparkles size={16} />
              <span className="text-xs md:text-sm font-semibold tracking-widest uppercase">The Pinnacle of Luxury</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white mb-4 md:mb-6 leading-tight md:leading-[1.2] max-w-4xl mx-auto tracking-tight px-4 mt-16 md:mt-0">
              Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]">Golden Moments</span> Become Timeless Celebrations
            </h1>
            
            <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-200 mb-8 md:mb-12 max-w-3xl mx-auto font-light tracking-wide leading-relaxed px-4">
              Experience unparalleled luxury and flawless execution for your most cherished events.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-4">
              <Link 
                to="/contact" 
                className="w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-slate-900 font-bold uppercase tracking-widest hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 rounded-sm text-sm sm:text-base"
              >
                Plan Your Event
              </Link>
              <Link 
                to="/venues" 
                className="w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 border border-[#D4AF37]/50 text-slate-900 font-bold uppercase tracking-widest hover:bg-[#D4AF37]/10 transition-all duration-300 backdrop-blur-sm rounded-sm text-sm sm:text-base"
              >
                Explore Venues
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium Venues */}
      <section className="py-20 md:py-32 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-6xl font-serif font-bold text-slate-900 mb-4 md:mb-6">Premium <span className="text-[#D4AF37]">Venues</span></h2>
            <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto font-light">Discover our exclusive selection of luxury venues designed to host your grandest celebrations.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {venues.map((venue, idx) => (
              <motion.div 
                key={venue.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.8 }}
                className="bg-[#FFFFFF] border border-slate-200 rounded-xl group cursor-pointer overflow-hidden flex flex-col hover:border-[#D4AF37]/30 transition-colors shadow-2xl"
              >
                <div className="relative h-64 md:h-72 overflow-hidden">
                  <img src={venue.image_url} alt={venue.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] to-transparent opacity-80" />
                  <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md px-4 py-2 flex items-center gap-1.5 text-white text-sm font-bold rounded-full border border-[#D4AF37]/30">
                    <Star size={14} className="fill-current" /> {venue.rating}
                  </div>
                </div>
                <div className="p-6 md:p-8 flex-grow flex flex-col relative z-10 -mt-10">
                  <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3 drop-shadow-md">{venue.name}</h3>
                  <div className="flex items-center gap-2 text-[#D4AF37] text-sm mb-6 font-medium">
                    <MapPin size={16} /> {venue.location}
                  </div>
                  <div className="flex justify-between items-center text-sm text-slate-600 mb-8 border-t border-b border-slate-200 py-5">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-slate-600" /> Up to {venue.capacity}
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-600 uppercase tracking-widest">Starts at</div>
                      <div className="text-[#D4AF37] font-bold text-base md:text-lg">₹{venue.price_per_day}</div>
                    </div>
                  </div>
                  <Link to={`/venues/${venue.id}`} className="mt-auto flex items-center justify-center gap-2 text-slate-900 hover:text-[#D4AF37] transition-colors font-bold uppercase tracking-widest text-sm bg-slate-50 hover:bg-slate-50 py-4 rounded-lg w-full">
                    View Details <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-32 bg-[#FAFAFA] border-y border-slate-200 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] md:w-[50rem] h-[30rem] md:h-[50rem] bg-[#D4AF37]/5 rounded-full blur-[100px] md:blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-6xl font-serif font-bold text-slate-900 mb-4 md:mb-6">Our <span className="text-[#D4AF37]">Services</span></h2>
            <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto font-light">Comprehensive event solutions tailored to perfection.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto">
            {['Wedding', 'Reception', 'Birthday', 'Engagement', 'Anniversary', 'Corporate', 'Baby Shower', 'Private Party'].map((service, idx) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 text-center hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all duration-300 group backdrop-blur-sm"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:border-[#D4AF37] group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Star size={20} className="text-[#D4AF37] group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.8)] transition-all md:w-6 md:h-6" />
                </div>
                <h3 className="text-slate-900 font-serif text-base md:text-lg font-bold tracking-wide">{service}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-6xl font-serif font-bold text-slate-900 mb-6">Client <span className="text-[#D4AF37]">Experiences</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto">
            {testimonials.slice(0,3).map((t, idx) => (
              <motion.div 
                key={t.id} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="bg-gradient-to-br from-[#FFFFFF] to-[#FAFAFA] border border-slate-200 rounded-2xl p-8 md:p-10 hover:border-[#D4AF37]/40 transition-colors shadow-2xl relative"
              >
                <div className="absolute -top-6 left-8 md:left-10 text-5xl md:text-6xl text-[#D4AF37]/20 font-serif font-black">"</div>
                <div className="flex text-[#D4AF37] mb-6 gap-1 relative z-10">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={18} className="fill-current" />)}
                </div>
                <p className="text-slate-600 italic mb-8 leading-relaxed font-light text-base md:text-lg relative z-10">"{t.content}"</p>
                <div className="border-t border-slate-200 pt-6 mt-auto">
                  <h4 className="text-slate-900 font-bold text-base md:text-lg">{t.name}</h4>
                  <p className="text-[#D4AF37] text-xs md:text-sm font-medium uppercase tracking-wider mt-1">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury CTA */}
      <section className="py-24 md:py-40 relative flex items-center justify-center overflow-hidden px-4">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url("https://xaaqlitnmzuihgjwaqwt.supabase.co/storage/v1/object/public/media/home2.jpeg")' }}
        />
        <div className="absolute inset-0 bg-black/80 bg-gradient-to-t from-[#FAFAFA] via-black/50 to-transparent" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white mb-6 md:mb-8 leading-tight">
              Ready to Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">Magic?</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-10 md:mb-12 font-light leading-relaxed">
              Let our expert team craft an unforgettable experience for your next big event.
            </p>
            <Link 
              to="/contact" 
              className="inline-block w-full sm:w-auto px-8 py-5 md:px-12 md:py-6 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-slate-900 font-bold uppercase tracking-widest hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-300 rounded-sm text-sm md:text-lg"
            >
              Book a Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
