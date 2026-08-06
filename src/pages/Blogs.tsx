import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Sparkles } from 'lucide-react';
import { formatDate } from '../lib/date';
import { motion } from 'framer-motion';

export default function Blogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        setBlogs(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#061120] min-h-screen pt-24 pb-20 relative overflow-hidden">
      {/* Ambient Lights */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#F5C518]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[40rem] h-[40rem] bg-[#F5C518]/5 rounded-full blur-[150px] pointer-events-none -translate-x-1/2" />

      {/* Header */}
      <div className="relative z-10 py-20 bg-gradient-to-b from-transparent to-[#061120] border-b border-[#1A3A5C]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F2440] border border-[#1A3A5C] text-[#F5C518] mb-6 backdrop-blur-md">
              <Sparkles size={16} />
              <span className="text-sm font-semibold tracking-widest uppercase">Malhotra Events</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#E8F4FD] mb-6 tracking-tight">Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5C518] to-[#FFE066]">Inspiration</span></h1>
            <p className="text-[#94B8D4] max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
              Discover trends, tips, and stories from the world of luxury events and timeless celebrations.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-[#F5C518]/30 border-t-[#F5C518] rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {blogs.map((blog, idx) => (
              <motion.div 
                key={blog.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="bg-[#0B1929] border border-[#1A3A5C] rounded-2xl overflow-hidden group flex flex-col hover:border-[#F5C518]/30 transition-colors shadow-2xl relative"
              >
                <div className="h-64 overflow-hidden relative">
                  <img src={blog.image_url} alt={blog.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1929] via-transparent to-transparent opacity-80" />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-[#1A3A5C] text-[#F5C518] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                    {blog.category}
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col relative z-10 -mt-10">
                  <h3 className="text-2xl font-serif font-bold text-[#E8F4FD] mb-4 line-clamp-2 drop-shadow-md group-hover:text-[#F5C518] transition-colors">{blog.title}</h3>
                  <p className="text-[#94B8D4] font-light text-sm leading-relaxed line-clamp-3 mb-8 flex-grow">{blog.content}</p>
                  
                  <div className="flex justify-between items-center text-xs text-[#94B8D4] border-t border-[#1A3A5C] pt-5 mt-auto uppercase tracking-widest font-semibold">
                    <div className="flex items-center gap-2"><User size={14} className="text-[#F5C518]" /> {blog.author}</div>
                    <div className="flex items-center gap-2"><Calendar size={14} className="text-[#F5C518]" /> {formatDate(blog.published_at)}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
