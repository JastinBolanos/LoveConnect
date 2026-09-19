import React from 'react';
import { MessageCircle, Heart, Search, Sparkles, CheckCheck } from 'lucide-react';
import { Member } from '../types';

interface MessagesViewProps {
  members: Member[];
  onOpenChat: (member: Member) => void;
  onBackToHome: () => void;
  onExploreSingles: () => void;
}

export const MessagesView: React.FC<MessagesViewProps> = ({
  members,
  onOpenChat,
  onBackToHome,
  onExploreSingles
}) => {
  // Let's create realistic mock conversations for the matches
  const conversationPreviews = [
    {
      memberId: 'sarah-26',
      lastMessage: 'Hey! Loved your bio about stargazing & synthwave ✨ When are you free?',
      time: '10:42 AM',
      unread: true,
    },
    {
      memberId: 'elena-25',
      lastMessage: 'Totally agree on sunset photography! Have you visited the south beach piers?',
      time: 'Yesterday',
      unread: true,
    },
    {
      memberId: 'camila-24',
      lastMessage: 'That holographic lighting concept sounds unreal! Would love to chat more.',
      time: 'Yesterday',
      unread: true,
    },
    {
      memberId: 'chloe-27',
      lastMessage: 'Did you hear the new synth album that dropped last week?',
      time: 'Tuesday',
      unread: false,
    },
    {
      memberId: 'valeria-26',
      lastMessage: 'Ocean sunsets never get old 🌅',
      time: 'Sep 15',
      unread: false,
    },
  ];

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 2xl:px-24 py-8 sm:py-12">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-white flex items-center gap-3">
            <MessageCircle className="w-8 h-8 text-pink-400 fill-pink-500/30" />
            <span>Tus Conversaciones</span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-300">
              3 Nuevos Mensajes
            </span>
          </h1>
          <p className="text-sm text-pink-200/80 mt-1">
            Chatea con tus matches y conoce personas afines en tiempo real.
          </p>
        </div>

        <button
          onClick={onBackToHome}
          className="text-xs sm:text-sm font-bold text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1 cursor-pointer"
        >
          ← Volver a Inicio
        </button>
      </div>

      {/* Messages Inbox Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Conversations list */}
        <div className="lg:col-span-2 space-y-3">
          {conversationPreviews.map((conv) => {
            const member = members.find((m) => m.id === conv.memberId) || members[0];
            return (
              <div
                key={conv.memberId}
                id={`conversation-item-${conv.memberId}`}
                onClick={() => onOpenChat(member)}
                className={`flex items-center gap-4 p-4 sm:p-5 rounded-3xl border transition-all duration-200 cursor-pointer ${
                  conv.unread
                    ? 'bg-[#1e0e3f] border-pink-500/50 shadow-lg shadow-pink-950/40 hover:border-pink-400'
                    : 'bg-[#14082c] border-pink-500/20 hover:border-pink-500/40'
                }`}
              >
                {/* Avatar with Status */}
                <div className="relative shrink-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-pink-400 shadow-md"
                    referrerPolicy="no-referrer"
                  />
                  {member.isOnline && (
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 border-2 border-[#120826] rounded-full shadow-sm" />
                  )}
                </div>

                {/* Content preview */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-white truncate">
                        {member.name}, {member.age}
                      </h3>
                      <span className="text-xs font-semibold text-pink-400">
                        {member.matchScore}%
                      </span>
                    </div>
                    <span className="text-xs text-pink-300/70">{conv.time}</span>
                  </div>

                  <p className={`text-xs sm:text-sm truncate ${conv.unread ? 'text-pink-100 font-semibold' : 'text-gray-400'}`}>
                    {conv.lastMessage}
                  </p>
                </div>

                {/* Action / Unread marker */}
                <div className="shrink-0 flex items-center gap-2">
                  {conv.unread ? (
                    <span className="w-3 h-3 rounded-full bg-pink-500 animate-pulse" />
                  ) : (
                    <CheckCheck className="w-4 h-4 text-pink-400/60" />
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenChat(member);
                    }}
                    className="hidden sm:inline-flex px-3.5 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500 text-xs font-bold text-pink-300 hover:text-white transition-all cursor-pointer"
                  >
                    Abrir
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Quick actions & Icebreakers */}
        <div className="space-y-6">
          <div className="bg-[#180b33] border border-pink-500/30 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center gap-2 text-pink-400 font-extrabold text-sm mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Sugerencias para Iniciar Charlas</span>
            </div>
            <p className="text-xs text-pink-100/70 mb-4 leading-relaxed">
              Las parejas que preguntan sobre música y viajes reciben un 82% más de respuestas el mismo día.
            </p>
            <div className="space-y-2">
              <div className="p-3 bg-white/5 rounded-2xl text-xs text-pink-200 border border-pink-500/20 italic">
                "¿Cuál es el mejor concierto o viaje que has vivido?"
              </div>
              <div className="p-3 bg-white/5 rounded-2xl text-xs text-pink-200 border border-pink-500/20 italic">
                "Noté tu afinidad en arte... ¿qué proyecto te apasiona ahora?"
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl p-6 text-white shadow-xl text-center space-y-3">
            <Heart className="w-8 h-8 text-white fill-white mx-auto animate-bounce" />
            <h4 className="font-extrabold text-base">¿Buscas más conexiones?</h4>
            <p className="text-xs text-pink-100/90 leading-relaxed">
              Explora nuevos perfiles verificados que coinciden con tus gustos y valores.
            </p>
            <button
              onClick={onExploreSingles}
              className="w-full py-2.5 rounded-xl bg-white text-gray-900 font-bold text-xs hover:bg-pink-50 transition-colors shadow-md cursor-pointer"
            >
              Explorar Solteros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
