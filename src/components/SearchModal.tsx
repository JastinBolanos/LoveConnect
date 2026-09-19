import React, { useState } from 'react';
import { X, Search, MapPin } from 'lucide-react';
import { Member } from '../types';
import { memberService } from '../services/memberService';

interface SearchModalProps {
  members: Member[];
  onSelectMember: (m: Member) => void;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ members, onSelectMember, onClose }) => {
  const [query, setQuery] = useState('');

  const results = memberService.searchMembers(members, query);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-20 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#160a2f] border border-pink-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-pink-900/60 p-5 text-white">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-pink-500/20">
          <div className="flex items-center gap-2 flex-1 mr-3">
            <Search className="w-5 h-5 text-pink-400" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, city, interest (e.g. Synthwave, New York)..."
              className="w-full bg-transparent text-white placeholder-gray-400 text-sm focus:outline-none"
            />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
          {results.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">
              No matching members found for "{query}". Try "Art", "Miami", or "Design".
            </div>
          ) : (
            results.map((m) => (
              <div
                key={m.id}
                onClick={() => {
                  onSelectMember(m);
                  onClose();
                }}
                className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-pink-500/30"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-11 h-11 rounded-full object-cover border border-pink-400"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>{m.name}, {m.age}</span>
                      <span className="text-[10px] bg-pink-500/30 text-pink-300 px-1.5 py-0.2 rounded-full">
                        {m.matchScore}%
                      </span>
                    </div>
                    <p className="text-xs text-pink-200/70 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-pink-400" />
                      {m.city}, {m.country} • {m.profession}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-semibold text-pink-400 hover:text-pink-300">
                    View Profile →
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
