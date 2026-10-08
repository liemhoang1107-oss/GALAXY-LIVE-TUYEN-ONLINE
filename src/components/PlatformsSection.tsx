import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, Flame, ArrowRight, Video, Gift, Award, DollarSign } from 'lucide-react';
import { PLATFORMS_DATA } from '../data/mockData';

interface PlatformsSectionProps {
  onSelectPlatform: (platformId: string) => void;
}

export const PlatformsSection: React.FC<PlatformsSectionProps> = ({ onSelectPlatform }) => {
  const [activePlatformId, setActivePlatformId] = useState<string>('bigo');

  const selectedPlatform = PLATFORMS_DATA.find(p => p.id === activePlatformId) || PLATFORMS_DATA[0];

  return (
    <section id="platforms" className="py-20 bg-[#090d1f]/60 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 mb-4">
            <Video className="w-3.5 h-3.5" />
            <span>NỀN TẢNG ĐỐI TÁC CHIẾN LƯỢC</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Lựa Chọn Sân Khấu Tỏa Sáng Của Bạn
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Galaxy Live Agency là đối tác phân phối và quản lý Idol chính thức của các ứng dụng hàng đầu. 
            Bạn có thể chọn 1 app sở trường hoặc live song song để tối đa hóa thu nhập.
          </p>
        </div>

        {/* Platform Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {PLATFORMS_DATA.map((plat) => {
            const isActive = plat.id === activePlatformId;
            return (
              <button
                key={plat.id}
                onClick={() => setActivePlatformId(plat.id)}
                className={`px-5 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all flex items-center gap-2.5 border ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/20 scale-[1.02]'
                    : 'bg-slate-900/80 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-cyan-400 animate-ping' : 'bg-slate-600'}`} />
                <span>{plat.name}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-cyan-300 font-normal">
                  {plat.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Platform Feature Box */}
        <div className="relative rounded-3xl p-1 bg-gradient-to-br from-cyan-500/30 via-indigo-500/20 to-purple-500/30 shadow-2xl">
          <div className="bg-[#0b1026] rounded-[22px] p-6 sm:p-10 border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Platform Overview & Highlights */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                      {selectedPlatform.badge}
                    </span>
                    <span className="text-xs text-slate-400">Hợp tác chính thức</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {selectedPlatform.name} - {selectedPlatform.tagline}
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
                    {selectedPlatform.description}
                  </p>
                </div>

                {/* Salary & Gift Share Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-[#111836] border border-cyan-500/20">
                    <div className="text-xs text-cyan-300 font-semibold flex items-center gap-1.5 mb-1">
                      <DollarSign className="w-4 h-4 text-cyan-400" />
                      <span>Chính sách Lương cứng:</span>
                    </div>
                    <div className="text-base sm:text-lg font-bold text-white">
                      {selectedPlatform.baseSalary}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#111836] border border-purple-500/20">
                    <div className="text-xs text-purple-300 font-semibold flex items-center gap-1.5 mb-1">
                      <Gift className="w-4 h-4 text-purple-400" />
                      <span>Tỷ lệ hoa hồng quà tặng:</span>
                    </div>
                    <div className="text-base sm:text-lg font-bold text-white">
                      {selectedPlatform.giftShare}
                    </div>
                  </div>
                </div>

                {/* Exclusive Agency Privileges */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span>Đặc quyền khi gia nhập qua Galaxy Live:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedPlatform.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action button */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href="#apply"
                    onClick={() => onSelectPlatform(selectedPlatform.id)}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Ứng Tuyển Làm Idol {selectedPlatform.name} Ngay</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href="#calculator"
                    className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs hover:text-white hover:bg-slate-700 transition-colors text-center"
                  >
                    Xem Dự Tính Thu Nhập Của App Này &rarr;
                  </a>
                </div>

              </div>

              {/* Right Column: Suitable For & Requirements Checklist */}
              <div className="lg:col-span-5 bg-[#0e1530] rounded-2xl p-6 border border-white/5 space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-cyan-400" />
                    <span>Hình Mẫu Idol Phù Hợp:</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedPlatform.suitableFor.map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Yêu Cầu Tham Gia:</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedPlatform.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-xs text-amber-200">
                  <span className="font-bold text-amber-300">💡 Lời khuyên từ Mentor:</span>{' '}
                  Nếu bạn chưa biết nên chọn app nào, đừng lo lắng! Khi test cam 1:1, ban tuyển dụng sẽ đánh giá chất giọng, ngoại hình và phong cách để định hướng nền tảng kiếm được nhiều tiền nhất cho bạn.
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
