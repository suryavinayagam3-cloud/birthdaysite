
import { useState } from 'react';
import { Heart, Send, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

export default function FriendPage({ authInfo, onLogout }) {
  const [newAuthor, setNewAuthor] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const handleWishSubmit = async (e) => {
    e.preventDefault();

    const author = newAuthor.trim();
    const message = newMessage.trim();

    if (!author || !message) {
      setStatus('Please enter your name and birthday wish.');
      return;
    }

    if (!authInfo?.token) {
      setStatus('Please log in again to send your wish.');
      return;
    }

    setSubmitting(true);
    setStatus('Sending...');

    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authInfo.token}`,
        },
        body: JSON.stringify({ author, message }),
      });

      if (!res.ok) {
        const details = await res.text();
        console.error(
          'Failed to send wish:',
          res.status,
          details
        );

        if (res.status === 401) {
          setStatus('Session expired. Please log in again.');
        } else if (res.status === 403) {
          setStatus('You do not have permission to send a wish.');
        } else {
          setStatus('Could not send your wish. Please try again.');
        }

        return;
      }

      setStatus('Success! Your wish has been sent ❤️');
      setNewAuthor('');
      setNewMessage('');

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });

      setTimeout(() => setStatus(''), 3000);
    } catch (err) {
      console.error('Error sending birthday wish:', err);
      setStatus('Server connection failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const isError =
    status.toLowerCase().includes('error') ||
    status.toLowerCase().includes('failed') ||
    status.toLowerCase().includes('expired') ||
    status.toLowerCase().includes('permission') ||
    status.toLowerCase().includes('could not') ||
    status.toLowerCase().includes('please enter');

  return (
    <section className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-midnight via-darkteal to-midnight text-center relative overflow-hidden">
      {/* Background ambience */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute top-10 left-10 w-80 h-80 bg-softpink/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-rosegold/15 rounded-full blur-[100px] animate-pulse-glow" />
      </div>

      {/* Logout */}
      <button
        type="button"
        onClick={handleLogout}
        className="absolute top-6 right-6 px-4 py-2 rounded-full glass-panel border border-white/10 text-warmwhite/70 hover:text-softpink text-xs uppercase tracking-widest flex items-center gap-2 z-20"
      >
        <LogOut className="w-3.5 h-3.5" />
        Logout
      </button>

      {/* Birthday wish form */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-softpink/20 shadow-glass relative z-10 w-full max-w-xl animate-fadeInUp text-left">
        <div className="text-center mb-8">
          <Heart className="w-10 h-10 text-softpink fill-softpink/20 mx-auto mb-4 animate-pulse" />

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-warmwhite mb-2">
            Send Your Birthday Wish
          </h1>

          <p className="text-warmwhite/70 text-sm">
            Write a sweet note for the birthday girl.
          </p>
        </div>

        <form onSubmit={handleWishSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="friend-author"
              className="block text-xs uppercase tracking-wider text-warmwhite/70 mb-1.5 font-medium"
            >
              Your Name
            </label>

            <input
              id="friend-author"
              type="text"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              required
              maxLength={80}
              autoComplete="name"
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl bg-midnight/60 border border-white/10 text-warmwhite placeholder-white/30 focus:outline-none focus:border-softpink focus:ring-1 focus:ring-softpink text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="friend-message"
              className="block text-xs uppercase tracking-wider text-warmwhite/70 mb-1.5 font-medium"
            >
              Birthday Wish
            </label>

            <textarea
              id="friend-message"
              rows={5}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              required
              maxLength={2000}
              placeholder="Write your heartfelt message here..."
              className="w-full px-4 py-3 rounded-xl bg-midnight/60 border border-white/10 text-warmwhite placeholder-white/30 focus:outline-none focus:border-softpink focus:ring-1 focus:ring-softpink text-sm resize-y"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p
              role="status"
              aria-live="polite"
              className={`text-sm font-medium ${
                isError ? 'text-red-400' : 'text-softpink'
              }`}
            >
              {status}
            </p>

            <button
              type="submit"
              disabled={submitting || !authInfo?.token}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-softpink to-rosegold text-midnight font-bold text-sm tracking-wider hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>
                {submitting ? 'Sending...' : 'Send Birthday Wish ❤️'}
              </span>
              <Send className="w-4 h-4" />
            </button>
          </div>

          {!authInfo?.token && (
            <p className="text-xs text-rosegold text-center">
              Your login session is missing. Please log in again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
