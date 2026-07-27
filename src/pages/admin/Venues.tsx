import { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, X, UploadCloud, Image as ImageIcon, Video, Calendar } from 'lucide-react';

export default function Venues() {
  const [venues, setVenues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [availabilityModalOpen, setAvailabilityModalOpen] = useState(false);
  const [selectedVenueId, setSelectedVenueId] = useState<number | null>(null);
  const [venueMedia, setVenueMedia] = useState<any[]>([]);
  const [unavailableDates, setUnavailableDates] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [form, setForm] = useState({
    name: '', location: '', capacity: '', price_per_day: '', rating: '', description: '', image_url: '', map_html: ''
  });
  
  const [mediaForm, setMediaForm] = useState({
    media_type: 'image',
    media_url: '',
    thumbnail_url: '',
    caption: '',
    display_order: 0
  });
  
  const [availabilityForm, setAvailabilityForm] = useState({
    date: '',
    reason: ''
  });

  const fetchVenues = async () => {
    const res = await fetch('/api/venues');
    const data = await res.json();
    setVenues(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchVenues(); }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const payload = { ...form, capacity: parseInt(form.capacity), price_per_day: parseFloat(form.price_per_day), rating: parseFloat(form.rating) };
    
    if (editingId) {
      await fetch('/api/venues', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editingId, ...payload }) });
    } else {
      await fetch('/api/venues', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    }
    
    setIsModalOpen(false);
    fetchVenues();
  };

  const editVenue = (v: any) => {
    setForm({ name: v.name, location: v.location, capacity: v.capacity, price_per_day: v.price_per_day, rating: v.rating, description: v.description, image_url: v.image_url, map_html: v.map_html || '' });
    setEditingId(v.id);
    setIsModalOpen(true);
  };

  const deleteVenue = async (id: number) => {
    if (!confirm('Delete this venue?')) return;
    await fetch('/api/venues', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    fetchVenues();
  };

  const openNew = () => {
    setForm({ name: '', location: '', capacity: '', price_per_day: '', rating: '', description: '', image_url: '', map_html: '' });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const fetchVenueMedia = async (venueId: number) => {
    const res = await fetch(`/api/venue-media?venue_id=${venueId}`);
    const data = await res.json();
    setVenueMedia(data || []);
  };

  const openMediaModal = (venueId: number) => {
    setSelectedVenueId(venueId);
    setMediaForm({ media_type: 'image', media_url: '', thumbnail_url: '', caption: '', display_order: 0 });
    setMediaModalOpen(true);
    fetchVenueMedia(venueId);
  };

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1];
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: `${Date.now()}-${file.name}`,
            fileBase64: base64,
            contentType: file.type
          })
        });
        const data = await res.json();
        if (data.url) {
          setMediaForm({ ...mediaForm, media_url: data.url });
        }
      } catch (err) {
        console.error('Upload failed', err);
        alert('Upload failed');
      } finally {
        setUploading(false);
      }
    };
  };

  const handleMediaSubmit = async (e: any) => {
    e.preventDefault();
    await fetch('/api/venue-media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...mediaForm, venue_id: selectedVenueId })
    });
    setMediaModalOpen(false);
    setMediaForm({ media_type: 'image', media_url: '', thumbnail_url: '', caption: '', display_order: 0 });
    fetchVenueMedia(selectedVenueId!);
  };

  const deleteMedia = async (id: number) => {
    if (!confirm('Delete this media?')) return;
    await fetch('/api/venue-media', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    fetchVenueMedia(selectedVenueId!);
  };

  const fetchUnavailableDates = async (venueId: number) => {
    const res = await fetch(`/api/venue-availability?venue_id=${venueId}`);
    const data = await res.json();
    setUnavailableDates(data || []);
  };

  const openAvailabilityModal = (venueId: number) => {
    setSelectedVenueId(venueId);
    setAvailabilityForm({ date: '', reason: '' });
    setAvailabilityModalOpen(true);
    fetchUnavailableDates(venueId);
  };

  const handleAvailabilitySubmit = async (e: any) => {
    e.preventDefault();
    await fetch('/api/venue-availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...availabilityForm, venue_id: selectedVenueId })
    });
    setAvailabilityForm({ date: '', reason: '' });
    fetchUnavailableDates(selectedVenueId!);
  };

  const deleteUnavailableDate = async (id: number) => {
    if (!confirm('Remove this unavailable date?')) return;
    await fetch('/api/venue-availability', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    fetchUnavailableDates(selectedVenueId!);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-white">Manage Venues</h1>
        <button onClick={openNew} className="bg-[#D4AF37] text-black px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#F4D03F]">
          <Plus size={18} /> Add Venue
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? <p className="text-gray-500">Loading...</p> : venues.map(v => (
          <div key={v.id} className="bg-[#151515] border border-white/10 rounded-xl overflow-hidden">
            <img src={v.image_url} alt={v.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-bold text-white truncate">{v.name}</h3>
              <p className="text-sm text-gray-400 mb-4 truncate">{v.location}</p>
              <div className="flex justify-between items-center">
                <span className="text-[#D4AF37] font-semibold">${v.price_per_day}/day</span>
                <div className="flex gap-2">
                  <button onClick={() => openMediaModal(v.id)} className="p-2 text-gray-400 hover:text-white bg-white/5 rounded" title="Manage Media"><ImageIcon size={16} /></button>
                  <button onClick={() => openAvailabilityModal(v.id)} className="p-2 text-gray-400 hover:text-white bg-white/5 rounded" title="Manage Availability"><Calendar size={16} /></button>
                  <button onClick={() => editVenue(v)} className="p-2 text-gray-400 hover:text-white bg-white/5 rounded"><Edit2 size={16} /></button>
                  <button onClick={() => deleteVenue(v.id)} className="p-2 text-red-400 hover:text-red-300 bg-red-500/10 rounded"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#151515] border border-white/10 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">{editingId ? 'Edit Venue' : 'Add Venue'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Name</label>
                  <input required className="w-full bg-[#0B0B0B] border border-white/10 rounded p-2 text-white" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Location</label>
                  <input required className="w-full bg-[#0B0B0B] border border-white/10 rounded p-2 text-white" value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Capacity</label>
                  <input required type="number" className="w-full bg-[#0B0B0B] border border-white/10 rounded p-2 text-white" value={form.capacity} onChange={e => setForm({...form, capacity: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Price per day (₹)</label>
                  <input required type="number" className="w-full bg-[#0B0B0B] border border-white/10 rounded p-2 text-white" value={form.price_per_day} onChange={e => setForm({...form, price_per_day: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Rating</label>
                  <input required type="number" step="0.1" className="w-full bg-[#0B0B0B] border border-white/10 rounded p-2 text-white" value={form.rating} onChange={e => setForm({...form, rating: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Image URL</label>
                  <input required className="w-full bg-[#0B0B0B] border border-white/10 rounded p-2 text-white" value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Google Maps HTML (iframe)</label>
                <textarea rows={2} className="w-full bg-[#0B0B0B] border border-white/10 rounded p-2 text-white" value={form.map_html} onChange={e => setForm({...form, map_html: e.target.value})} placeholder='<iframe src="..."></iframe>' />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <textarea required rows={4} className="w-full bg-[#0B0B0B] border border-white/10 rounded p-2 text-white" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
              </div>
              <button type="submit" className="w-full bg-[#D4AF37] text-black font-bold py-3 rounded-lg hover:bg-[#F4D03F]">
                {editingId ? 'Update Venue' : 'Create Venue'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Media Modal */}
      {mediaModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#151515] border border-white/10 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Manage Venue Media</h2>
              <button onClick={() => setMediaModalOpen(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
            </div>
            <div className="p-6">
              <form onSubmit={handleMediaSubmit} className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Media Type</label>
                    <select className="w-full bg-[#0B0B0B] border border-white/10 rounded p-2 text-white" value={mediaForm.media_type} onChange={e => setMediaForm({...mediaForm, media_type: e.target.value})}>
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Display Order</label>
                    <input type="number" className="w-full bg-[#0B0B0B] border border-white/10 rounded p-2 text-white" value={mediaForm.display_order} onChange={e => setMediaForm({...mediaForm, display_order: parseInt(e.target.value)})} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Media Upload</label>
                  <div className="flex gap-2">
                    <input type="file" accept={mediaForm.media_type === 'image' ? 'image/*' : 'video/*'} className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-[#151515] border border-[#D4AF37] text-[#D4AF37] px-4 py-2 rounded flex items-center gap-2 hover:bg-[#D4AF37]/10">
                      <UploadCloud size={18} /> {uploading ? 'Uploading...' : 'Choose File'}
                    </button>
                    <input required className="flex-1 bg-[#0B0B0B] border border-white/10 rounded p-2 text-white text-sm" value={mediaForm.media_url} onChange={e => setMediaForm({...mediaForm, media_url: e.target.value})} placeholder="Or paste URL here" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Thumbnail URL (for videos)</label>
                  <input className="w-full bg-[#0B0B0B] border border-white/10 rounded p-2 text-white" value={mediaForm.thumbnail_url} onChange={e => setMediaForm({...mediaForm, thumbnail_url: e.target.value})} placeholder="Optional thumbnail for videos" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Caption</label>
                  <input className="w-full bg-[#0B0B0B] border border-white/10 rounded p-2 text-white" value={mediaForm.caption} onChange={e => setMediaForm({...mediaForm, caption: e.target.value})} placeholder="Optional caption" />
                </div>
                <button type="submit" disabled={uploading} className="w-full bg-[#D4AF37] text-black font-bold py-3 rounded-lg hover:bg-[#F4D03F] disabled:opacity-50">
                  Add Media
                </button>
              </form>

              <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-bold text-white mb-4">Current Media</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {venueMedia.map(media => (
                    <div key={media.id} className="group relative rounded-xl overflow-hidden bg-[#0B0B0B] border border-white/10">
                      {media.media_type === 'image' ? (
                        <img src={media.media_url} alt={media.caption || 'Media'} className="w-full h-32 object-cover" />
                      ) : (
                        <div className="w-full h-32 flex items-center justify-center bg-[#0B0B0B]">
                          <Video size={32} className="text-[#D4AF37]" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button onClick={() => deleteMedia(media.id)} className="p-2 bg-red-500/80 text-white rounded hover:bg-red-500"><Trash2 size={16} /></button>
                      </div>
                      <div className="p-2">
                        <p className="text-xs text-gray-400 truncate">{media.caption || 'No caption'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Availability Modal */}
      {availabilityModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#151515] border border-white/10 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Manage Venue Availability</h2>
              <button onClick={() => setAvailabilityModalOpen(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
            </div>
            <div className="p-6">
              <form onSubmit={handleAvailabilitySubmit} className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Unavailable Date</label>
                  <div className="grid grid-cols-3 gap-2">
                    <select required className="bg-[#0B0B0B] border border-white/10 rounded p-2 text-white" value={availabilityForm.date ? new Date(availabilityForm.date).getDate() : ''} onChange={e => {
                      const d = Number(e.target.value);
                      const m = availabilityForm.date ? new Date(availabilityForm.date).getMonth() : 0;
                      const y = availabilityForm.date ? new Date(availabilityForm.date).getFullYear() : new Date().getFullYear();
                      setAvailabilityForm({...availabilityForm, date: new Date(y, m, d).toISOString().split('T')[0]});
                    }}>
                      <option value="">Day</option>
                      {Array.from({length: 31}, (_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
                    </select>
                    <select required className="bg-[#0B0B0B] border border-white/10 rounded p-2 text-white" value={availabilityForm.date ? new Date(availabilityForm.date).getMonth() : ''} onChange={e => {
                      const m = Number(e.target.value);
                      const d = availabilityForm.date ? new Date(availabilityForm.date).getDate() : 1;
                      const y = availabilityForm.date ? new Date(availabilityForm.date).getFullYear() : new Date().getFullYear();
                      setAvailabilityForm({...availabilityForm, date: new Date(y, m, d).toISOString().split('T')[0]});
                    }}>
                      <option value="">Month</option>
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => <option key={i} value={i}>{m}</option>)}
                    </select>
                    <select required className="bg-[#0B0B0B] border border-white/10 rounded p-2 text-white" value={availabilityForm.date ? new Date(availabilityForm.date).getFullYear() : ''} onChange={e => {
                      const y = Number(e.target.value);
                      const m = availabilityForm.date ? new Date(availabilityForm.date).getMonth() : 0;
                      const d = availabilityForm.date ? new Date(availabilityForm.date).getDate() : 1;
                      setAvailabilityForm({...availabilityForm, date: new Date(y, m, d).toISOString().split('T')[0]});
                    }}>
                      <option value="">Year</option>
                      {Array.from({length: 5}, (_, i) => <option key={i} value={new Date().getFullYear() + i}>{new Date().getFullYear() + i}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Reason (optional)</label>
                  <input className="w-full bg-[#0B0B0B] border border-white/10 rounded p-2 text-white" value={availabilityForm.reason} onChange={e => setAvailabilityForm({...availabilityForm, reason: e.target.value})} placeholder="e.g. Private event, Maintenance" />
                </div>
                <button type="submit" className="w-full bg-[#D4AF37] text-black font-bold py-3 rounded-lg hover:bg-[#F4D03F]">
                  Mark as Unavailable
                </button>
              </form>

              <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-bold text-white mb-4">Unavailable Dates</h3>
                {unavailableDates.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No unavailable dates set</p>
                ) : (
                  <div className="space-y-2">
                    {unavailableDates.map(date => (
                      <div key={date.id} className="flex justify-between items-center bg-[#0B0B0B] border border-white/10 rounded p-3">
                        <div>
                          <p className="text-white font-semibold">{new Date(date.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</p>
                          {date.reason && <p className="text-gray-400 text-sm">{date.reason}</p>}
                        </div>
                        <button onClick={() => deleteUnavailableDate(date.id)} className="p-2 text-red-400 hover:text-red-300"><Trash2 size={16} /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
