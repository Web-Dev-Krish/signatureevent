import { Link } from 'react-router-dom';
import { Cake, Crown, Waves, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const signatureEvents = [
  {
    title: "Birthday's at Mankameshwar",
    path: '/signature-events/birthday-mankameshwar',
    image: 'https://xaaqlitnmzuihgjwaqwt.supabase.co/storage/v1/object/public/media/birthday.jpeg',
    icon: Cake,
    price: 'Starting ₹85,000',
    text: 'Royal birthday celebrations with luxury cake styling, themed decor, DJ, catering, photo booth, and premium guest service.'
  },
  {
    title: 'Pool Parties at Vatika Resort',
    path: '/signature-events/pool-vatika',
    image: 'https://xaaqlitnmzuihgjwaqwt.supabase.co/storage/v1/object/public/media/birthday.jpeg',
    icon: Waves,
    price: 'Starting ₹1,10,000',
    text: 'Resort-style pool parties with cabana setup, mocktail bar, live snacks, music, lighting, and safety-managed poolside service.'
  }
];

export default function SignatureEvents() {
  return (
    <div className="bg-[#F9F6F0] min-h-screen pt-24 pb-20 relative overflow-hidden">
      {/* Ambient Lights */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#800000]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-[#800000]/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/2" />

      {/* Hero Section */}
      <div className="relative overflow-hidden py-32 border-b border-black/5">
        <div className="absolute inset-0 z-0">
          <img src="https://xaaqlitnmzuihgjwaqwt.supabase.co/storage/v1/object/public/media/homehero.jpeg" alt="Signature luxury events" className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F9F6F0] via-transparent to-[#F9F6F0]" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 border border-black/5 text-[#800000] mb-6 backdrop-blur-md">
              <Sparkles size={16} />
              <span className="text-sm font-semibold tracking-widest uppercase">Signature Events</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-8 tracking-tight leading-tight">
              Exclusive Celebrations Designed by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#800000] to-[#9B111E]">MalhotraEvents</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto">
              Explore our most popular ready-to-book experiences: premium birthday parties at Mankameshwar Palace and luxury pool parties at Vatika Resort.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6">Choose Your <span className="text-[#800000]">Experience</span></h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light">Each package includes venue coordination, decor direction, catering support, entertainment planning, and guest experience management.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {signatureEvents.map((event, index) => {
            const Icon = event.icon;
            return (
              <motion.div 
                key={event.path}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <Link to={event.path} className="group block bg-[#FFFFFF] border border-black/5 rounded-2xl overflow-hidden hover:border-[#800000]/40 transition-colors shadow-2xl">
                  <div className="relative h-80 overflow-hidden">
                    <img src={event.image} alt={event.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] via-transparent to-transparent opacity-90" />
                    
                    <div className="absolute top-6 left-6 w-14 h-14 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center border border-black/5 text-[#800000] group-hover:scale-110 transition-transform">
                      <Icon size={24} />
                    </div>
                    <div className="absolute bottom-6 right-6 bg-gradient-to-r from-[#800000] to-[#9B111E] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      {event.price}
                    </div>
                  </div>
                  
                  <div className="p-10 flex flex-col h-full -mt-10 relative z-10">
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4 drop-shadow-md">{event.title}</h2>
                    <p className="text-gray-600 leading-relaxed font-light mb-8 flex-grow">{event.text}</p>
                    
                    <div className="w-full py-4 bg-black/5 border border-[#800000]/30 text-gray-900 flex items-center justify-center gap-2 hover:bg-gradient-to-r hover:from-[#800000] hover:to-[#9B111E] hover:text-white hover:border-transparent transition-all duration-300 font-bold uppercase tracking-widest text-sm rounded-xl">
                      View Details <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-[#FFFFFF] to-[#F9F6F0] border border-black/5 rounded-2xl p-10 md:p-16 text-center max-w-5xl mx-auto shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#800000]/5 rounded-full blur-[100px] pointer-events-none" />
          
          <Crown className="mx-auto mb-6 h-16 w-16 text-[#800000] drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 tracking-tight">Want a Fully Custom <span className="text-[#800000]">Signature Event?</span></h2>
          <p className="mx-auto max-w-2xl leading-relaxed text-gray-600 mb-10 text-lg font-light">
            Our team can combine catering, decor, entertainment, and venue styling into a custom birthday, pool party, anniversary, or private celebration.
          </p>
          
          <Link 
            to="/contact" 
            className="inline-block px-12 py-5 bg-gradient-to-r from-[#800000] to-[#9B111E] text-white font-bold uppercase tracking-widest hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 rounded-sm"
          >
            Book Consultation
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
