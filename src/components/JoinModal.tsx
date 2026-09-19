import React, { useState } from 'react';
import { X, Heart, Sparkles, Check, ArrowRight, User, Shield, Flame } from 'lucide-react';
import { FEATURED_MEMBERS } from '../data/membersData';
import { Member } from '../types';

interface JoinModalProps {
  onClose: () => void;
  onSuccess: (matchedMembers: Member[]) => void;
}

export const JoinModal: React.FC<JoinModalProps> = ({ onClose, onSuccess }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [gender, setGender] = useState<'man' | 'woman' | 'non-binary'>('man');
  const [seeking, setSeeking] = useState<'women' | 'men' | 'everyone'>('women');
  const [vibe, setVibe] = useState('Neon Rooftops');
  const [city, setCity] = useState('New York');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const vibeOptions = [
    '✨ Neon Rooftops & Cocktails',
    '☕ Cyber Cafe & Cozy Vinyl',
    '🌅 Sunset Stargazing & Picnics',
    '🎨 Tech Art & Synthwave Concerts'
  ];

  const handleStartScan = () => {
    setStep(3);
    setIsScanning(true);
    let current = 0;
    const interval = setInterval(() => {
      current += 10;
      setScanProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setIsScanning(false);
        setStep(4);
      }
    }, 150);
  };

  const finishJoin = () => {
    onSuccess(FEATURED_MEMBERS.slice(0, 3));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#160a2f] border border-pink-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-pink-900/60 p-6 text-white">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step >= s ? 'w-8 bg-gradient-to-r from-pink-500 to-amber-400' : 'w-4 bg-white/10'
              }`}
            />
          ))}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center space-y-1.5">
              <div className="inline-flex p-2.5 rounded-2xl bg-pink-500/20 text-pink-400 mb-1">
                <Heart className="w-6 h-6 fill-pink-500" />
              </div>
              <h3 className="text-2xl font-black text-white">Join LoveConnect</h3>
              <p className="text-xs text-pink-200/80">Step 1: Your identity & orientation</p>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-pink-300 uppercase tracking-wider">I am a:</label>
              <div className="grid grid-cols-3 gap-2">
                {(['man', 'woman', 'non-binary'] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className={`py-2.5 px-2 text-xs font-bold rounded-xl border transition-all capitalize cursor-pointer ${
                      gender === g
                        ? 'bg-pink-600 text-white border-pink-400 shadow-md shadow-pink-500/30'
                        : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-pink-300 uppercase tracking-wider">Looking to meet:</label>
              <div className="grid grid-cols-3 gap-2">
                {(['women', 'men', 'everyone'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSeeking(s)}
                    className={`py-2.5 px-2 text-xs font-bold rounded-xl border transition-all capitalize cursor-pointer ${
                      seeking === s
                        ? 'bg-pink-600 text-white border-pink-400 shadow-md shadow-pink-500/30'
                        : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 font-extrabold text-sm text-white shadow-lg shadow-pink-500/40 flex items-center justify-center gap-2 hover:scale-[1.02] cursor-pointer"
            >
              <span>Next: Dating Vibe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center space-y-1.5">
              <div className="inline-flex p-2.5 rounded-2xl bg-purple-500/20 text-purple-400 mb-1">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-white">What is your dream date vibe?</h3>
              <p className="text-xs text-pink-200/80">Step 2: Calibrating your neural chemistry</p>
            </div>

            <div className="space-y-2.5">
              {vibeOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setVibe(opt)}
                  className={`w-full py-3 px-4 rounded-2xl text-left text-xs sm:text-sm font-semibold border transition-all flex items-center justify-between cursor-pointer ${
                    vibe === opt
                      ? 'bg-gradient-to-r from-pink-600/40 to-purple-600/40 border-pink-400 text-white shadow-md'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <span>{opt}</span>
                  {vibe === opt && <Check className="w-4 h-4 text-pink-400" />}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="py-3 px-5 rounded-full bg-white/10 text-xs font-bold text-gray-300 hover:bg-white/15"
              >
                Back
              </button>
              <button
                onClick={handleStartScan}
                className="flex-1 py-3 rounded-full bg-gradient-to-r from-pink-500 to-amber-500 font-extrabold text-sm text-white shadow-lg shadow-pink-500/40 flex items-center justify-center gap-2 hover:scale-[1.02] cursor-pointer"
              >
                <span>Run Neural Match Scan ⚡</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SCANNING ANIMATION */}
        {step === 3 && (
          <div className="py-8 text-center space-y-6">
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-pink-500/30 border-t-pink-500 animate-spin" />
              <Heart className="w-10 h-10 text-pink-400 fill-pink-500 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-black text-white">Synthesizing Bio-Matches...</h4>
              <p className="text-xs text-pink-200">Scanning 2M+ active profiles matching "{vibe}"</p>
            </div>

            <div className="w-full max-w-xs mx-auto bg-white/10 h-2.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-amber-400 transition-all duration-150 rounded-full"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
            <span className="text-xs font-mono text-pink-300">{scanProgress}% completed</span>
          </div>
        )}

        {/* STEP 4: RESULT */}
        {step === 4 && (
          <div className="space-y-6 text-center">
            <div className="space-y-2">
              <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400 mb-1">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-white">Match Calibration Ready! 🎉</h3>
              <p className="text-xs text-pink-200">
                We found 3 high-resonance singles in your area with a 95%+ compatibility rating.
              </p>
            </div>

            {/* Quick Preview Avatars */}
            <div className="flex justify-center -space-x-4 py-2">
              {FEATURED_MEMBERS.slice(0, 3).map((m) => (
                <div key={m.id} className="relative group">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-pink-400 shadow-lg"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-1 bg-pink-600 text-[10px] font-bold px-1.5 py-0.2 rounded-full text-white">
                    {m.matchScore}%
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={finishJoin}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 font-extrabold text-sm text-white shadow-xl shadow-pink-500/40 hover:scale-[1.02] transition-transform cursor-pointer"
            >
              Enter LoveConnect & View Matches 🚀
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
