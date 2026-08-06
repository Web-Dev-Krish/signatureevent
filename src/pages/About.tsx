import { motion } from 'framer-motion';
import { Award, Users, Target, Shield, Sparkles } from 'lucide-react';
import AchievementsTimeline from '../components/AchievementsTimeline';

export default function About() {
  return (
    <div className="bg-[#061120] min-h-screen pt-28 pb-20 relative overflow-hidden">
      {/* Ambient Lights */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#F5C518]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[30rem] h-[30rem] bg-[#F5C518]/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/2" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-16 items-center mb-32"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F2440] border border-[#1A3A5C] text-[#F5C518] mb-6 backdrop-blur-md">
              <Sparkles size={16} />
              <span className="text-sm font-semibold tracking-widest uppercase">Our Story</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#E8F4FD] mb-8 leading-tight tracking-tight">
              Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5C518] via-[#FFE066] to-[#F5C518]">Timeless</span> Legacies
            </h1>
            
            <p className="text-[#94B8D4] text-lg md:text-xl leading-relaxed mb-6 font-light">
              Founded on the principles of elegance, precision, and unparalleled luxury, Malhotra Events has been transforming visions into breathtaking realities for over two decades.
            </p>
            <p className="text-[#94B8D4] text-lg leading-relaxed mb-10 font-light">
              We believe that every event is a unique story waiting to be told. From intimate gatherings to royal weddings, our dedicated team ensures flawless execution and extraordinary memories.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="border-l-2 border-[#F5C518] pl-5">
                <h4 className="text-4xl font-serif font-bold text-[#E8F4FD] mb-1">20<span className="text-[#F5C518]">+</span></h4>
                <p className="text-[#94B8D4] text-xs font-bold uppercase tracking-widest">Years Experience</p>
              </div>
              <div className="border-l-2 border-[#F5C518] pl-5">
                <h4 className="text-4xl font-serif font-bold text-[#E8F4FD] mb-1">1000<span className="text-[#F5C518]">+</span></h4>
                <p className="text-[#94B8D4] text-xs font-bold uppercase tracking-widest">Events Executed</p>
              </div>
            </div>
          </div>
          
          <div className="relative h-[600px] rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-[#F5C518]/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img 
              src="https://xaaqlitnmzuihgjwaqwt.supabase.co/storage/v1/object/public/media/about%20us.jpeg" 
              alt="About Us" 
              className="w-full h-full object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-1000 ease-out" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061120] via-transparent to-transparent z-10" />
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute bottom-8 left-8 bg-black/60 backdrop-blur-xl p-8 border border-white/5 rounded-xl hidden md:block z-20 shadow-2xl"
            >
              <Award size={48} className="text-[#F5C518] mb-4 drop-shadow-lg" />
              <h4 className="text-2xl font-serif font-bold text-white mb-1">Award Winning</h4>
              <p className="text-[#F5C518] text-sm uppercase tracking-widest font-semibold">Premium Event Planners</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Mission / Vision */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {[
            { icon: Target, title: "Our Mission", desc: "To deliver exceptional, bespoke event experiences that exceed expectations through creativity, meticulous planning, and flawless execution." },
            { icon: Shield, title: "Our Vision", desc: "To be the globally recognized benchmark for luxury event organizing and premium catering services.", highlight: true },
            { icon: Users, title: "Our Values", desc: "Integrity, Innovation, Elegance, and a relentless commitment to perfection in every detail." }
          ].map((item, idx) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className={`p-10 rounded-2xl text-center flex flex-col items-center justify-center transition-all duration-500 border ${
                item.highlight 
                  ? 'bg-gradient-to-b from-white to-[#061120] border-[#F5C518]/40 shadow-[0_0_30px_rgba(245,197,24,0.15)] transform md:-translate-y-4' 
                  : 'bg-[#0F2440] border-[#1A3A5C] hover:border-slate-300 hover:bg-[#0F2440] backdrop-blur-sm'
              }`}
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-xl ${
                item.highlight ? 'bg-gradient-to-br from-[#F5C518] to-[#FFE066] text-white' : 'bg-[#0B1929] border border-[#F5C518]/30 text-[#F5C518]'
              }`}>
                <item.icon size={32} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#E8F4FD] mb-4 tracking-wide">{item.title}</h3>
              <p className="text-[#94B8D4] font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Achievements Timeline */}
        <div className="relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#E8F4FD] mb-4">Our <span className="text-[#F5C518]">Journey</span></h2>
            <p className="text-[#94B8D4] max-w-2xl mx-auto font-light text-lg">A timeline of our most prestigious achievements and milestones.</p>
          </div>
          <AchievementsTimeline />
        </div>
      </div>
    </div>
  );
}
