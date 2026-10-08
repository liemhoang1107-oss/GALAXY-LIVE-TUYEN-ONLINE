import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, ArrowRight, Eye } from 'lucide-react';
import { FOUNDER_INFO } from '../data/mockData';

interface GalaxyLiveShowcaseBannerProps {
  onOpenVideo?: () => void;
}

export const GalaxyLiveShowcaseBanner: React.FC<GalaxyLiveShowcaseBannerProps> = () => {
  const [activeTier, setActiveTier] = useState<number | null>(null);

  useEffect(() => {
    // Clean up any stale localStorage override so it always shows the permanent official photo
    try {
      localStorage.removeItem('galaxy_idol_nhung_avatar');
    } catch {
      // ignore
    }
  }, []);

  const idolTiers = [
    {
      tier: '10 TRIỆU',
      period: '/ THÁNG',
      label: 'Khởi Nghiệp (Tháng 1)',
      name: 'Kẹo Biết Yêu',
      viewers: '2.5K',
      platform: 'Bigo Live',
      talent: 'ID: Keobietyeu',
      image: 'https://i.ibb.co/dJk107nf/IMG-5710.jpg',
      badgeColor: 'from-cyan-400 to-blue-500'
    },
    {
      tier: '20 TRIỆU',
      period: '/ THÁNG',
      label: 'Tăng Tốc (Tháng 2-3)',
      name: 'Hương Giang',
      viewers: '3.8K',
      platform: 'TikTok Live',
      talent: 'Livestream PK & Hát',
      image: 'https://i.ytimg.com/vi/_sNEbarb5IU/hqdefault.jpg',
      badgeColor: 'from-blue-400 to-indigo-500',
      hasVideo: true
    },
    {
      tier: '30 TRIỆU',
      period: '/ THÁNG',
      label: 'Top Doanh Thu 3 Tháng',
      name: 'Changmy',
      viewers: '5.8K',
      platform: 'Bigo Live',
      talent: 'ID: Changmy',
      image: 'https://i.ibb.co/xKY9RjSG/IMG-5713.jpg',
      badgeColor: 'from-purple-400 to-pink-500'
    },
    {
      tier: '35 TRIỆU',
      period: '/ THÁNG',
      label: 'Live 2 Nền Tảng',
      name: 'NHUNG ❤️',
      viewers: '8.9K',
      platform: 'TIKTOK / BIGO',
      talent: 'Tâm sự & Ca hát',
      image: 'https://i.ibb.co/jvDMb758/IMG-5567.jpg',
      badgeColor: 'from-pink-500 via-rose-500 to-amber-400',
      isNhung: true
    },
    {
      tier: '40 TRIỆU',
      period: '/ THÁNG',
      label: 'Idol Dance Hot App',
      name: 'Linh Sobin',
      viewers: '7.6K',
      platform: 'Bigo Live',
      talent: 'ID: Linhsobin17.02',
      image: 'https://i.ibb.co/qYL9RDBM/IMG-5712.jpg',
      badgeColor: 'from-amber-400 to-orange-500'
    },
    {
      tier: '80 TRIỆU',
      period: '/ THÁNG',
      label: 'Top Star Agency',
      name: 'Linh Miêu',
      viewers: '12.4K',
      platform: 'Bigo Live',
      talent: 'Top 1 BXH Kim Cương',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      badgeColor: 'from-yellow-300 via-amber-400 to-yellow-500'
    }
  ];

  return (
    <section className="relative py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Outer Galactic Container */}
      <div className="max-w-7xl mx-auto rounded-3xl p-1 bg-gradient-to-r from-blue-600/40 via-cyan-500/30 to-purple-600/40 shadow-2xl shadow-cyan-950/60 relative">
        
        {/* Deep cosmic nebula background */}
        <div className="relative rounded-[22px] bg-[#070c24] border border-cyan-400/20 p-6 sm:p-10 lg:p-12 overflow-hidden">
          
          {/* Galactic orbit ring glow background */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
            style={{
              background: 'radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.45) 0%, rgba(147, 51, 234, 0.25) 50%, transparent 80%)'
            }}
          />

          {/* Starlight sparkles */}
          <div className="absolute top-6 left-12 text-cyan-300 animate-pulse pointer-events-none">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="absolute top-10 right-16 text-amber-300 animate-bounce pointer-events-none">
            <Sparkles className="w-6 h-6" />
          </div>

          {/* Banner Title Header */}
          <div className="text-center relative z-10 mb-10 sm:mb-14">
            <div className="inline-block relative">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-slate-200 drop-shadow-[0_2px_15px_rgba(56,189,248,0.5)] font-['Cabinet_Grotesk']">
                GALAXY LIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-amber-300 font-extrabold italic">AGENCY</span>
              </h2>
              {/* Ethereal golden orbit ring simulation */}
              <div className="absolute -top-3 -right-6 w-32 h-14 border border-amber-300/40 rounded-full rotate-[-15deg] pointer-events-none hidden sm:block" />
            </div>

            <p className="text-xs sm:text-sm uppercase tracking-widest text-cyan-300/90 font-bold mt-2 flex items-center justify-center gap-2">
              <span className="w-8 h-[1px] bg-cyan-400/50" />
              <span>DÀN IDOL HOT & BẬC THANG THU NHẬP ĐƯỢC HUẤN LUYỆN BỞI MENTOR</span>
              <span className="w-8 h-[1px] bg-cyan-400/50" />
            </p>
          </div>

          {/* Main Visual Layout: Mentor on the Left + 6 Livestream Phone Frames */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
            
            {/* Mentor Card (Left 3 cols on desktop) */}
            <div className="lg:col-span-3 flex flex-col items-center justify-center">
              <div className="relative group w-full max-w-[240px] lg:max-w-none">
                
                {/* Glow ring around Mentor */}
                <div className="absolute -inset-1 bg-gradient-to-t from-amber-500 via-cyan-500 to-blue-600 rounded-3xl blur-md opacity-50 group-hover:opacity-80 transition duration-500" />
                
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-950 border border-cyan-400/40 shadow-2xl flex flex-col justify-end p-4">
                  <img
                    src={FOUNDER_INFO.avatarUrl}
                    alt={`Mentor ${FOUNDER_INFO.name}`}
                    className="absolute inset-0 w-full h-full object-cover object-top filter contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060814]/95 via-transparent to-black/20" />

                  {/* Mentor Gold Plaque Label */}
                  <div className="relative z-10 text-center">
                    <div className="inline-block px-4 py-1 rounded-lg bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-black font-black text-xs uppercase tracking-widest shadow-lg shadow-amber-500/40 mb-1 border border-white/40">
                      ★ MENTOR ★
                    </div>
                    <h3 className="text-lg font-black text-white">{FOUNDER_INFO.name}</h3>
                    <p className="text-[11px] text-cyan-300 font-medium">Head of Training & Agency</p>
                  </div>
                </div>

              </div>

              <div className="text-center mt-3 text-xs text-slate-400 max-w-[220px]">
                Huấn luyện 1:1 cầm tay chỉ việc từ số 0 đến Top Idol
              </div>
            </div>

            {/* 6 Livestream Phone Frames */}
            <div className="lg:col-span-9">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {idolTiers.map((item, idx) => {
                  const isHovered = activeTier === idx;
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setActiveTier(idx)}
                      onMouseLeave={() => setActiveTier(null)}
                      className={`relative flex flex-col rounded-2xl p-1 bg-gradient-to-b from-cyan-400/50 via-blue-600/30 to-purple-600/40 transition-all duration-300 shadow-xl ${
                        item.isNhung ? 'ring-2 ring-pink-500/70' : ''
                      } ${
                        isHovered ? '-translate-y-2 scale-[1.03] shadow-cyan-500/30' : 'hover:-translate-y-1'
                      }`}
                    >
                      {/* Phone Livestream Screen Body */}
                      <div className="relative aspect-[9/16] rounded-[18px] overflow-hidden bg-slate-950 flex flex-col justify-between p-2 border border-white/10 group/phone">
                        
                        {/* Streamer Photo Frame */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="absolute inset-0 w-full h-full object-cover object-top filter contrast-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60 pointer-events-none" />

                        {/* Top Stream Status: LIVE badge + Viewers Count */}
                        <div className="relative z-10 flex items-center justify-between">
                          <span className="px-1 py-0.5 rounded bg-red-600 text-[8px] font-black text-white uppercase tracking-wider flex items-center gap-0.5 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            LIVE
                          </span>
                          <span className="px-1 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[8px] font-bold text-slate-200 border border-white/10 flex items-center gap-0.5">
                            <Eye className="w-2.5 h-2.5 text-cyan-400" />
                            <span>{item.viewers}</span>
                          </span>
                        </div>

                        {/* Floating Stream Hearts Simulation */}
                        <div className="absolute right-2 bottom-14 space-y-1 z-10 pointer-events-none">
                          <Heart className="w-3 h-3 text-pink-400 fill-current animate-bounce opacity-80" />
                          <Heart className="w-2.5 h-2.5 text-cyan-400 fill-current animate-pulse opacity-90" />
                        </div>

                        {/* Streamer Name & Stage Details */}
                        <div className="relative z-10 text-left pt-1">
                          <div className="text-[9px] text-cyan-300 font-bold uppercase truncate flex items-center gap-1">
                            <span>{item.platform}</span>
                            {item.isNhung && <span className="text-[8px] px-1 rounded bg-pink-500/30 text-pink-200 font-semibold">2 App</span>}
                          </div>
                          <div className="text-[11px] font-black text-white drop-shadow truncate">
                            {item.name}
                          </div>
                          <div className="text-[8px] text-slate-300 drop-shadow truncate">
                            {item.talent}
                          </div>
                        </div>

                      </div>

                      {/* Tier Income Amount */}
                      <div className="pt-2 pb-1 px-1 text-center bg-[#070b20] rounded-b-[18px]">
                        <div className="text-xs sm:text-sm font-black text-amber-300 tracking-tight leading-none font-['Cabinet_Grotesk']">
                          {item.tier}
                        </div>
                        <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                          {item.period}
                        </div>
                        <div className="text-[8px] text-cyan-400/90 font-medium truncate mt-0.5">
                          {item.label}
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Bottom Footnote */}
          <div className="relative z-10 pt-8 mt-8 border-t border-cyan-500/20 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400 mx-auto sm:mx-0">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="italic font-medium text-slate-300">
                Mức thu nhập minh họa • Không cam kết thu nhập cố định (phụ thuộc vào năng lực và thời gian livestream)
              </span>
            </div>

            <a
              href="#apply"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/30 hover:scale-[1.03] transition-all flex items-center gap-2 flex-shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              <span>Gia Nhập Team Idol Ngay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
