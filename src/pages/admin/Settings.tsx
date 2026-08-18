import { useState, useEffect } from 'react';
import { Save, Check } from 'lucide-react';

export default function Settings() {
  const [venueLimit, setVenueLimit] = useState<string>('5');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedLimit = localStorage.getItem('homepage_venue_limit');
    if (savedLimit) {
      setVenueLimit(savedLimit);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('homepage_venue_limit', venueLimit);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">Website Settings</h1>
        <p className="text-slate-600">Manage your brand identity, venue display preferences, and SEO metadata.</p>
      </div>

      {/* Venue Display Controls */}
      <div className="bg-[#FFFFFF] border border-slate-200 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-4">Homepage Venue Controls</h2>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Default Number of Venues Displayed on Homepage
          </label>
          <p className="text-xs text-slate-500 mb-4">
            Select how many preview venues visitors see by default when opening the homepage. Visitors can also adjust this live on the page.
          </p>
          <div className="flex flex-wrap gap-3">
            {['3', '4', '5', '6', 'all'].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setVenueLimit(val)}
                className={`px-5 py-2.5 rounded-lg border font-bold text-sm transition-all ${
                  venueLimit === val
                    ? 'bg-[#D4AF37] text-white border-[#D4AF37] shadow-sm'
                    : 'bg-[#FAFAFA] text-slate-700 border-slate-200 hover:border-[#D4AF37]'
                }`}
              >
                {val === 'all' ? 'All Venues' : `${val} Venues`}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#FFFFFF] border border-slate-200 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-4">Brand Details</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Company Name</label>
            <input defaultValue="Malhotra Events" className="w-full bg-[#FAFAFA] border border-slate-200 rounded p-3 text-slate-900" />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Logo URL (Light)</label>
            <input defaultValue="/logo-light.svg" className="w-full bg-[#FAFAFA] border border-slate-200 rounded p-3 text-slate-900" />
          </div>
        </div>
      </div>

      <div className="bg-[#FFFFFF] border border-slate-200 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-4">Contact Information</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Support Email</label>
            <input defaultValue="contact@malhotraevents.com" className="w-full bg-[#FAFAFA] border border-slate-200 rounded p-3 text-slate-900" />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Phone Number</label>
            <input defaultValue="+91 98765 43210" className="w-full bg-[#FAFAFA] border border-slate-200 rounded p-3 text-slate-900" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm text-slate-600 mb-1">Office Address</label>
            <input defaultValue="123 Luxury Avenue, Golden Estate, New Delhi, India 110001" className="w-full bg-[#FAFAFA] border border-slate-200 rounded p-3 text-slate-900" />
          </div>
        </div>
      </div>

      <div className="bg-[#FFFFFF] border border-slate-200 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-4">SEO Metadata</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Global Meta Title</label>
            <input defaultValue="Malhotra Events | Luxury Event Organizers" className="w-full bg-[#FAFAFA] border border-slate-200 rounded p-3 text-slate-900" />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Global Meta Description</label>
            <textarea rows={3} defaultValue="Crafting golden moments and timeless celebrations with premium luxury event organizing and catering services." className="w-full bg-[#FAFAFA] border border-slate-200 rounded p-3 text-slate-900" />
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center gap-4">
        {saved && (
          <span className="text-emerald-600 text-sm font-semibold flex items-center gap-1">
            <Check size={18} /> Settings Saved Successfully!
          </span>
        )}
        <button onClick={handleSave} className="bg-[#D4AF37] text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-[#b8952b] transition-colors">
          <Save size={20} /> Save Changes
        </button>
      </div>
    </div>
  );
}
