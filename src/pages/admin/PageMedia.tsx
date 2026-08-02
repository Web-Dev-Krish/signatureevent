import { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, X, UploadCloud, Image as ImageIcon, Video } from 'lucide-react';

const PAGES = [
  { slug: 'birthday-mankameshwar', name: 'Birthday Mankameshwar' },
  { slug: 'pool-vatika', name: 'Pool Vatika' }
];

export default function PageMedia() {
  const [selectedPage, setSelectedPage] = useState(PAGES[0].slug);
  const [pageMedia, setPageMedia] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [mediaForm, setMediaForm] = useState({
    media_type: 'image',
    media_url: '',
    thumbnail_url: '',
    caption: '',
    display_order: 0
  });

  const fetchPageMedia = async (pageSlug: string) => {
    const res = await fetch(`/api/page-media?page_slug=${pageSlug}`);
    const data = await res.json();
    setPageMedia(data || []);
  };

  useEffect(() => {
    fetchPageMedia(selectedPage);
  }, [selectedPage]);

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
    await fetch('/api/page-media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...mediaForm, page_slug: selectedPage })
    });
    setMediaForm({ media_type: 'image', media_url: '', thumbnail_url: '', caption: '', display_order: 0 });
    fetchPageMedia(selectedPage);
  };

  const deleteMedia = async (id: number) => {
    if (!confirm('Delete this media?')) return;
    await fetch('/api/page-media', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    fetchPageMedia(selectedPage);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-slate-900">Manage Page Media</h1>
      </div>

      <div className="bg-[#FFFFFF] border border-slate-200 rounded-xl p-6">
        <label className="block text-sm text-slate-600 mb-2">Select Page</label>
        <select
          className="w-full bg-[#FAFAFA] border border-slate-200 rounded p-3 text-slate-900"
          value={selectedPage}
          onChange={(e) => setSelectedPage(e.target.value)}
        >
          {PAGES.map(page => (
            <option key={page.slug} value={page.slug}>{page.name}</option>
          ))}
        </select>
      </div>

      <div className="bg-[#FFFFFF] border border-slate-200 rounded-xl p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Add New Media</h2>
        <form onSubmit={handleMediaSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-600 mb-1">Media Type</label>
              <select className="w-full bg-[#FAFAFA] border border-slate-200 rounded p-2 text-slate-900" value={mediaForm.media_type} onChange={e => setMediaForm({...mediaForm, media_type: e.target.value})}>
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Display Order</label>
              <input type="number" className="w-full bg-[#FAFAFA] border border-slate-200 rounded p-2 text-slate-900" value={mediaForm.display_order} onChange={e => setMediaForm({...mediaForm, display_order: parseInt(e.target.value)})} />
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Media Upload</label>
            <div className="flex gap-2">
              <input type="file" accept={mediaForm.media_type === 'image' ? 'image/*' : 'video/*'} className="hidden" ref={fileInputRef} onChange={handleFileChange} />
              <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-[#FFFFFF] border border-[#D4AF37] text-[#D4AF37] px-4 py-2 rounded flex items-center gap-2 hover:bg-[#D4AF37]/10">
                <UploadCloud size={18} /> {uploading ? 'Uploading...' : 'Choose File'}
              </button>
              <input required className="flex-1 bg-[#FAFAFA] border border-slate-200 rounded p-2 text-slate-900 text-sm" value={mediaForm.media_url} onChange={e => setMediaForm({...mediaForm, media_url: e.target.value})} placeholder="Or paste URL here" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Thumbnail URL (for videos)</label>
            <input className="w-full bg-[#FAFAFA] border border-slate-200 rounded p-2 text-slate-900" value={mediaForm.thumbnail_url} onChange={e => setMediaForm({...mediaForm, thumbnail_url: e.target.value})} placeholder="Optional thumbnail for videos" />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Caption</label>
            <input className="w-full bg-[#FAFAFA] border border-slate-200 rounded p-2 text-slate-900" value={mediaForm.caption} onChange={e => setMediaForm({...mediaForm, caption: e.target.value})} placeholder="Optional caption" />
          </div>
          <button type="submit" disabled={uploading} className="w-full bg-[#D4AF37] text-white font-bold py-3 rounded-lg hover:bg-[#F3E5AB] disabled:opacity-50">
            Add Media
          </button>
        </form>
      </div>

      <div className="bg-[#FFFFFF] border border-slate-200 rounded-xl p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Current Media</h2>
        {pageMedia.length === 0 ? (
          <p className="text-slate-600 text-center py-8">No media uploaded yet</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pageMedia.map(media => (
              <div key={media.id} className="group relative rounded-xl overflow-hidden bg-[#FAFAFA] border border-slate-200">
                {media.media_type === 'image' ? (
                  <img src={media.media_url} alt={media.caption || 'Media'} className="w-full h-40 object-cover" />
                ) : (
                  <div className="w-full h-40 flex items-center justify-center bg-[#FAFAFA]">
                    <Video size={32} className="text-[#D4AF37]" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button onClick={() => deleteMedia(media.id)} className="p-2 bg-red-500/80 text-slate-900 rounded hover:bg-red-500"><Trash2 size={16} /></button>
                </div>
                <div className="p-2">
                  <p className="text-xs text-slate-600 truncate">{media.caption || 'No caption'}</p>
                  <p className="text-xs text-slate-600">Order: {media.display_order}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
