import React, { useState } from 'react';
import { Star, Trophy, DollarSign, Clock, CheckCircle2, TrendingUp, Sparkles, Play, X, ExternalLink } from 'lucide-react';
import { TOP_IDOLS_SHOWCASE } from '../data/mockData';

export const IdolShowcase: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'Bigo Live' | 'TikTok Live'>('all');
  const [activeVideo, setActiveVideo] = useState<{ id: string; name: string } | null>(null);

  const filteredIdols = filter === 'all' 
    ? TOP_IDOLS_SHOWCASE 
    : TOP_IDOLS_SHOWCASE.filter(idol => idol.platform === filter || idol.platform === 'Đa Nền Tảng');

  return (
    <section id="showcase" className="py-20 bg-[#070913] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 mb-4">
            <Trophy className="w-3.5 h-3.5" />
            <span>GƯƠNG MẶT IDOL TIÊU BIỂU</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Từ Con Số 0 Đến Thu Nhập 20M – 35M+/Tháng
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Họ từng là những người rụt rè trước ống kính. Và giờ đây họ đã tự tin làm chủ sân khấu và thu nhập của mình.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'Tất Cả Idol' },
            { id: 'Bigo Live', label: 'Top Bigo Live' },
            { id: 'TikTok Live', label: 'Top TikTok Live' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                filter === tab.id
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Idol Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredIdols.map((idol) => (
            <div
              key={idol.id}
              className="bg-[#0b1029] rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between shadow-xl group"
            >
              {/* Photo & Badge */}
              <div className="relative aspect-[3/4] overflow-hidden bg-slate-950">
                <img
                  src={idol.image}
                  alt={idol.name}
                  className="w-full h-full object-cover object-center filter contrast-105 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1029] via-transparent to-black/30" />
                
                {/* Platform tag */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1">
                  <span>{idol.platform}</span>
                </div>

                {/* If Idol has video: Show Video Play Button Badge */}
                {idol.youtubeId && (
                  <button
                    onClick={() => setActiveVideo({ id: idol.youtubeId!, name: idol.name })}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors z-20 group/btn"
                    title={`Xem video của ${idol.name}`}
                  >
                    <div className="w-14 h-14 rounded-full bg-red-600/90 hover:bg-red-500 text-white flex items-center justify-center shadow-2xl shadow-red-600/50 group-hover/btn:scale-110 transition-transform ring-4 ring-white/20">
                      <Play className="w-6 h-6 fill-current translate-x-0.5" />
                    </div>
                    <span className="absolute bottom-12 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-bold text-white border border-white/20 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                      <span>Xem Video Live</span>
                    </span>
                  </button>
                )}

                {/* Achievement Badge */}
                <div className="absolute bottom-3 left-3 right-3 z-10">
                  <div className="px-3 py-1 rounded-lg bg-cyan-950/80 backdrop-blur-md border border-cyan-400/40 text-cyan-300 text-xs font-bold flex items-center justify-between">
                    <span>{idol.badge}</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Body Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">{idol.name}</h3>
                    <span className="text-xs text-slate-400">{idol.age} tuổi</span>
                  </div>
                  <div className="text-xs text-slate-300 mt-1 font-medium flex items-center gap-1">
                    <span>Thế mạnh: {idol.talent}</span>
                  </div>

                  {/* Monthly Income Callout */}
                  <div className="mt-3 p-3 rounded-xl bg-[#12193b] border border-cyan-500/20">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Thu nhập bình quân</div>
                    <div className="text-base font-black text-amber-300 mt-0.5">
                      {idol.monthlyIncome}
                    </div>
                    <div className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                      <TrendingUp className="w-3 h-3" />
                      <span>{idol.growth}</span>
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="mt-3 text-xs text-slate-300 italic line-clamp-3 leading-relaxed">
                    "{idol.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{idol.liveHours}</span>
                  </span>
                  
                  {idol.youtubeId ? (
                    <button
                      onClick={() => setActiveVideo({ id: idol.youtubeId!, name: idol.name })}
                      className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Xem Video</span>
                    </button>
                  ) : (
                    <span className="text-cyan-300 font-semibold">Đã xác minh ✓</span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Video Player Modal */}
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-[380px] bg-[#0c122e] rounded-3xl border border-cyan-500/30 overflow-hidden shadow-2xl">
              
              {/* Modal Header */}
              <div className="p-4 bg-[#090e24] border-b border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span>Video Livestream: {activeVideo.name}</span>
                  </div>
                  <div className="text-[10px] text-cyan-400">Hoàng Liêm Entertainment · TikTok Live</div>
                </div>

                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* YouTube Shorts Embed Frame (Vertical Aspect Ratio 9:16) */}
              <div className="relative aspect-[9/16] w-full bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&rel=0&loop=1`}
                  title={`Video ${activeVideo.name}`}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Modal Footer CTA */}
              <div className="p-4 bg-[#090e24] border-t border-white/10 flex items-center justify-between gap-3">
                <a
                  href="#apply"
                  onClick={() => setActiveVideo(null)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider text-center shadow-lg hover:scale-[1.02] transition-transform"
                >
                  Ứng Tuyển Để Tỏa Sáng Như {activeVideo.name} &rarr;
                </a>
              </div>

            </div>
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-purple-950/30 to-slate-900 border border-cyan-500/20 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-base font-bold text-white">Bạn Sẽ Là Ngôi Sao Tiếp Theo Của Galaxy Live?</h4>
            <p className="text-xs text-slate-400 mt-0.5">Mọi hành trình vạn dặm đều bắt đầu từ một bước đi nộp đơn đầu tiên.</p>
          </div>
          <a
            href="#apply"
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 flex-shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Đăng Ký Gia Nhập Ngay</span>
          </a>
        </div>

      </div>
    </section>
  );
};
