import React, { useState } from 'react';
import { Heart, Star, Sparkles, Calendar, MapPin, Quote, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SUCCESS_STORIES } from '../data/membersData';

interface SuccessStoriesViewProps {
  onBackToHome: () => void;
  onJoinFree: () => void;
  onFindMatch: () => void;
}

export const SuccessStoriesView: React.FC<SuccessStoriesViewProps> = ({
  onBackToHome,
  onJoinFree,
  onFindMatch,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [claps, setClaps] = useState<Record<string, number>>({
    'jessica-liam': 342,
    'david-elena': 518,
    'mateo-chloe': 289,
    'camila-julian': 412,
    'aria-kai': 195,
    'valeria-marcus': 374,
  });
  const [lovedStories, setLovedStories] = useState<Set<string>>(new Set(['david-elena']));

  const tags = ['All', 'Engaged', 'Recently Married', 'Soulmates', 'Long-Distance Win'];

  const filteredStories = selectedTag === 'All'
    ? SUCCESS_STORIES
    : SUCCESS_STORIES.filter((s) => s.tag === selectedTag);

  const handleLoveStory = (id: string) => {
    setClaps((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + (lovedStories.has(id) ? -1 : 1),
    }));
    setLovedStories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 2xl:px-24 py-8 sm:py-12 relative z-10">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-pink-500/20 border border-pink-400/40 text-pink-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Real Stories & Happy Couples</span>
          </span>
        </div>

        <button
          onClick={onBackToHome}
          className="text-xs sm:text-sm font-bold text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1 cursor-pointer"
        >
          ← Back to Home
        </button>
      </div>

      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
          Where Dating Science Turns Into{' '}
          <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300 bg-clip-text text-transparent">
            Forever
          </span>{' '}
          💖
        </h1>
        <p className="text-sm sm:text-base text-pink-100/80 leading-relaxed">
          Over 14,800 couples have met, gotten engaged, and married through LoveConnect.
          Discover their stories, magical milestones, and how they found their soulmates.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8">
          <div className="bg-[#180b33]/90 border border-pink-500/30 rounded-2xl p-4 shadow-lg">
            <span className="text-2xl sm:text-3xl font-black text-pink-400 block">14,820+</span>
            <span className="text-[11px] sm:text-xs text-pink-200/80 font-semibold">Weddings & Engagements</span>
          </div>
          <div className="bg-[#180b33]/90 border border-pink-500/30 rounded-2xl p-4 shadow-lg">
            <span className="text-2xl sm:text-3xl font-black text-amber-300 block">98.6%</span>
            <span className="text-[11px] sm:text-xs text-pink-200/80 font-semibold">Neural Compatibility</span>
          </div>
          <div className="bg-[#180b33]/90 border border-pink-500/30 rounded-2xl p-4 shadow-lg">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 block">21 Days</span>
            <span className="text-[11px] sm:text-xs text-pink-200/80 font-semibold">Avg. Days to 1st Date</span>
          </div>
          <div className="bg-[#180b33]/90 border border-pink-500/30 rounded-2xl p-4 shadow-lg">
            <span className="text-2xl sm:text-3xl font-black text-purple-300 block">45+</span>
            <span className="text-[11px] sm:text-xs text-pink-200/80 font-semibold">Countries Connected</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
        {tags.map((tag) => {
          const isSelected = selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/40 scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-pink-200 hover:text-white border border-pink-500/20'
              }`}
            >
              {tag === 'All' ? '🌟 All Stories' : tag}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
        {filteredStories.map((story) => {
          const isLoved = lovedStories.has(story.id);
          const loveCount = claps[story.id] || 350;

          return (
            <div
              key={story.id}
              id={`story-card-${story.id}`}
              className="bg-gradient-to-b from-[#1b0c38] to-[#110624] border border-pink-500/30 hover:border-pink-400/70 rounded-3xl overflow-hidden shadow-2xl hover:shadow-pink-500/20 transition-all duration-300 flex flex-col group"
            >
              <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-gray-900">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b0c38] via-transparent to-black/30 pointer-events-none" />

                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-pink-400/40 text-pink-300 text-xs font-black shadow-md">
                  <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-400" />
                  <span>{story.yearsTogether}</span>
                </div>

                {story.tag && (
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white text-[11px] font-extrabold shadow-md">
                    {story.tag}
                  </div>
                )}

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-1 font-semibold text-pink-200">
                    <MapPin className="w-3.5 h-3.5 text-pink-400" />
                    <span>{story.location}</span>
                  </div>
                  {story.dateMet && (
                    <div className="flex items-center gap-1 text-[11px] text-pink-300/90 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{story.dateMet}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h3 className="text-xl font-extrabold text-white group-hover:text-pink-300 transition-colors">
                      {story.name}
                    </h3>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  <div className="relative pl-6 mb-4 text-pink-100 font-semibold text-sm italic leading-relaxed">
                    <Quote className="w-4 h-4 text-pink-400/80 absolute left-0 top-0.5 rotate-180" />
                    <span>"{story.quote}"</span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
                    {story.story}
                  </p>
                </div>

                <div className="pt-4 border-t border-pink-500/20 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Couple</span>
                  </div>

                  <button
                    onClick={() => handleLoveStory(story.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      isLoved
                        ? 'bg-pink-500/30 border border-pink-400 text-pink-300 shadow-md'
                        : 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLoved ? 'fill-pink-400 text-pink-400 animate-bounce' : 'text-gray-400'}`} />
                    <span>{loveCount}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#8b24d6] via-[#ec4899] to-[#f97316] p-8 sm:p-12 shadow-2xl text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl text-center md:text-left space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Ready to write your own love story?</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            Your love story begins with a simple hello
          </h2>
          <p className="text-sm sm:text-base text-pink-100/90 leading-relaxed">
            Thousands of verified singles who match your passions, goals, and lifestyle are waiting to meet you.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <button
            onClick={onFindMatch}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white text-gray-900 font-extrabold text-sm shadow-xl hover:bg-pink-50 hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>View My Matches</span>
            <ArrowRight className="w-4 h-4 text-pink-600" />
          </button>
          <button
            onClick={onJoinFree}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-black/30 hover:bg-black/40 border border-white/30 text-white font-extrabold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Join for Free</span>
          </button>
        </div>
      </div>
    </div>
  );
};
