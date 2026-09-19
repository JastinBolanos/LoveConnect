import React, { useState, useEffect, useCallback } from 'react';
import { Heart, Sparkles, Flame, Send } from 'lucide-react';

interface ClickHeart {
  id: number;
  x: number;
  y: number;
  emoji: string;
  color: string;
  size: number;
}

interface LoveAtmosphereProps {
  onLoveShower?: () => void;
}

const CURTAIN_HEARTS = [
  { id: 1, left: '3%', delay: '0s', duration: '7.5s', size: 18, color: '#ec4899', fill: true, type: 'sway', opacity: 0.85 },
  { id: 2, left: '7%', delay: '3.2s', duration: '9s', size: 38, color: '#f43f5e', fill: true, type: 'curtain', opacity: 0.9 },
  { id: 3, left: '11%', delay: '1.5s', duration: '6.5s', size: 14, color: '#fb7185', fill: false, type: 'sway', opacity: 0.75 },
  { id: 4, left: '14%', delay: '5.2s', duration: '8.2s', size: 26, color: '#e11d48', fill: true, type: 'curtain', opacity: 0.8 },
  { id: 5, left: '18%', delay: '0.8s', duration: '8.8s', size: 44, color: '#ec4899', fill: true, type: 'curtain', opacity: 0.9 },
  { id: 6, left: '22%', delay: '4.1s', duration: '7.2s', size: 16, color: '#a855f7', fill: true, type: 'sway', opacity: 0.7 },
  { id: 7, left: '25%', delay: '2.3s', duration: '10.5s', size: 54, color: '#f43f5e', fill: true, type: 'curtain', opacity: 0.85 },
  { id: 8, left: '29%', delay: '6s', duration: '6.8s', size: 20, color: '#fbbf24', fill: true, type: 'sway', opacity: 0.8 },
  { id: 9, left: '34%', delay: '1.2s', duration: '8s', size: 30, color: '#ec4899', fill: false, type: 'curtain', opacity: 0.85 },
  { id: 10, left: '38%', delay: '4.8s', duration: '9.2s', size: 14, color: '#f43f5e', fill: true, type: 'sway', opacity: 0.75 },
  { id: 11, left: '42%', delay: '2.9s', duration: '7s', size: 48, color: '#db2777', fill: true, type: 'curtain', opacity: 0.9 },
  { id: 12, left: '47%', delay: '0.3s', duration: '8.4s', size: 22, color: '#fb7185', fill: true, type: 'sway', opacity: 0.8 },
  { id: 13, left: '52%', delay: '3.7s', duration: '7.8s', size: 34, color: '#ec4899', fill: true, type: 'curtain', opacity: 0.85 },
  { id: 14, left: '56%', delay: '1.9s', duration: '11s', size: 58, color: '#f43f5e', fill: true, type: 'sway', opacity: 0.85 },
  { id: 15, left: '61%', delay: '5.5s', duration: '6.9s', size: 18, color: '#a855f7', fill: false, type: 'curtain', opacity: 0.75 },
  { id: 16, left: '65%', delay: '0.6s', duration: '9.5s', size: 28, color: '#fbbf24', fill: true, type: 'sway', opacity: 0.8 },
  { id: 17, left: '70%', delay: '4.4s', duration: '7.4s', size: 42, color: '#ec4899', fill: true, type: 'curtain', opacity: 0.9 },
  { id: 18, left: '74%', delay: '2.1s', duration: '8.6s', size: 15, color: '#f43f5e', fill: true, type: 'sway', opacity: 0.75 },
  { id: 19, left: '78%', delay: '6.3s', duration: '10s', size: 50, color: '#e11d48', fill: true, type: 'curtain', opacity: 0.85 },
  { id: 20, left: '83%', delay: '1.1s', duration: '6.7s', size: 24, color: '#fb7185', fill: false, type: 'sway', opacity: 0.8 },
  { id: 21, left: '87%', delay: '3.5s', duration: '8.9s', size: 36, color: '#ec4899', fill: true, type: 'curtain', opacity: 0.85 },
  { id: 22, left: '91%', delay: '0.2s', duration: '7.1s', size: 18, color: '#a855f7', fill: true, type: 'sway', opacity: 0.7 },
  { id: 23, left: '95%', delay: '4.9s', duration: '9.8s', size: 46, color: '#f43f5e', fill: true, type: 'curtain', opacity: 0.9 },
  { id: 24, left: '97%', delay: '2.6s', duration: '6.4s', size: 20, color: '#fbbf24', fill: true, type: 'sway', opacity: 0.75 },
];

