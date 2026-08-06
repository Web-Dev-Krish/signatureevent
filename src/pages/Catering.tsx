import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Utensils, Coffee, Award, CheckCircle2 } from 'lucide-react';

export default function Catering() {
  const [items, setItems] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Veg', 'Non-Veg', 'Chinese', 'Italian', 'Desserts'];

  useEffect(() => {
    Promise.all([
      fetch('/api/catering').then(r => r.json()),
      fetch('/api/catering-packages').then(r => r.json())
    ]).then(([itemsData, packagesData]) => {
      setItems(itemsData || []);
      setPackages(packagesData || []);
      setLoading(false);
    });
  }, []);

  const filteredItems = activeTab === 'All' ? items : items.filter(i => i.category === activeTab || i.type === activeTab);

  return (
    <div className="bg-[#061120] min-h-screen">
      {/* Hero */}
      <div className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://xaaqlitnmzuihgjwaqwt.supabase.co/storage/v1/object/public/media/imageb.jpeg')] bg-cover bg-center opacity-30" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F5C518]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-[#F5C518]/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="relative z-10 px-4">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <ChefHat size={48} className="text-[#F5C518] mx-auto mb-6 drop-shadow-[0_0_15px_rgba(245,197,24,0.5)]" />
            <h1 className="text-4xl md:text-7xl font-serif font-bold text-[#E8F4FD] mb-4 tracking-tight">
              Malhotra <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5C518] to-[#FFE066]">Catering</span>
            </h1>
            <p className="text-xl text-[#94B8D4] max-w-2xl mx-auto font-light">Exquisite culinary experiences tailored for your grand celebrations.</p>
          </motion.div>
        </div>
      </div>

      {/* Pricing Packages */}
      <div className="py-20 relative z-10 border-b border-[#1A3A5C]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-[#E8F4FD] mb-4">Premium <span className="text-[#F5C518]">Packages</span></h2>
            <p className="text-[#94B8D4] max-w-2xl mx-auto">Choose from our meticulously crafted catering packages, designed to delight every palate.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.length === 0 && !loading && (
              <p className="text-center col-span-3 text-[#94B8D4]">Packages will be available soon.</p>
            )}
            {packages.map((pkg, idx) => (
              <motion.div 
                key={pkg.id}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative rounded-2xl overflow-hidden backdrop-blur-md border ${
                  idx === 1 ? 'bg-gradient-to-b from-[#1A1500] to-[#061120] border-[#F5C518]/50 shadow-[0_0_30px_rgba(245,197,24,0.15)] transform md:-translate-y-4' : 'bg-[#0F2440] border-[#1A3A5C] hover:border-white/10'
                } transition-all duration-300 flex flex-col`}
              >
                {idx === 1 && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#F5C518] via-[#FFE066] to-[#F5C518]" />
                )}
                {pkg.image_url && (
                  <div className="h-48 overflow-hidden">
                    <img src={pkg.image_url} alt={pkg.name} loading="lazy" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />
                  </div>
                )}
                <div className="p-8 flex-1 flex flex-col">
                  {idx === 1 && <span className="text-[#F5C518] text-xs font-bold uppercase tracking-wider mb-2">Most Popular</span>}
                  <h3 className="text-2xl font-serif font-bold text-[#E8F4FD] mb-2">{pkg.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-[#F5C518]">₹{pkg.price}</span>
                    <span className="text-[#94B8D4]"> /plate</span>
                  </div>
                  {pkg.description && <p className="text-[#94B8D4] text-sm mb-6 pb-6 border-b border-[#1A3A5C]">{pkg.description}</p>}
                  
                  <ul className="space-y-4 mb-8 flex-1">
                    {(pkg.features || []).map((feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-[#94B8D4]">
                        <CheckCircle2 size={18} className="text-[#F5C518] shrink-0 mt-0.5" />
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a href="tel:+919354710637" className={`w-full block text-center py-4 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 ${
                    idx === 1 
                      ? 'bg-gradient-to-r from-[#F5C518] to-[#FFE066] text-white shadow-[0_0_20px_rgba(245,197,24,0.3)] hover:shadow-[0_0_30px_rgba(245,197,24,0.5)]' 
                      : 'bg-[#0F2440] text-[#0B1929] hover:bg-[#0F2440]'
                  }`}>
                    Book Now
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Gallery */}
      <div className="py-20 container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-[#E8F4FD] mb-6">Culinary <span className="text-[#F5C518]">Masterpieces</span></h2>
          <div className="flex flex-wrap justify-center gap-3">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                  activeTab === tab 
                    ? 'text-white shadow-[0_0_20px_rgba(245,197,24,0.4)]' 
                    : 'text-[#94B8D4] hover:text-[#E8F4FD] bg-[#0F2440] hover:bg-[#0F2440]'
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeCateringTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#F5C518] to-[#FFE066] rounded-full"
                    style={{ zIndex: -1 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-[#F5C518]/30 border-t-[#F5C518] rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item, idx) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                key={item.id} 
                className="bg-[#0B1929] border border-[#1A3A5C] rounded-2xl overflow-hidden group hover:border-[#F5C518]/30 transition-colors"
              >
                <div className="h-56 overflow-hidden relative">
                  <img src={item.image_url} alt={item.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className={`absolute top-4 right-4 w-3 h-3 rounded-full shadow-lg ${item.type === 'Veg' ? 'bg-green-500 shadow-green-500/50' : item.type === 'Non-Veg' ? 'bg-red-500 shadow-red-500/50' : 'bg-transparent'}`} />
                </div>
                <div className="p-5 text-center relative z-10 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-lg font-bold text-[#E8F4FD] mb-1 tracking-wide">{item.name}</h4>
                  <p className="text-xs text-[#F5C518] uppercase tracking-widest">{item.category}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Live Counters */}
      <div className="py-20 relative border-t border-[#1A3A5C] bg-gradient-to-b from-transparent to-[#061120]">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl font-serif font-bold text-[#E8F4FD] mb-6">Live <span className="text-[#F5C518]">Counters</span> & Custom Menus</h2>
          <p className="text-[#94B8D4] mb-10 leading-relaxed text-lg">
            Elevate your event with our interactive live counters. From authentic Italian pasta stations to smoky tandoor grills and liquid nitrogen desserts, our chefs provide a visual and culinary spectacle.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              "Live Chaat & Street Food",
              "Authentic Dim Sum & Sushi Bar",
              "Gourmet Dessert Station"
            ].map((counter, i) => (
              <div key={i} className="bg-[#0F2440] border border-[#1A3A5C] p-6 rounded-2xl flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#F5C518]/10 flex items-center justify-center shrink-0">
                  <ChefHat size={16} className="text-[#F5C518]" />
                </div>
                <span className="text-[#94B8D4] font-medium">{counter}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
