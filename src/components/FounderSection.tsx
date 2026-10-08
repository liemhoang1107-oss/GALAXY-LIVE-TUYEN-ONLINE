import React from 'react';
import { Sparkles, Phone, MessageSquare, Mail, Award, ShieldCheck, CheckCircle2, User } from 'lucide-react';
import { FOUNDER_INFO } from '../data/mockData';

export const FounderSection: React.FC = () => {
  return (
    <section id="founder" className="py-20 relative bg-gradient-to-b from-[#090d1f] via-[#070a18] to-[#090d1f] border-t border-b border-white/5">
      {/* Background celestial aura */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>NGƯỜI DẪN ĐƯỜNG & ĐỒNG HÀNH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Gặp Gỡ Ban Lãnh Đạo & Giám Đốc Tuyển Dụng
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Sự thành công của một Idol bắt đầu từ một Agency có tâm, minh bạch và chiến lược bài bản.
          </p>
        </div>

        {/* Main Founder Card */}
        <div className="rounded-3xl p-1 bg-gradient-to-br from-cyan-500/30 via-purple-500/30 to-amber-500/30 shadow-2xl">
          <div className="bg-[#0b1029] rounded-[22px] p-6 sm:p-10 lg:p-12 border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Founder Photo with Cosmic Aurora Vibe */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative group w-full max-w-[340px]">
                  
                  {/* Cosmic Aurora Frame Outer Glow */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-purple-600 to-amber-400 rounded-3xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500" />

                  {/* Image Container with Aurora Styling */}
                  <div className="relative aspect-[9/14] rounded-2xl overflow-hidden bg-[#060815] border border-cyan-400/40 shadow-2xl">
                    
                    {/* Simulated cosmic aurora starlight overlay */}
                    <div 
                      className="absolute inset-0 z-10 pointer-events-none opacity-40 mix-blend-screen"
                      style={{
                        background: 'radial-gradient(ellipse at 50% 20%, rgba(6, 182, 212, 0.6) 0%, rgba(147, 51, 234, 0.4) 40%, transparent 80%)'
                      }}
                    />

                    {/* Starlight sparkles overlay */}
                    <div className="absolute top-4 right-4 z-20 text-cyan-300 animate-pulse pointer-events-none">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div className="absolute bottom-6 left-6 z-20 text-amber-300 animate-bounce pointer-events-none">
                      <Sparkles className="w-5 h-5" />
                    </div>

                    {/* Founder Portrait (Direct User Photo) */}
                    <div className="w-full h-full relative flex flex-col justify-end p-6 bg-[#060815]">
                      <img 
                        src={FOUNDER_INFO.avatarUrl} 
                        alt={`CEO ${FOUNDER_INFO.name}`}
                        className="absolute inset-0 w-full h-full object-cover object-top filter contrast-[1.02]"
                        loading="eager"
                      />
                      {/* Subtle dark gradient overlay at bottom for optimal typography contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#060814]/95 via-[#060814]/30 to-transparent pointer-events-none" />

                      {/* On-image badge */}
                      <div className="relative z-20 text-center">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-cyan-400/50 text-cyan-300 text-xs font-bold mb-2 shadow-lg shadow-black/50">
                          <ShieldCheck className="w-4 h-4 text-cyan-400" />
                          <span>FOUNDER & CEO</span>
                        </div>
                        <h4 className="text-xl font-black text-white drop-shadow-md">{FOUNDER_INFO.name}</h4>
                        <p className="text-xs text-slate-300 drop-shadow">{FOUNDER_INFO.experience}</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column: Founder Vision & Direct Contacts */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
                    <Award className="w-4 h-4" />
                    <span>Hồ sơ người sáng lập & điều hành</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black text-white">
                    CEO {FOUNDER_INFO.name}
                  </h3>
                  <div className="text-sm font-semibold text-slate-300 mt-1">
                    {FOUNDER_INFO.title} · {FOUNDER_INFO.subtitle}
                  </div>
                </div>

                {/* Founder Personal Quote Box */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#080d22] border-l-4 border-cyan-400 border border-white/5 relative">
                  <div className="text-3xl text-cyan-400/30 font-serif absolute top-3 left-4">“</div>
                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed italic pl-5">
                    {FOUNDER_INFO.quote}
                  </p>
                  <div className="text-xs text-cyan-300 font-bold mt-3 pl-5 flex items-center gap-1.5">
                    <span>— CEO {FOUNDER_INFO.name}</span>
                    <span className="text-slate-500">|</span>
                    <span className="text-slate-400 font-normal">Trực tiếp duyệt đơn & phỏng vấn</span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {FOUNDER_INFO.bio}
                </p>

                {/* 3 Core Commitments */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span><strong>100% Đồng hành cá nhân:</strong> Trực tiếp tư vấn định hướng phong cách và kịch bản cho từng Idol.</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span><strong>Minh bạch tài chính:</strong> Doanh thu sao kê rõ ràng theo từng phiên live, không trừ phí vô lý.</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span><strong>Đẩy top nhiệt huyết:</strong> Dùng toàn bộ tài nguyên Agency để buff mắt xem và tạo sự bùng nổ cho bạn.</span>
                  </div>
                </div>

                {/* Direct Action Contacts */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                  <a
                    href={FOUNDER_INFO.zaloUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat Zalo Trực Tiếp ({FOUNDER_INFO.phoneDisplay})</span>
                  </a>

                  <a
                    href={`tel:${FOUNDER_INFO.phone}`}
                    className="px-5 py-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 font-bold text-xs sm:text-sm transition-all flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>Gọi Hotline</span>
                  </a>

                  <a
                    href={`mailto:${FOUNDER_INFO.email}`}
                    className="px-4 py-3 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{FOUNDER_INFO.email}</span>
                  </a>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
