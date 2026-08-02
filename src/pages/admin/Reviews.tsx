import { useState, useEffect } from 'react';
import { Trash2, Plus, X } from 'lucide-react';

export default function Reviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5
  });

  const fetchReviews = async () => {
    const res = await fetch('/api/testimonials');
    const data = await res.json();
    setReviews(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchReviews(); }, []);

  const deleteReview = async (id: number) => {
    if (!confirm('Delete this review?')) return;
    await fetch('/api/testimonials', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    fetchReviews();
  };

  const addReview = async (e: any) => {
    e.preventDefault();
    await fetch('/api/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview)
    });
    setNewReview({ name: '', role: '', content: '', rating: 5 });
    setShowAddForm(false);
    fetchReviews();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-slate-900">Manage Reviews</h1>
        <button onClick={() => setShowAddForm(!showAddForm)} className="bg-[#D4AF37] text-white font-bold px-4 py-2 rounded-lg hover:bg-[#F3E5AB] flex items-center gap-2">
          {showAddForm ? <X size={18} /> : <Plus size={18} />}
          {showAddForm ? 'Cancel' : 'Add Review'}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-[#FFFFFF] border border-slate-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Add New Review</h2>
          <form onSubmit={addReview} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-600 mb-1">Name</label>
                <input required className="w-full bg-[#FAFAFA] border border-slate-200 rounded p-2 text-slate-900" value={newReview.name} onChange={e => setNewReview({...newReview, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">Role</label>
                <input required className="w-full bg-[#FAFAFA] border border-slate-200 rounded p-2 text-slate-900" value={newReview.role} onChange={e => setNewReview({...newReview, role: e.target.value})} />
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Rating</label>
              <select className="w-full bg-[#FAFAFA] border border-slate-200 rounded p-2 text-slate-900" value={newReview.rating} onChange={e => setNewReview({...newReview, rating: parseInt(e.target.value)})}>
                {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{'★'.repeat(r)}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Review Content</label>
              <textarea required className="w-full bg-[#FAFAFA] border border-slate-200 rounded p-2 text-slate-900 h-24" value={newReview.content} onChange={e => setNewReview({...newReview, content: e.target.value})} />
            </div>
            <button type="submit" className="w-full bg-[#D4AF37] text-white font-bold py-3 rounded-lg hover:bg-[#F3E5AB]">
              Add Review
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? <p className="text-slate-600">Loading...</p> : reviews.map(r => (
          <div key={r.id} className="bg-[#FFFFFF] border border-slate-200 rounded-xl p-6 relative">
            <button onClick={() => deleteReview(r.id)} className="absolute top-4 right-4 text-slate-600 hover:text-red-500">
              <Trash2 size={18} />
            </button>
            <div className="flex text-[#D4AF37] mb-3">
              {[...Array(r.rating)].map((_, i) => <span key={i}>★</span>)}
            </div>
            <p className="text-slate-600 italic mb-4 text-sm">"{r.content}"</p>
            <h4 className="text-slate-900 font-semibold">{r.name}</h4>
            <p className="text-xs text-slate-600">{r.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
