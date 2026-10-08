import React, { useState, useEffect } from 'react';
import { Sparkles, Flame, CheckCircle2, Trophy, Heart, Gift, Award, TrendingUp, ArrowRight, ShieldCheck } from 'lucide-react';
import { FOUNDER_INFO } from '../data/mockData';

export const HeroSection: React.FC = () => {
  const [likesCount, setLikesCount] = useState(12840);
  const [hasLiked, setHasLiked] = useState(false);
  const [pkProgress, setPkProgress] = useState(62);
  const [activeGift, setActiveGift] = useState<string | null>(null);

  // Auto-increment likes slowly to give dynamic livestream feel
  useEffect(() => {
    const interval = setInterval(() => {
      setLikesCount(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const triggerGift = (giftName: string) => {
    setActiveGift(giftName);
    setPkProgress(prev => Math.min(prev + 8, 92));
    setTimeout(() => {
      setActiveGift(null);
    }, 2500);
  };

  const handleLike = () => {
    setLikesCount(prev => prev + 1);
    setHasLiked(true);
    setTimeout(() => setHasLiked(false), 300);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Decorative cosmic glow ring behind hero */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-500/10 via-purple-500/15 to-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Recruitment Pitch & Value Prop */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Platform partnership badges */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/90 border border-cyan-500/30 text-xs text-slate-200 mb-6 backdrop-blur-md shadow-lg shadow-cyan-950/40">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="font-semibold text-cyan-300">BIGO LIVE & TIKTOK LIVE</span>
              <span className="text-slate-500">·</span>
              <span className="text-amber-300 flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> Đối tác Kim Cương
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15] mb-6">
              TUYỂN DỤNG <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">IDOL LIVESTREAM</span> CHUYÊN NGHIỆP
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8 font-normal">
              Biến thời gian rảnh thành thu nhập thực tế từ <span className="text-amber-300 font-bold">20 - 35+ Triệu VNĐ/tháng</span>. 
              Đào tạo 1-1 miễn phí từ số 0, tài trợ trọn bộ đèn & mic live studio, 
              cam kết lương cứng và bảo trợ độc quyền bởi <strong className="text-white">CEO {FOUNDER_INFO.name}</strong>.
            </p>

            {/* Key Value Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="text-xs text-slate-200 font-medium">0đ Chi Phí Gia Nhập</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-xs text-slate-200 font-medium">Lương Cứng Đảm Bảo</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-xs text-slate-200 font-medium">Tài Trợ Đèn & Mic Live</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <a
                href="#apply"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-extrabold text-base shadow-xl shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 group"
              >
                <Sparkles className="w-5 h-5 text-cyan-200 group-hover:rotate-12 transition-transform" />
                <span>NỘP ĐƠN ỨNG TUYỂN NGAY</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#calculator"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold text-sm border border-slate-700/80 hover:border-cyan-500/50 transition-all flex items-center justify-center gap-2"
              >
                <span>Tính Nhanh Thu Nhập Dự Kiến</span>
                <span className="text-amber-400 font-semibold">&rarr;</span>
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-cyan-400">500+</div>
                <div className="text-xs text-slate-400 mt-0.5">Idol Đang Hoạt Động</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400">100%</div>
                <div className="text-xs text-slate-400 mt-0.5">Đào Tạo 1:1 Miễn Phí</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-purple-400">10 Tỷ+</div>
                <div className="text-xs text-slate-400 mt-0.5">Tiền Thưởng Đã Chi Trả</div>
              </div>
            </div>

          </div>

          {/* Right Column: Live Stream Simulator & Galaxy Stage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[380px] rounded-3xl p-1 bg-gradient-to-b from-cyan-500/40 via-purple-500/30 to-slate-800/80 shadow-2xl shadow-cyan-900/30">
              
              {/* Inner Stream Box */}
              <div className="relative bg-[#0d1226] rounded-[22px] overflow-hidden border border-white/10">
                
                {/* Livestream Header Bar */}
                <div className="p-3.5 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between z-20 relative">
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <img 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
                        alt="Idol Avatar" 
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-cyan-400"
                      />
                      <span className="absolute -bottom-1 -right-1 px-1 py-0.2 bg-red-600 rounded text-[9px] font-bold text-white uppercase tracking-wider">
                        LIVE
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-white">Linh Miêu (Baby Linh)</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                      <span className="text-[10px] text-cyan-300 font-medium">Bigo Live · Top 1 BXH</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/60 border border-white/10 text-[11px] text-slate-200">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="font-semibold">14.8K</span>
                  </div>
                </div>

                {/* Stream Video Frame / Visual Background */}
                <div className="relative h-[340px] bg-slate-900 overflow-hidden flex flex-col justify-end p-4">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80"
                    alt="Idol Streamer" 
                    className="absolute inset-0 w-full h-full object-cover object-center filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090d1f] via-transparent to-black/40" />

                  {/* Simulated PK Battle Bar */}
                  <div className="absolute top-2 left-3 right-3 z-10 bg-black/70 backdrop-blur-md rounded-xl p-2 border border-white/10">
                    <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                      <span className="text-cyan-400 flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5" /> Idol Linh Miêu: 68.200 pts
                      </span>
                      <span className="text-pink-400">Opponent: 31.800 pts</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden flex">
                      <div 
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full transition-all duration-500"
                        style={{ width: `${pkProgress}%` }}
                      />
                      <div 
                        className="bg-gradient-to-r from-pink-500 to-red-500 h-full transition-all duration-500"
                        style={{ width: `${100 - pkProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Active Gift Banner Popup */}
                  {activeGift && (
                    <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none bg-black/30 backdrop-blur-[2px]">
                      <div className="text-center animate-bounce">
                        <div className="text-4xl mb-1">🎁✨</div>
                        <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 text-white text-xs font-black shadow-xl uppercase tracking-wider">
                          Vừa Gửi: {activeGift}!
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Stream Chat Simulation */}
                  <div className="space-y-1.5 z-10 mb-2">
                    <div className="inline-block px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[11px] border border-white/10">
                      <span className="text-cyan-300 font-bold">Thành Đạt:</span>{' '}
                      <span className="text-white">Idol hát hay quá, tặng full Tinh Cầu Galaxy nhé! 🚀</span>
                    </div>
                    <div className="inline-block px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[11px] border border-white/10">
                      <span className="text-amber-300 font-bold">Bigo Master:</span>{' '}
                      <span className="text-slate-200">Đã vào team Hoàng Liêm Agency, tuần này tăng 500k beans!</span>
                    </div>
                  </div>

                  {/* Bottom stream actions */}
                  <div className="flex items-center justify-between gap-2 z-10 pt-2 border-t border-white/10">
                    <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                      <button
                        onClick={() => triggerGift('Rồng Lửa Bigo')}
                        className="px-2 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[11px] font-bold border border-amber-500/30 flex items-center gap-1 transition-all active:scale-95"
                      >
                        <Gift className="w-3 h-3" />
                        <span>Rồng Lửa</span>
                      </button>
                      <button
                        onClick={() => triggerGift('Tinh Cầu Galaxy')}
                        className="px-2 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-[11px] font-bold border border-cyan-500/30 flex items-center gap-1 transition-all active:scale-95"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Galaxy</span>
                      </button>
                    </div>

                    <button
                      onClick={handleLike}
                      className={`p-2 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-400 hover:text-pink-300 transition-all flex items-center gap-1 ${
                        hasLiked ? 'scale-125 bg-pink-500 text-white' : ''
                      }`}
                      title="Thả tim"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                      <span className="text-[10px] font-bold">{(likesCount / 1000).toFixed(1)}k</span>
                    </button>
                  </div>

                </div>

                {/* Bottom Card Endorsement: Founder Hoàng Liêm */}
                <div className="p-3 bg-[#0a0f24] border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 p-0.5 overflow-hidden flex-shrink-0">
                      <img 
                        src={FOUNDER_INFO.avatarUrl} 
                        alt={`CEO ${FOUNDER_INFO.name}`}
                        className="w-full h-full object-cover object-top rounded-full"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1">
                        <span>CEO {FOUNDER_INFO.name}</span>
                        <Award className="w-3 h-3 text-amber-400" />
                      </div>
                      <div className="text-[10px] text-slate-400">Head of Talent & Recruitment</div>
                    </div>
                  </div>

                  <a
                    href="#founder"
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-0.5"
                  >
                    <span>Xem Hồ Sơ</span> &rarr;
                  </a>
                </div>

              </div>

            </div>

            {/* Floating Trust Pill */}
            <div className="hidden sm:flex absolute -bottom-5 -left-4 bg-[#0a0f24]/95 border border-cyan-500/30 p-3 rounded-2xl shadow-xl backdrop-blur-md items-center gap-3 z-30">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-slate-950 font-black">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Cam kết doanh thu</div>
                <div className="text-[11px] text-emerald-400 font-medium">98% Idol đạt KPI ngay tháng đầu</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
