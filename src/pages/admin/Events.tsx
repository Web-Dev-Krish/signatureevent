import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Image as ImageIcon, Tags } from 'lucide-react';

export default function Events() {
  const [activeTab, setActiveTab] = useState<'media' | 'categories'>('media');
  
  const [events, setEvents] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [mediaForm, setMediaForm] = useState({ title: '', type: '', image_url: '', video_url: '' });
  const [categoryForm, setCategoryForm] = useState({ name: '' });

  const fetchData = async () => {
    setLoading(true);
    const [eventsRes, catsRes] = await Promise.all([
      fetch('/api/events'),
      fetch('/api/event-categories')
    ]);
    const evData = await eventsRes.json();
    const catData = await catsRes.json();
    setEvents(evData || []);
    setCategories(catData || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleMediaSubmit = async (e: any) => {
    e.preventDefault();
    // Default values for repurposed events table fields
    const payload = { 
      ...mediaForm, 
      date: new Date().toISOString(), 
      venue_name: '', 
      description: '' 
    };

    if (editingId) {
      await fetch('/api/events', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editingId, ...payload }) });
    } else {
      await fetch('/api/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    }
    setIsMediaModalOpen(false);
    fetchData();
  };

  const handleCategorySubmit = async (e: any) => {
    e.preventDefault();
    if (editingId) {
      await fetch('/api/event-categories', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editingId, ...categoryForm }) });
    } else {
      await fetch('/api/event-categories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(categoryForm) });
    }
    setIsCategoryModalOpen(false);
    fetchData();
  };

  const deleteEvent = async (id: number) => {
    if (!confirm('Delete this media item?')) return;
    await fetch('/api/events', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    fetchData();
  };

  const deleteCategory = async (id: number) => {
    if (!confirm('Delete this category? Media items in this category might not display correctly.')) return;
    await fetch('/api/event-categories', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    fetchData();
  };

  const openMediaModal = (v?: any) => {
    if (v) {
      setMediaForm({ title: v.title || '', type: v.type || '', image_url: v.image_url || '', video_url: v.video_url || '' });
      setEditingId(v.id);
    } else {
      setMediaForm({ title: '', type: categories.length > 0 ? categories[0].name : '', image_url: '', video_url: '' });
      setEditingId(null);
    }
    setIsMediaModalOpen(true);
  };

  const openCategoryModal = (v?: any) => {
    if (v) {
      setCategoryForm({ name: v.name });
      setEditingId(v.id);
    } else {
      setCategoryForm({ name: '' });
      setEditingId(null);
    }
    setIsCategoryModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-slate-900">Manage Theme & Events</h1>
        <div className="flex bg-[#FFFFFF] rounded-lg p-1 border border-slate-200">
          <button 
            onClick={() => setActiveTab('media')}
            className={`px-4 py-2 rounded-md font-semibold flex items-center gap-2 transition-colors ${activeTab === 'media' ? 'bg-[#D4AF37] text-white' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <ImageIcon size={18} /> Media
          </button>
          <button 
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-md font-semibold flex items-center gap-2 transition-colors ${activeTab === 'categories' ? 'bg-[#D4AF37] text-white' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <Tags size={18} /> Categories
          </button>
        </div>
      </div>

      {activeTab === 'media' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button onClick={() => openMediaModal()} className="bg-[#D4AF37] text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#F3E5AB]">
              <Plus size={18} /> Add Media
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading ? <p className="text-slate-600">Loading...</p> : events.map(v => (
              <div key={v.id} className="bg-[#FFFFFF] border border-slate-200 rounded-xl overflow-hidden">
                <img src={v.image_url} alt={v.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <div className="text-xs text-[#D4AF37] uppercase tracking-wider mb-1">{v.type}</div>
                  <h3 className="text-lg font-bold text-slate-900 truncate">{v.title || 'Untitled'}</h3>
                  <div className="flex justify-end gap-2 mt-4 border-t border-slate-200 pt-3">
                    <button onClick={() => openMediaModal(v)} className="p-2 text-slate-600 hover:text-slate-900 bg-slate-50 rounded"><Edit2 size={16} /></button>
                    <button onClick={() => deleteEvent(v.id)} className="p-2 text-red-400 hover:text-red-300 bg-red-500/10 rounded"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'categories' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button onClick={() => openCategoryModal()} className="bg-[#D4AF37] text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#F3E5AB]">
              <Plus size={18} /> Add Category
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? <p className="text-slate-600">Loading...</p> : categories.map(cat => (
              <div key={cat.id} className="bg-[#FFFFFF] border border-slate-200 rounded-xl p-4 flex justify-between items-center">
                <span className="text-slate-900 font-medium">{cat.name}</span>
                <div className="flex gap-2">
                  <button onClick={() => openCategoryModal(cat)} className="p-2 text-slate-600 hover:text-slate-900 bg-slate-50 rounded"><Edit2 size={16} /></button>
                  <button onClick={() => deleteCategory(cat.id)} className="p-2 text-red-400 hover:text-red-300 bg-red-500/10 rounded"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Media Modal */}
      {isMediaModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-slate-200 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">{editingId ? 'Edit Media' : 'Add Media'}</h2>
              <button onClick={() => setIsMediaModalOpen(false)} className="text-slate-600 hover:text-slate-900"><X size={24} /></button>
            </div>
            <form onSubmit={handleMediaSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Title (Optional)</label>
                  <input className="w-full bg-[#FAFAFA] border border-slate-200 rounded p-2 text-slate-900" value={mediaForm.title} onChange={e => setMediaForm({...mediaForm, title: e.target.value})} placeholder="e.g. Royal Wedding Setup" />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Category</label>
                  <select required className="w-full bg-[#FAFAFA] border border-slate-200 rounded p-2 text-slate-900" value={mediaForm.type} onChange={e => setMediaForm({...mediaForm, type: e.target.value})}>
                    <option value="" disabled>Select Category</option>
                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-slate-600 mb-1">Image URL</label>
                  <input required className="w-full bg-[#FAFAFA] border border-slate-200 rounded p-2 text-slate-900" value={mediaForm.image_url} onChange={e => setMediaForm({...mediaForm, image_url: e.target.value})} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-slate-600 mb-1">Video URL (Optional)</label>
                  <input className="w-full bg-[#FAFAFA] border border-slate-200 rounded p-2 text-slate-900" value={mediaForm.video_url} onChange={e => setMediaForm({...mediaForm, video_url: e.target.value})} />
                </div>
              </div>
              <button type="submit" className="w-full bg-[#D4AF37] text-white font-bold py-3 rounded-lg hover:bg-[#F3E5AB]">
                {editingId ? 'Update Media' : 'Add Media'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-slate-200 rounded-xl w-full max-w-md">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">{editingId ? 'Edit Category' : 'Add Category'}</h2>
              <button onClick={() => setIsCategoryModalOpen(false)} className="text-slate-600 hover:text-slate-900"><X size={24} /></button>
            </div>
            <form onSubmit={handleCategorySubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-slate-600 mb-1">Category Name</label>
                <input required className="w-full bg-[#FAFAFA] border border-slate-200 rounded p-2 text-slate-900" value={categoryForm.name} onChange={e => setCategoryForm({...categoryForm, name: e.target.value})} placeholder="e.g. Pre-Wedding" />
              </div>
              <button type="submit" className="w-full bg-[#D4AF37] text-white font-bold py-3 rounded-lg hover:bg-[#F3E5AB]">
                {editingId ? 'Update Category' : 'Add Category'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
