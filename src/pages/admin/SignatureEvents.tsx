import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export default function SignatureEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [form, setForm] = useState({
    title: '', location: '', description: '', price: '', image_url: '', features: ''
  });

  const fetchEvents = async () => {
    const res = await fetch('/api/signature-events');
    const data = await res.json();
    setEvents(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const payload = { 
      ...form, 
      price: parseFloat(form.price),
      features: form.features.split(',').map(f => f.trim()).filter(Boolean)
    };
    
    if (editingId) {
      await fetch('/api/signature-events', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editingId, ...payload }) });
    } else {
      await fetch('/api/signature-events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    }
    setIsModalOpen(false);
    fetchEvents();
  };

  const editEvent = (v: any) => {
    setForm({ 
      title: v.title, 
      location: v.location, 
      description: v.description, 
      price: v.price, 
      image_url: v.image_url,
      features: Array.isArray(v.features) ? v.features.join(', ') : ''
    });
    setEditingId(v.id);
    setIsModalOpen(true);
  };

  const deleteEvent = async (id: number) => {
    if (!confirm('Delete this package?')) return;
    await fetch('/api/signature-events', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    fetchEvents();
  };

  const openNew = () => {
    setForm({ title: '', location: '', description: '', price: '', image_url: '', features: '' });
    setEditingId(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-gray-900">Signature Packages</h1>
        <button onClick={openNew} className="bg-[#800000] text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#9B111E]">
          <Plus size={18} /> Add Package
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? <p className="text-gray-600">Loading...</p> : events.map(v => (
          <div key={v.id} className="bg-[#FFFFFF] border border-black/5 rounded-xl overflow-hidden flex flex-col">
            <img src={v.image_url} alt={v.title} className="w-full h-56 object-cover" />
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{v.title}</h3>
              <p className="text-sm text-[#800000] mb-4">{v.location}</p>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{v.description}</p>
              <div className="mt-auto flex justify-between items-center border-t border-black/5 pt-4">
                <span className="text-gray-900 font-semibold text-lg">${v.price}</span>
                <div className="flex gap-2">
                  <button onClick={() => editEvent(v)} className="p-2 text-gray-600 hover:text-gray-900 bg-black/5 rounded"><Edit2 size={16} /></button>
                  <button onClick={() => deleteEvent(v.id)} className="p-2 text-red-400 hover:text-red-300 bg-red-500/10 rounded"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-black/5 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-black/5 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">{editingId ? 'Edit Package' : 'Add Package'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-600 hover:text-gray-900"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Title</label>
                  <input required className="w-full bg-[#F9F6F0] border border-black/5 rounded p-2 text-gray-900" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Location</label>
                  <input required className="w-full bg-[#F9F6F0] border border-black/5 rounded p-2 text-gray-900" value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Price (₹)</label>
                  <input required type="number" className="w-full bg-[#F9F6F0] border border-black/5 rounded p-2 text-gray-900" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Image URL</label>
                  <input required className="w-full bg-[#F9F6F0] border border-black/5 rounded p-2 text-gray-900" value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Features (comma separated)</label>
                <input required className="w-full bg-[#F9F6F0] border border-black/5 rounded p-2 text-gray-900" value={form.features} onChange={e => setForm({...form, features: e.target.value})} placeholder="e.g. DJ Setup, Premium Decor, Catering" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Description</label>
                <textarea required rows={4} className="w-full bg-[#F9F6F0] border border-black/5 rounded p-2 text-gray-900" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
              </div>
              <button type="submit" className="w-full bg-[#800000] text-white font-bold py-3 rounded-lg hover:bg-[#9B111E]">
                {editingId ? 'Update Package' : 'Create Package'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
