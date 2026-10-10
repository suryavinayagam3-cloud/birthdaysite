import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, KeyRound } from 'lucide-react';

export default function Login({ setAuthInfo }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('birthday_token', data.token);
      localStorage.setItem('birthday_role', data.role);
      setAuthInfo({ token: data.token, role: data.role });

      if (data.role === 'FRIEND') {
        navigate('/friend');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-midnight via-darkteal to-midnight text-center relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-softpink/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blueteal/30 rounded-full blur-[120px] animate-float-reverse"></div>
      </div>

      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-softpink/30 shadow-glass relative z-10 w-full max-w-md animate-fadeInUp">
        <div className="w-16 h-16 mx-auto rounded-full bg-softpink/15 border border-softpink/40 flex items-center justify-center text-softpink mb-6">
          <KeyRound className="w-8 h-8" />
        </div>

        <h1 className="font-serif text-3xl font-bold text-warmwhite mb-2">Welcome</h1>
        <p className="text-warmwhite/70 text-sm mb-8">Please select your access level</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-warmwhite/70 mb-2 font-medium text-left">Access Code</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your secret code..."
              className="w-full px-4 py-3 rounded-xl bg-midnight/60 border border-white/10 text-warmwhite placeholder-white/30 focus:outline-none focus:border-softpink"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button type="submit" className="w-full pt-2">
            <div className="group relative w-full px-8 py-3 rounded-full bg-gradient-to-r from-softpink to-rosegold text-midnight font-bold text-sm tracking-wider hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2">
              <span>Enter Portal</span>
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </div>
          </button>
        </form>
        
        <div className="mt-8 text-[10px] text-warmwhite/30 uppercase tracking-widest">
          A Private Birthday Sanctuary
        </div>
      </div>
    </section>
  );
}
