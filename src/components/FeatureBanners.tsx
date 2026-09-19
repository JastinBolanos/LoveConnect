import React, { useState } from 'react';
import { Heart, ShieldCheck, MessageCircle, Gift, Sparkles, ChevronRight, X, Check } from 'lucide-react';
import { BOTTOM_FEATURES } from '../data/membersData';
import { FeatureItem } from '../types';

interface FeatureBannersProps {
  onLearnMore?: (feature: FeatureItem) => void;
}

export const FeatureBanners: React.FC<FeatureBannersProps> = ({ onLearnMore }) => {
  const [selectedFeature, setSelectedFeature] = useState<FeatureItem | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'heart':
        return <Heart className="w-6 h-6 text-white fill-white animate-heartbeat drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]" />;
      case 'shield':
        return <ShieldCheck className="w-6 h-6 text-white" />;
      case 'message':
        return <MessageCircle className="w-6 h-6 text-white fill-white/80" />;
      case 'gift':
        return <Gift className="w-6 h-6 text-white" />;
      default:
        return <Sparkles className="w-6 h-6 text-white" />;
    }
  };

  const getBubbleStyle = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-gradient-to-tr from-pink-600 to-rose-400 shadow-pink-500/40';
      case 1:
        return 'bg-gradient-to-tr from-sky-600 to-blue-500 shadow-sky-500/40';
      case 2:
        return 'bg-gradient-to-tr from-purple-600 to-indigo-500 shadow-purple-500/40';
      case 3:
        return 'bg-gradient-to-tr from-fuchsia-600 to-pink-500 shadow-fuchsia-500/40';
      default:
        return 'bg-pink-500 shadow-pink-500/40';
    }
  };

  return (
    <section className="w-full pb-14 sm:pb-20 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 2xl:px-24">
      <div className="w-full">
        {/* Main Banner Container with Vibrant Futuristic Gradient (Exact match to Loveconnect.png) */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#9333ea] via-[#ec4899] to-[#f97316] p-6 sm:p-8 lg:p-9 shadow-xl text-white">
          
          {/* 4 Feature Columns */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-white/20">
            {BOTTOM_FEATURES.map((feat, idx) => (
              <div
                key={feat.id}
                id={`feature-box-${feat.id}`}
                onClick={() => setSelectedFeature(feat)}
                className={`flex items-start gap-4 pt-4 sm:pt-0 ${
                  idx > 0 ? 'lg:pl-6 xl:pl-8' : ''
                } group cursor-pointer hover:translate-y-[-2px] transition-transform`}
              >
                {/* Circular Icon Bubble */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${getBubbleStyle(
                    idx
                  )} group-hover:scale-105 transition-transform duration-300`}
                >
                  {getIcon(feat.iconName)}
                </div>

                {/* Text Content */}
                <div className="text-left text-white space-y-0.5">
                  <h3 className="text-base font-bold tracking-tight text-white group-hover:text-amber-200 transition-colors flex items-center gap-1">
                    <span>{feat.title}</span>
                  </h3>
                  <p className="text-xs text-white/90 font-normal leading-snug">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Details Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#180d33] border border-pink-500/40 rounded-3xl p-6 text-white shadow-2xl shadow-purple-900/60">
            <button
              onClick={() => setSelectedFeature(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
                {getIcon(selectedFeature.iconName)}
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">{selectedFeature.title}</h4>
                <p className="text-xs text-pink-300">LoveConnect Cyber Protocol</p>
              </div>
            </div>

            <p className="text-sm text-gray-300 mb-5 leading-relaxed">
              {selectedFeature.description}. Powered by quantum-level behavioral clustering, encrypted private messaging channels, and strict verified human identities.
            </p>

            <div className="space-y-2 mb-6 text-xs text-pink-100">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Zero bots guarantee with biometric face verification</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Neural matching with 94.8% long-term chemistry index</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>End-to-end encrypted chats & hologram video dates</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedFeature(null)}
              className="w-full py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-sm shadow-lg shadow-pink-500/30 hover:opacity-95"
            >
              Got it, let's explore!
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
