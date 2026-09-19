import React, { useState } from 'react';
import { X, Play, Pause, Sparkles, Volume2, VolumeX, Shield, Heart, Radio } from 'lucide-react';

interface VideoModalProps {
  onClose: () => void;
  onJoinNow: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ onClose, onJoinNow }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<'neural' | 'hologram' | 'safety'>('neural');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#14082c] border border-pink-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-pink-900/60 flex flex-col text-white">
        
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#1f0d3e] border-b border-pink-500/20">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-pink-400 animate-pulse" />
            <span className="text-sm font-extrabold text-white">
              LoveConnect Interactive Showcase
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Simulation Canvas */}
        <div className="relative w-full aspect-video bg-gradient-to-tr from-purple-950 via-[#1a0833] to-pink-950 flex items-center justify-center overflow-hidden">
          
          {/* Animated Background Graphic */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-72 h-72 rounded-full border border-pink-500/30 animate-ping opacity-25" />
            <div className="w-96 h-96 rounded-full border border-purple-500/20 animate-pulse opacity-40" />
            
            {/* Couple silhouette / romantic glow */}
            <img
              src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&q=80"
              alt="Holographic dating simulation"
              className={`w-full h-full object-cover mix-blend-screen opacity-50 transition-transform duration-1000 ${
                isPlaying ? 'scale-105' : 'scale-100'
              }`}
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Futuristic HUD overlay */}
          <div className="absolute top-4 left-4 flex flex-col gap-1 text-[11px] font-mono text-pink-300 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-xl border border-pink-500/30">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              LIVE NEURAL MATCHING ENGINE
            </div>
            <span>Bio-Resonance: 98.7%</span>
            <span>Latency: 12ms | Latent Space: OK</span>
          </div>

          {/* Center Play/Pause Trigger */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="z-20 w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-2xl shadow-pink-500/50 hover:scale-110 active:scale-95 transition-transform cursor-pointer"
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white translate-x-0.5" />}
          </button>

          {/* Controls Bar */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-xs border border-white/10 z-20">
            <div className="flex items-center gap-3">
              <span className="text-pink-300 font-mono">01:42 / 02:30</span>
              <div className="w-32 sm:w-48 h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-gradient-to-r from-pink-500 to-amber-400 rounded-full" />
              </div>
            </div>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 text-gray-300 hover:text-white"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Feature Explainer Tabs Below Video */}
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <button
              onClick={() => setActiveTab('neural')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                activeTab === 'neural' ? 'bg-pink-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              1. Neural Compatibility
            </button>
            <button
              onClick={() => setActiveTab('hologram')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                activeTab === 'hologram' ? 'bg-pink-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              2. Cyber Video Dates
            </button>
            <button
              onClick={() => setActiveTab('safety')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                activeTab === 'safety' ? 'bg-pink-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              3. 100% Verified Humans
            </button>
          </div>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            {activeTab === 'neural' && (
              'Our neural network analyzes personality traits, music tastes, lifestyle rhythms, and emotional cadence to pair you with people you’ll genuinely fall for.'
            )}
            {activeTab === 'hologram' && (
              'Skip awkward first dates. Join 5-minute encrypted video mini-dates with crystal audio, ice-breaker games, and real-time vibe tests before exchanging contacts.'
            )}
            {activeTab === 'safety' && (
              'Every member completes a 3D biometric smile verification to ensure no catfishing, zero automated bots, and a safe, respectful dating environment.'
            )}
          </p>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-pink-300 font-medium">Ready to experience real futuristic love?</span>
            <button
              onClick={() => {
                onClose();
                onJoinNow();
              }}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 font-extrabold text-xs text-white shadow-lg shadow-pink-500/40 hover:scale-105 transition-transform cursor-pointer"
            >
              Join Now Free 💖
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
