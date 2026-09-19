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

// Continuous cascading curtains of falling hearts across the screen
const CURTAIN_HEARTS = [
  // Column 1 (Left 2% - 15%)
  { id: 1, left: '3%', delay: '0s', duration: '7.5s', size: 18, color: '#ec4899', fill: true, type: 'sway', opacity: 0.85 },
  { id: 2, left: '7%', delay: '3.2s', duration: '9s', size: 38, color: '#f43f5e', fill: true, type: 'curtain', opacity: 0.9 },
  { id: 3, left: '11%', delay: '1.5s', duration: '6.5s', size: 14, color: '#fb7185', fill: false, type: 'sway', opacity: 0.75 },
  { id: 4, left: '14%', delay: '5.2s', duration: '8.2s', size: 26, color: '#e11d48', fill: true, type: 'curtain', opacity: 0.8 },

  // Column 2 (Left 16% - 30%)
  { id: 5, left: '18%', delay: '0.8s', duration: '8.8s', size: 44, color: '#ec4899', fill: true, type: 'curtain', opacity: 0.9 },
  { id: 6, left: '22%', delay: '4.1s', duration: '7.2s', size: 16, color: '#a855f7', fill: true, type: 'sway', opacity: 0.7 },
  { id: 7, left: '25%', delay: '2.3s', duration: '10.5s', size: 54, color: '#f43f5e', fill: true, type: 'curtain', opacity: 0.85 },
  { id: 8, left: '29%', delay: '6s', duration: '6.8s', size: 20, color: '#fbbf24', fill: true, type: 'sway', opacity: 0.8 },

  // Column 3 (Center 32% - 48%)
  { id: 9, left: '34%', delay: '1.2s', duration: '8s', size: 30, color: '#ec4899', fill: false, type: 'curtain', opacity: 0.85 },
  { id: 10, left: '38%', delay: '4.8s', duration: '9.2s', size: 14, color: '#f43f5e', fill: true, type: 'sway', opacity: 0.75 },
  { id: 11, left: '42%', delay: '2.9s', duration: '7s', size: 48, color: '#db2777', fill: true, type: 'curtain', opacity: 0.9 },
  { id: 12, left: '47%', delay: '0.3s', duration: '8.4s', size: 22, color: '#fb7185', fill: true, type: 'sway', opacity: 0.8 },

  // Column 4 (Center 50% - 66%)
  { id: 13, left: '52%', delay: '3.7s', duration: '7.8s', size: 34, color: '#ec4899', fill: true, type: 'curtain', opacity: 0.85 },
  { id: 14, left: '56%', delay: '1.9s', duration: '11s', size: 58, color: '#f43f5e', fill: true, type: 'sway', opacity: 0.85 },
  { id: 15, left: '61%', delay: '5.5s', duration: '6.9s', size: 18, color: '#a855f7', fill: false, type: 'curtain', opacity: 0.75 },
  { id: 16, left: '65%', delay: '0.6s', duration: '9.5s', size: 28, color: '#fbbf24', fill: true, type: 'sway', opacity: 0.8 },

  // Column 5 (Right 68% - 84%)
  { id: 17, left: '70%', delay: '4.4s', duration: '7.4s', size: 42, color: '#ec4899', fill: true, type: 'curtain', opacity: 0.9 },
  { id: 18, left: '74%', delay: '2.1s', duration: '8.6s', size: 15, color: '#f43f5e', fill: true, type: 'sway', opacity: 0.75 },
  { id: 19, left: '78%', delay: '6.3s', duration: '10s', size: 50, color: '#e11d48', fill: true, type: 'curtain', opacity: 0.85 },
  { id: 20, left: '83%', delay: '1.1s', duration: '6.7s', size: 24, color: '#fb7185', fill: false, type: 'sway', opacity: 0.8 },

  // Column 6 (Far Right 86% - 98%)
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

  // Spawn click hearts
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
      size: Math.floor(Math.random() * 12) + 20
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

  // Trigger Love Shower (extra cascade)
  const triggerLoveShower = () => {
    setIsBursting(true);
    setLoveCount((prev) => prev + 1);

    const generated = Array.from({ length: 50 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 95,
      delay: Math.random() * 1.5,
      scale: 0.8 + Math.random() * 1.4,
      duration: 3 + Math.random() * 2.5
    }));

    setBurstHearts(generated);

    setTimeout(() => {
      setIsBursting(false);
      setBurstHearts([]);
    }, 4500);
  };

  return (
    <>
      {/* CONTINUOUS CASCADING CURTAIN OF HEARTS (FALLING FROM TOP TO BOTTOM) */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
        {CURTAIN_HEARTS.map((heart) => {
          const animationClass = heart.type === 'sway' ? 'animate-fall-sway' : 'animate-fall-curtain';
          return (
            <div
              key={heart.id}
              className={`absolute -top-16 ${animationClass}`}
              style={{
                left: heart.left,
                animationDuration: heart.duration,
                animationDelay: heart.delay,
                opacity: heart.opacity
              }}
            >
              <div 
                className="transform transition-transform hover:scale-125"
                style={{
                  filter: `drop-shadow(0 0 ${heart.size > 30 ? '16px' : '8px'} ${heart.color}99)`
                }}
              >
                <Heart
                  size={heart.size}
                  style={{
                    color: heart.color,
                    fill: heart.fill ? heart.color : 'transparent',
                    strokeWidth: heart.fill ? 1.5 : 2
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* CLICK INTERACTION HEARTS */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {clickHearts.map((h) => (
          <div
            key={h.id}
            className="absolute select-none font-bold animate-float-delayed pointer-events-none"
            style={{
              left: h.x - 12,
              top: h.y - 25,
              fontSize: `${h.size}px`,
              transition: 'all 1.2s cubic-bezier(0.1, 0.8, 0.2, 1)',
              transform: 'translateY(-55px) scale(1.3)',
              opacity: 0,
              filter: `drop-shadow(0 0 10px ${h.color})`
            }}
          >
            {h.emoji}
          </div>
        ))}
      </div>

      {/* MASSIVE LOVE SHOWER EXPLOSION */}
      {isBursting && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {burstHearts.map((b) => (
            <div
              key={b.id}
              className="absolute -bottom-12 pointer-events-none"
              style={{
                left: `${b.left}%`,
                animation: `float-up ${b.duration}s cubic-bezier(0.25, 1, 0.5, 1) forwards`,
                animationDelay: `${b.delay}s`,
                transform: `scale(${b.scale})`
              }}
            >
              <div className="flex flex-col items-center animate-bounce">
                <Heart
                  size={32}
                  className="text-pink-400 fill-pink-500 drop-shadow-[0_0_18px_rgba(236,72,153,0.9)]"
                />
                <Sparkles size={16} className="text-yellow-300 animate-spin" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FLOATING "LLUVIA DE AMOR / LOVE SHOWER" BUTTON */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={triggerLoveShower}
          className="group relative flex items-center gap-3 bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-black text-sm px-5 py-3.5 rounded-full shadow-[0_0_28px_rgba(236,72,153,0.7)] hover:shadow-[0_0_40px_rgba(244,63,94,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 border border-pink-400/50 backdrop-blur-md"
          title="Haz clic para enviar amor y desatar una lluvia de corazones"
        >
          {/* Pulsing ring */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 opacity-60 blur-sm group-hover:opacity-100 animate-pulse transition duration-500 -z-10" />

          <div className="relative">
            <Heart className="w-5 h-5 text-white fill-white animate-heartbeat drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1.5 -right-1.5 animate-spin" />
          </div>

          <div className="flex flex-col text-left">
            <span className="leading-none text-xs font-black tracking-wider uppercase flex items-center gap-1.5 text-pink-100">
              Lluvia de Amor 💖
            </span>
            <span className="text-[10px] text-pink-200 font-medium opacity-90">
              {loveCount.toLocaleString()} corazones enviados
            </span>
          </div>
        </button>
      </div>
    </>
  );
};
