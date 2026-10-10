import { useState } from 'react';
import { PenLine, Send, Heart, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

export default function FriendPage({ authInfo, onLogout }) {
  const [newAuthor, setNewAuthor] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [status, setStatus] = useState('');

  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const handleWishSubmit = async (e) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newMessage.trim()) return;

    setStatus('Sending...');

    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authInfo.token}`
        },
        body: JSON.stringify({ author: newAuthor.trim(), message: newMessage.trim() }),
      });

      if (!res.ok) throw new Error('Failed to send wish');

      setStatus('Success! ❤️');
      setNewAuthor('');
      setNewMessage('');

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
      
      setTimeout(() => setStatus(''), 3000);
    } catch (err) {
      setStatus('Error sending wish');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-midnight via-darkteal to-midnight text-center relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute top-10 left-10 w-80 h-80 bg-softpink/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-rosegold/15 rounded-full blur-[100px] animate-pulse-glow"></div>
      </div>

      <button onClick={handleLogout} className="absolute top-6 right-6 px-4 py-2 rounded-full glass-panel border border-white/10 text-warmwhite/70 hover:text-softpink text-xs uppercase tracking-widest flex items-center gap-2 z-20">
        <LogOut className="w-3.5 h-3.5" /> Logout
      </button>

      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-softpink/20 shadow-glass relative z-10 w-full max-w-xl animate-fadeInUp text-left">
        <div className="text-center mb-8">
          <Heart className="w-10 h-10 text-softpink fill-softpink/20 mx-auto mb-4 animate-pulse" />
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-warmwhite mb-2">Send Your Birthday Wish</h1>
          <p className="text-warmwhite/70 text-sm">Write a sweet note for the birthday girl.</p>
        </div>

        <form onSubmit={handleWishSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-warmwhite/70 mb-1.5 font-medium">Your Name</label>
            <input 
              type="text" 
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              required 
              placeholder="e.g. Maya, Lucas, Aunt Elena" 
              className="w-full px-4 py-3 rounded-xl bg-midnight/60 border border-white/10 text-warmwhite placeholder-white/30 focus:outline-none focus:border-softpink focus:ring-1 focus:ring-softpink text-sm"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-warmwhite/70 mb-1.5 font-medium">Birthday Wish</label>
            <textarea 
              rows="5" 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              required 
              placeholder="Write your heartfelt message here..." 
              className="w-full px-4 py-3 rounded-xl bg-midnight/60 border border-white/10 text-warmwhite placeholder-white/30 focus:outline-none focus:border-softpink focus:ring-1 focus:ring-softpink text-sm"
            ></textarea>
          </div>
          <div className="pt-2 flex items-center justify-between">
            <span className={`text-sm font-medium ${status.includes('Error') ? 'text-red-400' : 'text-softpink'}`}>{status}</span>
            <button type="submit" disabled={status === 'Sending...'} className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-softpink to-rosegold text-midnight font-bold text-sm tracking-wider hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
              <span>Send Birthday Wish ❤️</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
