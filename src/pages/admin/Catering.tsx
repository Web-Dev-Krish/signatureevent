import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Utensils, Package } from 'lucide-react';

export default function Catering() {
  const [activeTab, setActiveTab] = useState<'menu' | 'packages'>('menu');
  
  const [items, setItems] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [itemForm, setItemForm] = useState({ name: '', category: '', type: 'Veg', image_url: '' });
  const [packageForm, setPackageForm] = useState({ name: '', price: '', description: '', features: '', image_url: '' });

  const fetchData = async () => {
    setLoading(true);
    const [itemsRes, packagesRes] = await Promise.all([
      fetch('/api/catering'),
      fetch('/api/catering-packages')
    ]);
    const iData = await itemsRes.json();
    const pData = await packagesRes.json();
    setItems(iData || []);
    setPackages(pData || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleItemSubmit = async (e: any) => {
    e.preventDefault();
    if (editingId) {
      await fetch('/api/catering', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editingId, ...itemForm }) });
    } else {
      await fetch('/api/catering', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(itemForm) });
    }
    setIsItemModalOpen(false);
    fetchData();
  };

  const handlePackageSubmit = async (e: any) => {
    e.preventDefault();
    const payload = {
      ...packageForm,
      price: parseFloat(packageForm.price),
      features: packageForm.features.split('\n').filter(f => f.trim() !== '')
    };

    if (editingId) {
      await fetch('/api/catering-packages', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editingId, ...payload }) });
    } else {
      await fetch('/api/catering-packages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    }
    setIsPackageModalOpen(false);
    fetchData();
  };

  const deleteItem = async (id: number) => {
    if (!confirm('Delete this dish?')) return;
    await fetch('/api/catering', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    fetchData();
  };

  const deletePackage = async (id: number) => {
    if (!confirm('Delete this package?')) return;
    await fetch('/api/catering-packages', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    fetchData();
  };

  const openItemModal = (v?: any) => {
    if (v) {
      setItemForm({ name: v.name, category: v.category, type: v.type, image_url: v.image_url });
      setEditingId(v.id);
    } else {
      setItemForm({ name: '', category: '', type: 'Veg', image_url: '' });
      setEditingId(null);
    }
    setIsItemModalOpen(true);
  };

  const openPackageModal = (v?: any) => {
    if (v) {
      setPackageForm({ 
        name: v.name, 
        price: v.price.toString(), 
        description: v.description || '', 
        features: (v.features || []).join('\n'), 
        image_url: v.image_url || '' 
      });
      setEditingId(v.id);
    } else {
      setPackageForm({ name: '', price: '', description: '', features: '', image_url: '' });
      setEditingId(null);
    }
    setIsPackageModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-slate-900">Catering Management</h1>
        <div className="flex bg-[#FFFFFF] rounded-lg p-1 border border-slate-200">
          <button 
            onClick={() => setActiveTab('menu')}
            className={`px-4 py-2 rounded-md font-semibold flex items-center gap-2 transition-colors ${activeTab === 'menu' ? 'bg-[#D4AF37] text-white' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <Utensils size={18} /> Menu
          </button>
          <button 
            onClick={() => setActiveTab('packages')}
            className={`px-4 py-2 rounded-md font-semibold flex items-center gap-2 transition-colors ${activeTab === 'packages' ? 'bg-[#D4AF37] text-white' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <Package size={18} /> Packages
          </button>
        </div>
      </div>

      {activeTab === 'menu' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button onClick={() => openItemModal()} className="bg-[#D4AF37] text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#F3E5AB]">
              <Plus size={18} /> Add Dish
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading ? <p className="text-slate-600">Loading...</p> : items.map(v => (
              <div key={v.id} className="bg-[#FFFFFF] border border-slate-200 rounded-xl overflow-hidden group">
                <div className="relative h-40">
                  <img src={v.image_url} alt={v.name} className="w-full h-full object-cover" />
                  <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${v.type === 'Veg' ? 'bg-green-500' : 'bg-red-500'}`} />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-slate-900 truncate">{v.name}</h3>
                  <p className="text-xs text-slate-600 mb-3">{v.category}</p>
                  <div className="flex justify-end gap-2">
                    <button onClick={() => openItemModal(v)} className="p-1.5 text-slate-600 hover:text-slate-900 bg-slate-50 rounded"><Edit2 size={14} /></button>
                    <button onClick={() => deleteItem(v.id)} className="p-1.5 text-red-400 hover:text-red-300 bg-red-500/10 rounded"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'packages' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button onClick={() => openPackageModal()} className="bg-[#D4AF37] text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#F3E5AB]">
              <Plus size={18} /> Add Package
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? <p className="text-slate-600">Loading...</p> : packages.map(pkg => (
              <div key={pkg.id} className="bg-[#FFFFFF] border border-slate-200 rounded-xl overflow-hidden flex flex-col">
                {pkg.image_url && <img src={pkg.image_url} alt={pkg.name} className="w-full h-40 object-cover" />}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{pkg.name}</h3>
                  <p className="text-2xl font-serif text-[#D4AF37] mb-4">₹{pkg.price}</p>
                  <p className="text-sm text-slate-600 mb-4">{pkg.description}</p>
                  
                  <div className="mt-auto pt-4 border-t border-slate-200 flex justify-end gap-2">
                    <button onClick={() => openPackageModal(pkg)} className="p-2 text-slate-600 hover:text-slate-900 bg-slate-50 rounded"><Edit2 size={16} /></button>
                    <button onClick={() => deletePackage(pkg.id)} className="p-2 text-red-400 hover:text-red-300 bg-red-500/10 rounded"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Item Modal */}
      {isItemModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-slate-200 rounded-xl w-full max-w-lg">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">{editingId ? 'Edit Dish' : 'Add Dish'}</h2>
              <button onClick={() => setIsItemModalOpen(false)} className="text-slate-600 hover:text-slate-900"><X size={24} /></button>
            </div>
            <form onSubmit={handleItemSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-slate-600 mb-1">Dish Name</label>
                <input required className="w-full bg-[#FAFAFA] border border-slate-200 rounded p-2 text-slate-900" value={itemForm.name} onChange={e => setItemForm({...itemForm, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Category (e.g. Indian)</label>
                  <input required className="w-full bg-[#FAFAFA] border border-slate-200 rounded p-2 text-slate-900" value={itemForm.category} onChange={e => setItemForm({...itemForm, category: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Type</label>
                  <select className="w-full bg-[#FAFAFA] border border-slate-200 rounded p-2 text-slate-900" value={itemForm.type} onChange={e => setItemForm({...itemForm, type: e.target.value})}>
                    <option value="Veg">Veg</option>
                    <option value="Non-Veg">Non-Veg</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">Image URL</label>
                <input required className="w-full bg-[#FAFAFA] border border-slate-200 rounded p-2 text-slate-900" value={itemForm.image_url} onChange={e => setItemForm({...itemForm, image_url: e.target.value})} />
              </div>
              <button type="submit" className="w-full bg-[#D4AF37] text-white font-bold py-3 rounded-lg hover:bg-[#F3E5AB]">
                {editingId ? 'Update Dish' : 'Add Dish'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Package Modal */}
      {isPackageModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-slate-200 rounded-xl w-full max-w-2xl">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">{editingId ? 'Edit Package' : 'Add Package'}</h2>
              <button onClick={() => setIsPackageModalOpen(false)} className="text-slate-600 hover:text-slate-900"><X size={24} /></button>
            </div>
            <form onSubmit={handlePackageSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Package Name (e.g. Silver Package (Veg))</label>
                  <input required className="w-full bg-[#FAFAFA] border border-slate-200 rounded p-2 text-slate-900" value={packageForm.name} onChange={e => setPackageForm({...packageForm, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Price</label>
                  <input required type="number" className="w-full bg-[#FAFAFA] border border-slate-200 rounded p-2 text-slate-900" value={packageForm.price} onChange={e => setPackageForm({...packageForm, price: e.target.value})} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-slate-600 mb-1">Description (Optional)</label>
                  <input className="w-full bg-[#FAFAFA] border border-slate-200 rounded p-2 text-slate-900" value={packageForm.description} onChange={e => setPackageForm({...packageForm, description: e.target.value})} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-slate-600 mb-1">Features (One per line)</label>
                  <textarea required rows={4} className="w-full bg-[#FAFAFA] border border-slate-200 rounded p-2 text-slate-900" value={packageForm.features} onChange={e => setPackageForm({...packageForm, features: e.target.value})} placeholder="Feature 1&#10;Feature 2&#10;Feature 3" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-slate-600 mb-1">Image URL (Optional)</label>
                  <input className="w-full bg-[#FAFAFA] border border-slate-200 rounded p-2 text-slate-900" value={packageForm.image_url} onChange={e => setPackageForm({...packageForm, image_url: e.target.value})} />
                </div>
              </div>
              <button type="submit" className="w-full bg-[#D4AF37] text-white font-bold py-3 rounded-lg hover:bg-[#F3E5AB]">
                {editingId ? 'Update Package' : 'Add Package'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
