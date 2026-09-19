import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface SparkJoinButtonProps {
  onClick: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  id?: string;
  text?: string;
}

interface DynamicSpark {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  opacity: number;
}

export const SparkJoinButton: React.FC<SparkJoinButtonProps> = ({
  onClick,
  className = '',
  size = 'md',
  id = 'nav-join-btn',
  text = 'Join Now'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [burstSparks, setBurstSparks] = useState<DynamicSpark[]>([]);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Trigger interactive spark explosion on click
  const triggerSparkBurst = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    const originX = e.clientX - (rect?.left || 0);
    const originY = e.clientY - (rect?.top || 0);

    const colors = ['#f59e0b', '#fbbf24', '#f43f5e', '#ec4899', '#ffffff', '#fed7aa', '#facc15'];
    const newSparks: DynamicSpark[] = [];

    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20 + (Math.random() - 0.5);
      const speed = 25 + Math.random() * 60;
      newSparks.push({
        id: Date.now() + i + Math.random(),
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 7,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        opacity: 1,
      });
    }

    setBurstSparks((prev) => [...prev, ...newSparks]);
    onClick();
  };

  // Clean up burst sparks after animation
  useEffect(() => {
    if (burstSparks.length === 0) return;
    const timer = setTimeout(() => {
      setBurstSparks([]);
    }, 900);
    return () => clearTimeout(timer);
  }, [burstSparks]);

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs sm:text-sm font-bold',
    md: 'px-5 py-2.5 sm:px-6 sm:py-2.5 text-sm sm:text-base font-black',
    lg: 'px-7 py-3.5 sm:px-8 sm:py-4 text-base sm:text-lg font-extrabold',
  }[size];

  return (
    <div
      className="relative inline-flex items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Continuous Floating Electric Sparks (Emanating from all directions) */}
      <div className="absolute inset-0 pointer-events-none overflow-visible z-20">
        
        {/* Spark 1: Top-Left Shooting Upwards */}
        <span
          className="absolute -top-3 left-3 w-3 h-3 text-[#facc15] pointer-events-none drop-shadow-[0_0_8px_#facc15]"
          style={{
            animation: 'shoot-spark-up-left 1.6s ease-out infinite',
            animationDelay: '0s',
          }}
        >
          ✦
        </span>

        {/* Spark 2: Top-Right Shooting Outwards */}
        <span
          className="absolute -top-3 right-4 w-3.5 h-3.5 text-[#fb923c] pointer-events-none drop-shadow-[0_0_10px_#f43f5e]"
          style={{
            animation: 'shoot-spark-up-right 1.8s ease-out infinite',
            animationDelay: '0.4s',
          }}
        >
          ✦
        </span>

        {/* Spark 3: Bottom-Left Shooting */}
        <span
          className="absolute -bottom-2 left-6 w-2.5 h-2.5 text-[#ec4899] pointer-events-none drop-shadow-[0_0_8px_#ec4899]"
          style={{
            animation: 'shoot-spark-down-left 1.9s ease-out infinite',
            animationDelay: '0.7s',
          }}
        >
          ✧
        </span>

        {/* Spark 4: Bottom-Right Shooting */}
        <span
          className="absolute -bottom-2 right-5 w-3 h-3 text-[#fef08a] pointer-events-none drop-shadow-[0_0_10px_#eab308]"
          style={{
            animation: 'shoot-spark-down-right 1.7s ease-out infinite',
            animationDelay: '1.1s',
          }}
        >
          ✦
        </span>

        {/* Spark 5: Top Center Ember */}
        <span
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-300 pointer-events-none shadow-[0_0_10px_#f59e0b]"
          style={{
            animation: 'shoot-spark-top 1.4s ease-out infinite',
            ['--spark-tx' as any]: '15px',
            ['--spark-ty' as any]: '-35px',
            animationDelay: '0.3s',
          }}
        />

        {/* Spark 6: Left Side Hot Ember */}
        <span
          className="absolute top-1/2 -left-3 -translate-y-1/2 w-2 h-2 rounded-full bg-pink-400 pointer-events-none shadow-[0_0_12px_#ec4899]"
          style={{
            animation: 'shoot-spark-top 1.5s ease-out infinite',
            ['--spark-tx' as any]: '-28px',
            ['--spark-ty' as any]: '-20px',
            animationDelay: '0.8s',
          }}
        />

        {/* Spark 7: Right Side Golden Star */}
        <span
          className="absolute top-1/2 -right-3 -translate-y-1/2 w-3 h-3 text-white pointer-events-none drop-shadow-[0_0_8px_#ffffff]"
          style={{
            animation: 'shoot-spark-top 1.6s ease-out infinite',
            ['--spark-tx' as any]: '30px',
            ['--spark-ty' as any]: '-18px',
            animationDelay: '0.5s',
          }}
        >
          ★
        </span>

        {/* Extra intense sparks when hovered */}
        {isHovered && (
          <>
            <span
              className="absolute -top-6 left-1/4 w-3 h-3 text-yellow-200 pointer-events-none animate-sparkle-glow"
              style={{ animationDelay: '0.1s' }}
            >
              ✦
            </span>
            <span
              className="absolute -bottom-5 right-1/4 w-3.5 h-3.5 text-rose-300 pointer-events-none animate-sparkle-glow"
              style={{ animationDelay: '0.3s' }}
            >
              ✦
            </span>
            <span
              className="absolute -top-5 right-2 w-2.5 h-2.5 text-amber-300 pointer-events-none animate-sparkle-glow"
              style={{ animationDelay: '0.5s' }}
            >
              ✧
            </span>
          </>
        )}
      </div>

      {/* 2. Burst Sparks Container (Fired on click) */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-visible">
        {burstSparks.map((spark) => (
          <span
            key={spark.id}
            className="absolute rounded-full pointer-events-none transition-all duration-700 ease-out"
            style={{
              left: `${spark.x}px`,
              top: `${spark.y}px`,
              width: `${spark.size}px`,
              height: `${spark.size}px`,
              backgroundColor: spark.color,
              boxShadow: `0 0 12px ${spark.color}, 0 0 20px ${spark.color}`,
              transform: `translate(${spark.vx}px, ${spark.vy}px) scale(0)`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* 3. Glowing Radiant Aura behind button */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 opacity-70 blur-md group-hover:opacity-100 transition-opacity duration-300 animate-pulse-slow pointer-events-none" />

      {/* 4. The Actual Button */}
      <button
        ref={buttonRef}
        id={id}
        onClick={triggerSparkBurst}
        className={`relative group overflow-hidden rounded-2xl bg-gradient-to-r from-[#ec4899] via-[#f43f5e] to-[#f97316] text-white shadow-lg shadow-pink-500/40 hover:shadow-[0_0_30px_rgba(244,63,94,0.8)] hover:brightness-110 active:scale-[0.96] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer z-10 ${sizeClasses} ${className}`}
      >
        {/* Shimmer sweep effect inside */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />

        {/* Heart icon with heartbeat pulse */}
        <Heart className="w-4 h-4 fill-white text-white animate-heartbeat shrink-0 drop-shadow" />

        <span className="relative z-10 tracking-tight flex items-center gap-1.5">
          <span>{text}</span>
          <Sparkles className="w-3.5 h-3.5 text-yellow-200 fill-yellow-200 animate-spark-flicker shrink-0" />
        </span>
      </button>
    </div>
  );
};
