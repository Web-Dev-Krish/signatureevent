import { Save } from 'lucide-react';

export default function Settings() {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Website Settings</h1>
        <p className="text-gray-600">Manage your brand identity, contact details, and SEO metadata.</p>
      </div>

      <div className="bg-[#FFFFFF] border border-black/5 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-bold text-gray-900 border-b border-black/5 pb-4">Brand Details</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Company Name</label>
            <input defaultValue="Malhotra Events" className="w-full bg-[#F9F6F0] border border-black/5 rounded p-3 text-gray-900" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Logo URL (Light)</label>
            <input defaultValue="/logo-light.svg" className="w-full bg-[#F9F6F0] border border-black/5 rounded p-3 text-gray-900" />
          </div>
        </div>
      </div>

      <div className="bg-[#FFFFFF] border border-black/5 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-bold text-gray-900 border-b border-black/5 pb-4">Contact Information</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Support Email</label>
            <input defaultValue="contact@malhotraevents.com" className="w-full bg-[#F9F6F0] border border-black/5 rounded p-3 text-gray-900" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
            <input defaultValue="+91 98765 43210" className="w-full bg-[#F9F6F0] border border-black/5 rounded p-3 text-gray-900" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Office Address</label>
            <input defaultValue="123 Luxury Avenue, Golden Estate, New Delhi, India 110001" className="w-full bg-[#F9F6F0] border border-black/5 rounded p-3 text-gray-900" />
          </div>
        </div>
      </div>

      <div className="bg-[#FFFFFF] border border-black/5 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-bold text-gray-900 border-b border-black/5 pb-4">SEO Metadata</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Global Meta Title</label>
            <input defaultValue="Malhotra Events | Luxury Event Organizers" className="w-full bg-[#F9F6F0] border border-black/5 rounded p-3 text-gray-900" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Global Meta Description</label>
            <textarea rows={3} defaultValue="Crafting golden moments and timeless celebrations with premium luxury event organizing and catering services." className="w-full bg-[#F9F6F0] border border-black/5 rounded p-3 text-gray-900" />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-[#800000] text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-[#9B111E]">
          <Save size={20} /> Save Changes
        </button>
      </div>
    </div>
  );
}
