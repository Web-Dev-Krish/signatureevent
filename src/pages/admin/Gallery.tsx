import { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, X, Copy, UploadCloud } from 'lucide-react';

export default function Gallery() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [form, setForm] = useState({ title: '', category: 'General', image_url: '' });

  const fetchImages = async () => {
    const res = await fetch('/api/gallery');
    const data = await res.json();
    setImages(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchImages(); }, []);

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
          setForm({ ...form, image_url: data.url });
        }
      } catch (err) {
        console.error('Upload failed', err);
        alert('Upload failed');
      } finally {
        setUploading(false);
      }
    };
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch('/api/gallery', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setIsModalOpen(false);
    setForm({ title: '', category: 'General', image_url: '' });
    fetchImages();
  };

  const deleteImage = async (id: number) => {
    if (!confirm('Delete this image?')) return;
    await fetch('/api/gallery', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    fetchImages();
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('URL Copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-gray-900">Media Gallery</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-[#800000] text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#9B111E]">
          <Plus size={18} /> Add Media
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? <p className="text-gray-600">Loading...</p> : images.map(img => (
          <div key={img.id} className="group relative rounded-xl overflow-hidden bg-[#FFFFFF] border border-black/5">
            <img src={img.image_url} alt={img.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
              <div className="flex justify-end gap-2">
                <button onClick={() => copyUrl(img.image_url)} className="p-2 bg-blue-500/80 text-gray-900 rounded hover:bg-blue-500" title="Copy URL"><Copy size={16} /></button>
                <button onClick={() => deleteImage(img.id)} className="p-2 bg-red-500/80 text-gray-900 rounded hover:bg-red-500" title="Delete"><Trash2 size={16} /></button>
              </div>
              <div>
                <p className="text-xs text-[#800000] font-bold uppercase">{img.category}</p>
                <p className="text-gray-900 font-semibold truncate">{img.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-black/5 rounded-xl w-full max-w-md">
            <div className="p-6 border-b border-black/5 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Add to Gallery</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-600 hover:text-gray-900"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Title</label>
                <input required className="w-full bg-[#F9F6F0] border border-black/5 rounded p-2 text-gray-900" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Category</label>
                <input required className="w-full bg-[#F9F6F0] border border-black/5 rounded p-2 text-gray-900" value={form.category} onChange={e => setForm({...form, category: e.target.value})} placeholder="e.g. Wedding, Venue, Food" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Image Upload</label>
                <div className="flex gap-2">
                  <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-[#FFFFFF] border border-[#800000] text-[#800000] px-4 py-2 rounded flex items-center gap-2 hover:bg-[#800000]/10">
                    <UploadCloud size={18} /> {uploading ? 'Uploading...' : 'Choose File'}
                  </button>
                  <input required className="flex-1 bg-[#F9F6F0] border border-black/5 rounded p-2 text-gray-900 text-sm" value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} placeholder="Or paste URL here" />
                </div>
              </div>
              <button type="submit" disabled={uploading} className="w-full bg-[#800000] text-white font-bold py-3 rounded-lg hover:bg-[#9B111E] disabled:opacity-50">
                Save Image
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
