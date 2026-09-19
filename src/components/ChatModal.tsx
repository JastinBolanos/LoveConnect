import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Video, CheckCheck } from 'lucide-react';
import { Member, ChatMessage } from '../types';
import { chatService } from '../services/chatService';

interface ChatModalProps {
  member: Member;
  onClose: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({ member, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'match',
      text: `Hey! I saw your profile and loved your energy ✨ How is your week going?`,
      timestamp: '10:14 AM',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [callNotification, setCallNotification] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = chatService.getQuickReplies(member.name);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const startHologramCall = () => {
    setCallNotification(`Calling ${member.name} via Hologram Video...`);
    setTimeout(() => {
      setCallNotification(`${member.name} is in a session. Sent ping notification!`);
      setTimeout(() => setCallNotification(null), 3000);
    }, 2000);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replies = [
        `Haha that's amazing! Absolutely agree with you! What's your favorite spot in town? 💕`,
        `I knew we'd click! That's so cool. I was just checking out a new gallery downtown! 🎨`,
        `You seem really sweet! We should definitely plan that video date soon! ✨`,
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setMessages((prev) => [
        ...prev,
        {
          id: `match-${Date.now()}`,
          sender: 'match',
          text: randomReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#150a2b] border border-pink-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-pink-900/60 flex flex-col h-[560px] text-white">
        <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-[#200d3d] to-[#160a2c] border-b border-pink-500/20">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={member.image}
                alt={member.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-pink-500 shadow"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#160a2c]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold text-white">{member.name}, {member.age}</h3>
                <span className="text-[10px] bg-pink-500/30 text-pink-300 font-bold px-1.5 py-0.2 rounded-full border border-pink-500/40">
                  {member.matchScore}% Match
                </span>
              </div>
              <p className="text-xs text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active now in {member.city}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={startHologramCall}
              className="p-2 text-pink-300 hover:text-white hover:bg-pink-500/20 rounded-full transition-colors cursor-pointer"
              title="Hologram Call"
            >
              <Video className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {callNotification && (
          <div className="bg-pink-500/20 border-b border-pink-500/40 px-4 py-2 text-xs font-semibold text-pink-200 text-center flex items-center justify-center gap-2 animate-in fade-in">
            <Video className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
            <span>{callNotification}</span>
          </div>
        )}

        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#110624]/60">
          <div className="flex justify-center">
            <span className="px-3 py-1 rounded-full bg-pink-900/40 border border-pink-500/30 text-[11px] text-pink-300 flex items-center gap-1.5 font-medium shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              Connected via Neural Affinity Match ({member.matchScore}%)
            </span>
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-tr-none shadow-md shadow-pink-500/20'
                    : 'bg-[#211140] text-pink-50 border border-pink-500/20 rounded-tl-none shadow-md'
                }`}
              >
                <p>{msg.text}</p>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1 px-1">
                <span>{msg.timestamp}</span>
                {msg.sender === 'user' && (
                  <CheckCheck className="w-3 h-3 text-pink-400" />
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-pink-300 bg-[#211140] w-24 px-3 py-2 rounded-2xl rounded-tl-none border border-pink-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce [animation-delay:0.4s]" />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="px-4 py-2 bg-[#170a2f] border-t border-pink-500/20 flex gap-2 overflow-x-auto no-scrollbar">
          {quickReplies.map((reply, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(reply)}
              className="flex-shrink-0 px-3 py-1 rounded-full text-xs bg-pink-500/10 hover:bg-pink-500/25 border border-pink-500/30 text-pink-200 transition-colors cursor-pointer truncate max-w-xs"
            >
              {reply}
            </button>
          ))}
        </div>

        <div className="p-3 bg-[#1d0d39] border-t border-pink-500/30 flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={`Say something sweet to ${member.name}...`}
            className="flex-1 bg-[#100624] text-white placeholder-gray-400 text-sm px-4 py-2.5 rounded-full border border-pink-500/30 focus:outline-none focus:border-pink-400 transition-colors"
          />

          <button
            onClick={() => handleSendMessage()}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white flex items-center justify-center shadow-lg shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
