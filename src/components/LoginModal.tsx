import React, { useState } from 'react';
import { X, Heart, Lock, Mail, ArrowRight } from 'lucide-react';

interface LoginModalProps {
  onClose: () => void;
  onSwitchToJoin: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose, onSwitchToJoin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#160a2f] border border-pink-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-pink-900/60 p-6 text-white">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1.5 mb-6">
          <div className="inline-flex p-2.5 rounded-2xl bg-pink-500/20 text-pink-400 mb-1">
            <Heart className="w-6 h-6 fill-pink-500" />
          </div>
          <h3 className="text-2xl font-black text-white">Welcome Back</h3>
          <p className="text-xs text-pink-200/80">Log in to your LoveConnect account</p>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              ✓
            </div>
            <h4 className="text-lg font-bold text-white">Connecting to Neural Feed...</h4>
            <p className="text-xs text-pink-200">Logging you in securely</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-pink-300 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@cyberdating.com"
                  className="w-full bg-white/5 border border-pink-500/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pink-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-pink-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white/5 border border-pink-500/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pink-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-pink-300">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded accent-pink-500" />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => alert("Password reset link sent to your registered email.")}
                className="hover:underline text-pink-400"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 font-extrabold text-sm text-white shadow-lg shadow-pink-500/40 hover:scale-[1.02] transition-transform cursor-pointer"
            >
              Sign In to LoveConnect
            </button>

            <div className="pt-2 text-center text-xs text-gray-400">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToJoin}
                className="text-pink-400 font-bold hover:underline"
              >
                Join Now Free
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