export const LoveAtmosphere: React.FC<LoveAtmosphereProps> = () => {
  const [clickHearts, setClickHearts] = useState<ClickHeart[]>([]);
  const [loveCount, setLoveCount] = useState<number>(2418);
  const [isBursting, setIsBursting] = useState<boolean>(false);
  const [burstHearts, setBurstHearts] = useState<Array<{ id: number; left: number; delay: number; scale: number; duration: number }>>([]);

  const handleGlobalClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.tagName === 'TEXTAREA') {
      return;
    }

    const emojis = ['💖', '💕', '✨', '💗', '❤️', '🌹', '💘', '💞'];
    const colors = ['#ec4899', '#f43f5e', '#a855f7', '#fb7185', '#e11d48'];
    const chosenEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const chosenColor = colors[Math.floor(Math.random() * colors.length)];

    const newHeart: ClickHeart = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      emoji: chosenEmoji,
      color: chosenColor,
      size: Math.floor(Math.random() * 12) + 20,
    };

    setClickHearts((prev) => [...prev.slice(-20), newHeart]);

    setTimeout(() => {
      setClickHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [handleGlobalClick]);

  const triggerLoveShower = () => {
    setIsBursting(true);
    setLoveCount((prev) => prev + 1);

    const particleBatch = Array.from({ length: 50 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.floor(Math.random() * 96) + 2,
      delay: Math.random() * 1.5,
      scale: 0.6 + Math.random() * 0.9,
      duration: 3 + Math.random() * 3,
    }));

    setBurstHearts(particleBatch);

    setTimeout(() => {
      setIsBursting(false);
      setBurstHearts([]);
    }, 6000);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
      {CURTAIN_HEARTS.map((h) => (
        <div
          key={h.id}
          className={`absolute -top-16 opacity-75 ${
            h.type === 'sway' ? 'animate-fall-sway' : 'animate-fall-curtain'
          }`}
          style={{
            left: h.left,
            animationDelay: h.delay,
            animationDuration: h.duration,
            willChange: 'transform, opacity',
          }}
        >
          <Heart
            style={{
              width: `${h.size}px`,
              height: `${h.size}px`,
              color: h.color,
              fill: h.fill ? h.color : 'none',
              filter: `drop-shadow(0 0 6px ${h.color}80)`,
              opacity: h.opacity,
            }}
          />
        </div>
      ))}

      {isBursting &&
        burstHearts.map((b) => (
          <div
            key={b.id}
            className="absolute -top-10 animate-fall-curtain"
            style={{
              left: `${b.left}%`,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`,
              transform: `scale(${b.scale})`,
            }}
          >
            <span
              className="text-2xl filter drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]"
              style={{ display: 'inline-block' }}
            >
              💖
            </span>
          </div>
        ))}

      {clickHearts.map((h) => (
        <div
          key={h.id}
          className="fixed pointer-events-none animate-float-fade z-50 flex items-center justify-center"
          style={{
            left: `${h.x - h.size / 2}px`,
            top: `${h.y - h.size / 2}px`,
            fontSize: `${h.size}px`,
            color: h.color,
            textShadow: `0 0 10px ${h.color}`,
          }}
        >
          <span>{h.emoji}</span>
        </div>
      ))}

      <div className="fixed bottom-6 right-6 pointer-events-auto z-40">
        <button
          id="love-shower-interactive-btn"
          onClick={triggerLoveShower}
          className="relative group p-3 sm:px-4 sm:py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-extrabold shadow-xl shadow-pink-600/40 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer border border-pink-300/40"
          title="Send Love Shower"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>

          <Heart className="w-5 h-5 fill-white animate-heartbeat" />

          <span className="text-xs sm:text-sm font-black tracking-wide hidden sm:inline">
            Love Shower
          </span>

          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-black/30 border border-white/20">
            {loveCount}
          </span>

          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 to-amber-400 blur-sm opacity-40 group-hover:opacity-80 transition-opacity -z-10" />
        </button>
      </div>
    </div>
  );
};
