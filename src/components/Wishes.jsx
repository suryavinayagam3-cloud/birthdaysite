import { useState, useEffect } from 'react';
import { PenLine, Send, Search, User, Heart, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Wishes({ authInfo }) {
  const [wishes, setWishes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newMessage, setNewMessage] = useState('');
  
  // For custom confirmation dialog
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    try {
      const res = await fetch('/api/wishes', {
        headers: {
          'Authorization': `Bearer ${authInfo?.token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setWishes(data);
      }
    } catch (err) {
      console.error("Failed to fetch wishes", err);
    }
  };

  const handleWishSubmit = async (e) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newMessage.trim()) return;

    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authInfo?.token}`
        },
        body: JSON.stringify({ author: newAuthor.trim(), message: newMessage.trim() }),
      });
      
      if (res.ok) {
        const newWish = await res.json();
        setWishes([newWish, ...wishes]);
        setNewAuthor('');
        setNewMessage('');

        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    } catch (err) {
      console.error("Failed to send wish", err);
    }
  };

  const confirmDelete = (id) => {
    setDeletingId(id);
  };

  const executeDelete = async () => {
    if (!deletingId) return;

    try {
      const res = await fetch(`/api/wishes/${deletingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authInfo?.token}`
        }
      });

      if (res.ok) {
        setWishes(wishes.filter(w => w.id !== deletingId));
        setDeletingId(null);
        // Small success message visually or just toast, for now just ui update is fast
        // The instructions say "Show a small success message: 'Birthday wish deleted ❤️'"
        // We'll show a temporary toast
        showToast("Birthday wish deleted ❤️");
      } else {
        console.error("Failed to delete wish");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const cancelDelete = () => {
    setDeletingId(null);
  };

  const [toastMessage, setToastMessage] = useState('');
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const filteredWishes = wishes.filter(wish => 
    wish.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const canDelete = authInfo?.role === 'CREATOR' || authInfo?.role === 'GIRLFRIEND';

  return (
    <section id="wishes" className="py-20 px-6 max-w-6xl mx-auto relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-midnight/90 text-softpink font-medium text-sm rounded-full border border-softpink/30 shadow-glow-pink animate-fadeInUp">
          {toastMessage}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 bg-midnight/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeInUp">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-softpink/30 shadow-glass text-center max-w-sm w-full">
            <Trash2 className="w-10 h-10 text-rosegold mx-auto mb-4" />
            <h3 className="text-xl font-serif font-bold text-warmwhite mb-2">Delete Wish?</h3>
            <p className="text-sm text-warmwhite/70 mb-6">Are you sure you want to delete this birthday wish?</p>
            <div className="flex justify-center gap-4">
              <button onClick={cancelDelete} className="px-5 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-warmwhite/80 text-sm transition-all">
                Cancel
              </button>
              <button onClick={executeDelete} className="px-5 py-2 rounded-lg bg-rosegold/20 border border-rosegold text-rosegold hover:bg-rosegold hover:text-midnight text-sm transition-all">
                Delete Wish
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-center space-y-3 mb-14">
        <span className="text-rosegold uppercase tracking-[0.25em] text-xs font-semibold">Community of Love</span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-warmwhite">
          Messages From Her Friends 💌
        </h2>
        <p className="text-warmwhite/70 max-w-md mx-auto text-sm sm:text-base font-sans">
          Leave a sweet note or read through the love sent from friends and family.
        </p>
      </div>

      {/* Add Wish Form */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-softpink/20 max-w-2xl mx-auto mb-14 shadow-glass">
        <h3 className="font-serif text-xl font-bold text-warmwhite mb-4 flex items-center gap-2">
          <span>Leave Your Birthday Wish</span>
          <PenLine className="w-4 h-4 text-softpink" />
        </h3>
        
        <form onSubmit={handleWishSubmit} className="space-y-4">
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
              rows="3" 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              required 
              placeholder="Write your heartfelt message here..." 
              className="w-full px-4 py-3 rounded-xl bg-midnight/60 border border-white/10 text-warmwhite placeholder-white/30 focus:outline-none focus:border-softpink focus:ring-1 focus:ring-softpink text-sm"
            ></textarea>
          </div>
          <button type="submit" className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-softpink to-rosegold text-midnight font-bold text-sm tracking-wider hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2">
            <span>Send Birthday Wish ❤️</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Search / Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto mb-8">
        <p className="text-xs uppercase tracking-widest text-warmwhite/60 font-semibold">
          Showing <span>{filteredWishes.length}</span> Lovely Notes
        </p>
        <div className="relative w-full sm:w-64">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by friend name..." 
            className="w-full pl-9 pr-4 py-2 rounded-full glass-panel border border-white/10 text-xs text-warmwhite placeholder-white/40 focus:outline-none focus:border-softpink"
          />
          <Search className="w-3.5 h-3.5 text-warmwhite/40 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Wishes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {filteredWishes.map((wish, index) => (
          <div key={index} className="wish-item glass-card p-6 rounded-2xl border border-white/10 hover:border-softpink/30 transition-all flex flex-col justify-between animate-float-slow group relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-softpink flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>{wish.author}</span>
                </span>
                <span className="text-[10px] text-warmwhite/40">{wish.time}</span>
              </div>
              <p className="text-sm text-warmwhite/80 font-sans leading-relaxed">
                "{wish.message}"
              </p>
            </div>
            
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
              {canDelete ? (
                <button 
                  onClick={() => confirmDelete(wish.id)}
                  className="flex items-center gap-1.5 text-xs font-medium text-warmwhite/30 hover:text-rosegold transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete 🗑️
                </button>
              ) : (
                <div></div>
              )}
              <Heart className="w-4 h-4 fill-softpink/20 text-softpink/50" />
            </div>
          </div>
        ))}
        {filteredWishes.length === 0 && (
          <div className="col-span-full text-center text-warmwhite/50 py-10">
            No wishes found.
          </div>
        )}
      </div>
    </section>
  );
}
