import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Lock } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#800000]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#800000]/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-md w-full glass p-8 rounded-2xl border border-[#800000]/30 relative z-10 shadow-2xl shadow-black">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#FFFFFF] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#800000]/50 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <Lock className="text-[#800000]" size={28} />
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2 tracking-wide">Admin Portal</h1>
          <p className="text-gray-600 text-sm">Secure access for Malhotra Events</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-600 mb-2 font-medium">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full bg-[#FFFFFF] border border-black/5 rounded-lg p-3.5 text-gray-900 focus:border-[#800000] outline-none transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@malhotraevents.com"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2 font-medium">Password</label>
            <input 
              type="password" 
              required
              className="w-full bg-[#FFFFFF] border border-black/5 rounded-lg p-3.5 text-gray-900 focus:border-[#800000] outline-none transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#800000] to-[#9B111E] text-white font-bold py-3.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 uppercase tracking-widest text-sm mt-4"
          >
            {loading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
