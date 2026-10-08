import React, { useState } from 'react';
import { 
  Sparkles, Play, DollarSign, Flame, Award, Users, 
  CheckCircle2, ArrowRight, MessageSquare, Zap, ShieldCheck 
} from 'lucide-react';
import { FOUNDER_INFO } from '../data/mockData';

interface DanceTeamSectionProps {
  onSelectPlatform: (platform: string) => void;
}

export const DanceTeamSection: React.FC<DanceTeamSectionProps> = ({ onSelectPlatform }) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const youtubeVideoId = 'Vd09MfGv0t8';

  const handleApplyNow = () => {
    onSelectPlatform('dance_offline');
    const formEl = document.getElementById('apply');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="dance-team" className="py-20 bg-gradient-to-b from-[#060919] via-[#090d26] to-[#070a1b] relative overflow-hidden">
      {/* Background neon ambient lights */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-pink-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 border border-pink-500/40 text-xs font-black text-pink-300 mb-4 shadow-lg shadow-pink-500/10">
            <Flame className="w-4 h-4 text-pink-400 animate-pulse" />
            <span className="tracking-wider uppercase">ĐẶC BIỆT: CHIÊU MỘ NHÓM NHẢY OFFLINE STUDIO</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            TUYỂN DỤNG <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300">NHÓM NHẢY DANCE TEAM</span> OFFLINE
          </h2>

          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-pink-500/10 to-cyan-500/10 border border-amber-400/30 max-w-2xl mx-auto">
            <p className="text-base sm:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 uppercase tracking-wide">
              💰 LƯƠNG CỨNG + DOANH THU KHỦNG
            </p>
            <p className="text-xs sm:text-sm text-slate-200 font-semibold mt-1 italic">
              "Lương cao – Tiền kiếm theo sự kiên trì và siêng năng của các bạn!"
            </p>
          </div>
        </div>

        {/* Main Content Layout: Video on Left, Policy & Benefits on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: YouTube Shorts Dance Showcase (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-[340px] relative">
              
              {/* Outer Neon Glow Ring */}
              <div className="absolute -inset-2 bg-gradient-to-b from-pink-500 via-purple-600 to-cyan-500 rounded-[32px] blur-lg opacity-60 animate-pulse" />
              
              {/* Phone Aspect 9:16 Frame */}
              <div className="relative aspect-[9/16] rounded-[28px] overflow-hidden bg-black border-2 border-pink-400/50 shadow-2xl flex flex-col justify-between">
                
                {isPlayingVideo ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}?autoplay=1&rel=0&loop=1`}
                    title="Nhóm Nhảy Livestream Galaxy Live Team"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    {/* Video Poster Thumbnail */}
                    <img
                      src={`https://i.ytimg.com/vi/${youtubeVideoId}/hqdefault.jpg`}
                      alt="Nhóm Nhảy Dance Team Galaxy Live"
                      className="absolute inset-0 w-full h-full object-cover object-center filter contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/60 pointer-events-none" />

                    {/* Top Status Badges */}
                    <div className="relative z-10 p-4 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-red-600 text-[10px] font-black text-white uppercase tracking-wider flex items-center gap-1 shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        LIVE STUDIO
                      </span>
                      <span className="px-2 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-cyan-300 border border-cyan-400/30">
                        OFFLINE DANCE
                      </span>
                    </div>

                    {/* Big Center Play Button */}
                    <div className="relative z-10 my-auto text-center">
                      <button
                        onClick={() => setIsPlayingVideo(true)}
                        className="w-16 h-16 rounded-full bg-pink-600/90 hover:bg-pink-500 text-white flex items-center justify-center mx-auto shadow-2xl shadow-pink-600/60 ring-4 ring-white/30 transition-transform hover:scale-110 active:scale-95 group/play"
                        title="Xem video nhảy thực tế tại Studio"
                      >
                        <Play className="w-7 h-7 fill-current translate-x-0.5" />
                      </button>
                      <div className="text-[11px] font-extrabold text-white mt-2 drop-shadow tracking-wide">
                        BẤM XEM CLIP THỰC TẾ TẠI STUDIO
                      </div>
                    </div>

                    {/* Bottom Details Box */}
                    <div className="relative z-10 p-4 text-left bg-gradient-to-t from-black via-black/80 to-transparent">
                      <div className="text-xs font-black text-white flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                        <span>Galaxy Live Dance Crew</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                        Buổi livestream vũ đạo sôi động tại Studio Galaxy Live. Khán giả tương tác và nổ quà PK liên tục!
                      </p>
                    </div>
                  </>
                )}

              </div>

              <div className="text-center mt-3 text-xs text-slate-400">
                Studio chuẩn quốc tế tại Hà Nội & TP. Hồ Chí Minh
              </div>
            </div>
          </div>

          {/* Right Column: Policy, Benefits & Fast Track (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Pillar 1 */}
              <div className="p-4 rounded-2xl bg-[#0e1438] border border-pink-500/30 hover:border-pink-400/60 transition-all shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center mb-3">
                  <DollarSign className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-black text-white">Lương Cứng Đảm Bảo Hàng Tháng</h4>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  Nhận lương cứng cố định theo hợp đồng minh bạch, hỗ trợ chi phí sinh hoạt từ ngày đầu tiên gia nhập nhóm.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-2xl bg-[#0e1438] border border-amber-500/30 hover:border-amber-400/60 transition-all shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-3">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-black text-white">Chia Sẻ Doanh Thu Không Giới Hạn</h4>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  Tỷ lệ chia sẻ tiền quà tặng và đậu donate cao nhất thị trường. Càng siêng năng, thu nhập càng chạm mốc 30M - 80M+/tháng.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-2xl bg-[#0e1438] border border-cyan-500/30 hover:border-cyan-400/60 transition-all shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-black text-white">Tuyển Nhóm Sẵn Có & Cá Nhân</h4>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  Tiếp nhận nhóm bạn bè đã có sẵn từ 2 đến 5 bạn, hoặc cá nhân có đam mê nhảy vũ đạo để xếp vào đội hình phù hợp.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-2xl bg-[#0e1438] border border-purple-500/30 hover:border-purple-400/60 transition-all shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-black text-white">Tài Trợ Studio, Nhạc & Trang Phục</h4>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  Phòng tập sàn gỗ, gương lớn, đèn sân khấu 3D, camera 4K, hỗ trợ biên đạo và trang phục biểu diễn theo trend hot.
                </p>
              </div>

            </div>

            {/* Checklist: Ai phù hợp tham gia? */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0e1333] to-slate-900 border border-white/10 space-y-3">
              <h4 className="text-xs font-black text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Tiêu Chí Tuyển Chọn Nhóm Nhảy Dance Offline:</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Độ tuổi từ 18 – 26 tuổi, ngoại hình sáng</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Đam mê nhảy hiện đại, K-Pop, sexy dance, TikTok dance</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Tinh thần kiên trì, chịu khó, siêng năng tập luyện</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Có thể livestream trực tiếp tại Studio của Agency</span>
                </div>
              </div>
            </div>

            {/* Direct CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleApplyNow}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-pink-600/30 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>ỨNG TUYỂN NHÓM NHẢY NGAY</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={FOUNDER_INFO.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600/90 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 border border-blue-400/40 shadow-lg transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Nhắn Zalo CEO {FOUNDER_INFO.name} ({FOUNDER_INFO.phoneDisplay})</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
