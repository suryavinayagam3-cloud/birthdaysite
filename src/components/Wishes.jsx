
import { useState, useEffect } from 'react';
import {
  PenLine,
  Send,
  Search,
  User,
  Heart,
  Trash2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Wishes({ authInfo }) {
  const [wishes, setWishes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Display a temporary notification.
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Load wishes when the authentication token becomes available.
  useEffect(() => {
    if (!authInfo?.token) {
      setWishes([]);
      return;
    }

    const controller = new AbortController();

    const fetchWishes = async () => {
      setLoading(true);
      setErrorMessage('');

      try {
        const res = await fetch('/api/wishes', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authInfo.token}`,
          },
          signal: controller.signal,
        });

        if (!res.ok) {
          const details = await res.text();
          console.error(
            'Failed to load wishes:',
            res.status,
            details
          );

          setErrorMessage(
            res.status === 401
              ? 'Your session has expired. Please log in again.'
              : 'Could not load birthday wishes. Please try again.'
          );
          return;
        }

        const data = await res.json();

        setWishes(
          Array.isArray(data)
            ? data.map((wish) => ({
                ...wish,
                id: wish.id,
              }))
            : []
        );
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Failed to fetch wishes:', err);
          setErrorMessage(
            'Unable to connect to the server. Please check whether the backend is running.'
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchWishes();

    return () => controller.abort();
  }, [authInfo?.token]);

  // Submit a new birthday wish.
  const handleWishSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const author = newAuthor.trim();
    const message = newMessage.trim();

    if (!author || !message) {
      setErrorMessage('Please enter your name and birthday wish.');
      return;
    }

    if (!authInfo?.token) {
      setErrorMessage('Please log in before sending a birthday wish.');
      return;
    }

    setSubmitting(true);

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
          'Failed to save wish:',
          res.status,
          details
        );

        setErrorMessage(
          res.status === 401
            ? 'Your session has expired. Please log in again.'
            : res.status === 403
              ? 'You do not have permission to send a wish.'
              : 'Could not send your wish. Please try again.'
        );
        return;
      }

      const newWish = await res.json();

      setWishes((previous) => [
        newWish,
        ...previous.filter((wish) => wish.id !== newWish.id),
      ]);

      setNewAuthor('');
      setNewMessage('');
      showToast('Your birthday wish has been sent ❤️');

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch (err) {
      console.error('Failed to send wish:', err);
      setErrorMessage(
        'Unable to connect to the server. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Open the delete confirmation dialog.
  const confirmDelete = (id) => {
    setDeletingId(id);
  };

  const cancelDelete = () => {
    if (!deleteLoading) {
      setDeletingId(null);
    }
  };

  // Delete a wish from Firestore and update the UI.
  const executeDelete = async () => {
    if (deletingId === null || deletingId === undefined) return;

    if (!authInfo?.token) {
      setErrorMessage('Please log in again to delete a wish.');
      return;
    }

    setDeleteLoading(true);

    try {
      const res = await fetch(
        `/api/wishes/${encodeURIComponent(deletingId)}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authInfo.token}`,
          },
        }
      );

      if (!res.ok) {
        const details = await res.text();
        console.error(
          'Failed to delete wish:',
          res.status,
          details
        );

        showToast(
          res.status === 403
            ? 'You do not have permission to delete this wish.'
            : 'Could not delete the wish. Please try again.'
        );
        return;
      }

      setWishes((previous) =>
        previous.filter(
          (wish) => String(wish.id) !== String(deletingId)
        )
      );

      setDeletingId(null);
      showToast('Birthday wish deleted ❤️');
    } catch (err) {
      console.error('Failed to delete wish:', err);
      showToast('Unable to connect to the server.');
    } finally {
      setDeleteLoading(false);
    }
  };

  const canDelete =
    authInfo?.role === 'CREATOR' ||
    authInfo?.role === 'GIRLFRIEND';

  // Search wishes by the sender's name.
  const filteredWishes = wishes.filter((wish) =>
    String(wish.author || '')
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <section
      id="wishes"
      className="py-20 px-6 max-w-6xl mx-auto relative"
    >
      {/* Toast notification */}
      {toastMessage && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] px-6 py-3 bg-midnight/90 text-softpink font-medium text-sm rounded-full border border-softpink/30 shadow-glow-pink animate-fadeInUp"
        >
          {toastMessage}
        </div>
      )}

      {/* Delete confirmation dialog */}
      {deletingId !== null && deletingId !== undefined && (
        <div
          className="fixed inset-0 z-50 bg-midnight/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeInUp"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-wish-title"
        >
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-softpink/30 shadow-glass text-center max-w-sm w-full">
            <Trash2 className="w-10 h-10 text-rosegold mx-auto mb-4" />

            <h3
              id="delete-wish-title"
              className="text-xl font-serif font-bold text-warmwhite mb-2"
            >
              Delete Wish?
            </h3>

            <p className="text-sm text-warmwhite/70 mb-6">
              Are you sure you want to delete this birthday wish?
            </p>

            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={cancelDelete}
                disabled={deleteLoading}
                className="px-5 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-warmwhite/80 text-sm transition-all disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={executeDelete}
                disabled={deleteLoading}
                className="px-5 py-2 rounded-lg bg-rosegold/20 border border-rosegold text-rosegold hover:bg-rosegold hover:text-midnight text-sm transition-all disabled:opacity-50"
              >
                {deleteLoading ? 'Deleting...' : 'Delete Wish'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Section heading */}
      <div className="text-center space-y-3 mb-14">
        <span className="text-rosegold uppercase tracking-[0.25em] text-xs font-semibold">
          Community of Love
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-warmwhite">
          Messages From Her Friends 💌
        </h2>

        <p className="text-warmwhite/70 max-w-md mx-auto text-sm sm:text-base font-sans">
          Leave a sweet note or read through the love sent from
          friends and family.
        </p>
      </div>

      {/* Add wish form */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-softpink/20 max-w-2xl mx-auto mb-14 shadow-glass">
        <h3 className="font-serif text-xl font-bold text-warmwhite mb-4 flex items-center gap-2">
          <span>Leave Your Birthday Wish</span>
          <PenLine className="w-4 h-4 text-softpink" />
        </h3>

        {!authInfo?.token && (
          <p className="text-sm text-rosegold mb-4">
            Please log in to send or view birthday wishes.
          </p>
        )}

        <form onSubmit={handleWishSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="wish-author"
              className="block text-xs uppercase tracking-wider text-warmwhite/70 mb-1.5 font-medium"
            >
              Your Name
            </label>

            <input
              id="wish-author"
              type="text"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              required
              maxLength={80}
              placeholder="Enter your name"
              autoComplete="name"
              className="w-full px-4 py-3 rounded-xl bg-midnight/60 border border-white/10 text-warmwhite placeholder-white/30 focus:outline-none focus:border-softpink focus:ring-1 focus:ring-softpink text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="wish-message"
              className="block text-xs uppercase tracking-wider text-warmwhite/70 mb-1.5 font-medium"
            >
              Birthday Wish
            </label>

            <textarea
              id="wish-message"
              rows={3}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              required
              maxLength={2000}
              placeholder="Write your heartfelt message here..."
              className="w-full px-4 py-3 rounded-xl bg-midnight/60 border border-white/10 text-warmwhite placeholder-white/30 focus:outline-none focus:border-softpink focus:ring-1 focus:ring-softpink text-sm resize-y"
            />
          </div>

          {errorMessage && (
            <p
              role="alert"
              className="text-sm text-rosegold"
            >
              {errorMessage}
            </p>
          )}

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
        </form>
      </div>

      {/* Search and count */}
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
            aria-label="Search wishes by friend name"
            className="w-full pl-9 pr-4 py-2 rounded-full glass-panel border border-white/10 text-xs text-warmwhite placeholder-white/40 focus:outline-none focus:border-softpink"
          />

          <Search className="w-3.5 h-3.5 text-warmwhite/40 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Loading and connection states */}
      {loading && (
        <p className="text-center text-warmwhite/60 py-8">
          Loading birthday wishes...
        </p>
      )}

      {!loading && errorMessage && wishes.length === 0 && (
        <p className="text-center text-rosegold py-8">
          {errorMessage}
        </p>
      )}

      {/* Wishes grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {filteredWishes.map((wish) => (
            <div
              key={wish.id}
              className="wish-item glass-card p-6 rounded-2xl border border-white/10 hover:border-softpink/30 transition-all flex flex-col justify-between animate-float-slow group relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-xs font-bold text-softpink flex items-center gap-1.5 min-w-0">
                    <User className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">
                      {wish.author || 'Anonymous'}
                    </span>
                  </span>

                  <span className="text-[10px] text-warmwhite/40 shrink-0">
                    {wish.time ||
                      (wish.created_at
                        ? new Date(wish.created_at).toLocaleString()
                        : wish.createdAt
                          ? new Date(
                              typeof wish.createdAt.toDate === 'function'
                                ? wish.createdAt.toDate()
                                : wish.createdAt
                            ).toLocaleString()
                          : '')}
                  </span>
                </div>

                <p className="text-sm text-warmwhite/80 font-sans leading-relaxed whitespace-pre-wrap break-words">
                  "{wish.message}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                {canDelete ? (
                  <button
                    type="button"
                    onClick={() => confirmDelete(wish.id)}
                    className="flex items-center gap-1.5 text-xs font-medium text-warmwhite/30 hover:text-rosegold transition-colors"
                    aria-label={`Delete wish from ${wish.author}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete 🗑️
                  </button>
                ) : (
                  <div />
                )}

                <Heart className="w-4 h-4 fill-softpink/20 text-softpink/50" />
              </div>
            </div>
          ))}

          {filteredWishes.length === 0 && (
            <div className="col-span-full text-center text-warmwhite/50 py-10">
              {searchQuery
                ? 'No wishes match your search.'
                : 'No wishes yet. Be the first to send some love! 💌'}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
