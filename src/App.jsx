import { useState, useEffect, useRef, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import OpeningScreen from './components/OpeningScreen';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import StoryTimeline from './components/StoryTimeline';
import Gallery from './components/Gallery';
import PolaroidWall from './components/PolaroidWall';
import SpecialQualities from './components/SpecialQualities';
import BirthdayCake from './components/BirthdayCake';
import AudioPlayer from './components/AudioPlayer';
import Wishes from './components/Wishes';
import LoveLetter from './components/LoveLetter';
import SecretSurprise from './components/SecretSurprise';
import GiftSection from './components/GiftSection';
import FinalSection from './components/FinalSection';
import birthdayData from './data/birthdayData';
import { Heart, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

import Login from './components/Login';
import FriendPage from './components/FriendPage';
import CustomCursor from './components/CustomCursor';

/**
 * Framer Motion wrapper that beautifully springs children into view when scrolled.
 */
function RevealOnScroll({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function MainSite({ authInfo, onLogout }) {
  const [isEntered, setIsEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [secretTaps, setSecretTaps] = useState(0);
  const [isSecretOpen, setIsSecretOpen] = useState(false);

  // Background star generation
  useEffect(() => {
    const createStars = () => {
      const container = document.getElementById('starfield');
      if (!container) return;
      container.innerHTML = '';
      const starCount = window.innerWidth < 768 ? 40 : 100;
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 2.5 + 1;
        star.className = 'absolute rounded-full bg-warmwhite';
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.opacity = Math.random() * 0.7 + 0.3;
        star.style.animation = `pulseGlow ${Math.random() * 3 + 2}s infinite ease-in-out alternate`;
        container.appendChild(star);
      }
    };
    createStars();
    window.addEventListener('resize', createStars);
    return () => window.removeEventListener('resize', createStars);
  }, []);

  const handleEnter = useCallback(() => {
    setIsEntered(true);
    setIsPlaying(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSecretTap = useCallback(() => {
    setSecretTaps(prev => {
      const next = prev + 1;
      if (next >= 5) {
        setIsSecretOpen(true);
        return 0;
      }
      return next;
    });
  }, []);

  const handleTogglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  return (
    <>
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-softpink/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-blueteal/30 rounded-full blur-[120px] animate-float-reverse"></div>
        <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-rosegold/15 rounded-full blur-3xl animate-pulse-glow"></div>
        <div id="starfield" className="absolute inset-0"></div>
      </div>

      <OpeningScreen onEnter={handleEnter} isEntered={isEntered} data={birthdayData} />

      <div 
        id="main-experience" 
        className={`transition-opacity duration-1000 relative z-10 ${isEntered ? 'opacity-100' : 'opacity-0 pointer-events-none h-0 overflow-hidden'}`}
      >
        <Navigation onSecretTrigger={() => setIsSecretOpen(true)} />
        
        {/* Logout Button for Main Site */}
        <button onClick={onLogout} className="fixed top-6 right-6 px-4 py-2 rounded-full glass-panel border border-white/10 text-warmwhite/70 hover:text-softpink text-xs uppercase tracking-widest flex items-center gap-2 z-50">
          <LogOut className="w-3.5 h-3.5" /> Logout
        </button>
        
        <main>
          <RevealOnScroll>
            <Hero data={birthdayData} />
          </RevealOnScroll>

          <RevealOnScroll>
            <Countdown date={birthdayData.birthday} />
          </RevealOnScroll>

          <RevealOnScroll>
            <StoryTimeline items={birthdayData.timeline} />
          </RevealOnScroll>

          <RevealOnScroll>
            <Gallery items={birthdayData.memories} />
          </RevealOnScroll>

          <RevealOnScroll>
            <PolaroidWall items={birthdayData.polaroids} />
          </RevealOnScroll>

          <RevealOnScroll>
            <SpecialQualities items={birthdayData.qualities} />
          </RevealOnScroll>

          <RevealOnScroll>
            <BirthdayCake />
          </RevealOnScroll>

          <RevealOnScroll>
            <Wishes authInfo={authInfo} />
          </RevealOnScroll>

          <RevealOnScroll>
            <LoveLetter data={birthdayData.loveLetter} date={birthdayData.birthday} />
          </RevealOnScroll>
          
          {/* Secret Trigger Area */}
          <div className="py-6 text-center">
            <p className="text-[11px] text-warmwhite/30 tracking-widest uppercase mb-2">Notice the little things</p>
            <button 
              onClick={handleSecretTap}
              className="inline-block p-3 rounded-full hover:bg-white/5 active:scale-75 transition-all text-softpink/40 hover:text-softpink cursor-pointer group" 
              title="Click me 5 times..."
            >
              <Heart className="w-5 h-5 fill-softpink/20 group-hover:fill-softpink group-hover:scale-125 transition-all" />
            </button>
            <span className="block text-[10px] text-warmwhite/20 mt-1">
              {secretTaps > 0 ? `${5 - secretTaps} more taps...` : 'Tap 5 times to unlock a secret message'}
            </span>
          </div>

          <RevealOnScroll>
            <GiftSection giftUrl={birthdayData.giftUrl} />
          </RevealOnScroll>

          <RevealOnScroll>
            <FinalSection data={birthdayData} />
          </RevealOnScroll>
        </main>

        <footer className="py-12 text-center text-warmwhite/30 text-xs tracking-wider pb-28 md:pb-12">
          <p>© 2026 Forever & Always • A Private Birthday Sanctuary</p>
        </footer>

        <AudioPlayer 
          data={birthdayData.music} 
          isPlaying={isPlaying} 
          onTogglePlay={handleTogglePlay} 
        />
      </div>

      <SecretSurprise 
        isOpen={isSecretOpen} 
        onClose={() => setIsSecretOpen(false)} 
        message={birthdayData.secretMessage} 
      />
    </>
  );
}

export default function App() {
  const [authInfo, setAuthInfo] = useState(() => {
    const token = localStorage.getItem('birthday_token');
    const role = localStorage.getItem('birthday_role');
    return token && role ? { token, role } : null;
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('birthday_token');
    localStorage.removeItem('birthday_role');
    setAuthInfo(null);
    navigate('/login');
  };

  // Protected Route for Main Site (Creator & Girlfriend only)
  const RequireMainSite = ({ children }) => {
    if (!authInfo) return <Navigate to="/login" state={{ from: location }} />;
    if (authInfo.role === 'FRIEND') return <Navigate to="/friend" />;
    return children;
  };

  // Protected Route for Friend Page
  const RequireFriendSite = ({ children }) => {
    if (!authInfo) return <Navigate to="/login" state={{ from: location }} />;
    // If Creator or Girlfriend try to go to friend page, redirect them to main site
    if (authInfo.role !== 'FRIEND') return <Navigate to="/" />;
    return children;
  };

  return (
    <>
      <CustomCursor />
      {/* Film Grain Noise Overlay for Premium Feel */}
      <div 
        className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      ></div>

      <Routes>
      <Route path="/login" element={
        authInfo ? (
          <Navigate to={authInfo.role === 'FRIEND' ? '/friend' : '/'} />
        ) : (
          <Login setAuthInfo={setAuthInfo} />
        )
      } />
      
      <Route path="/friend" element={
        <RequireFriendSite>
          <FriendPage authInfo={authInfo} onLogout={handleLogout} />
        </RequireFriendSite>
      } />
      
      <Route path="/" element={
        <RequireMainSite>
          <MainSite authInfo={authInfo} onLogout={handleLogout} />
        </RequireMainSite>
      } />
    </Routes>
    </>
  );
}
