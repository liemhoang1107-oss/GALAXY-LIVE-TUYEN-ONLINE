import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Sparkles, ChevronUp, X, Bell, FolderCheck } from 'lucide-react';
import { FOUNDER_INFO, RECENT_APPLICANTS_TICKER } from '../data/mockData';

interface FloatingWidgetsProps {
  onOpenAdmin?: () => void;
  candidateCount?: number;
}

export const FloatingWidgets: React.FC<FloatingWidgetsProps> = ({ 
  onOpenAdmin, 
  candidateCount = 0 
}) => {
  const [currentTickerIndex, setCurrentTickerIndex] = useState(0);
  const [isTickerVisible, setIsTickerVisible] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const tickerInterval = setInterval(() => {
      setCurrentTickerIndex(prev => (prev + 1) % RECENT_APPLICANTS_TICKER.length);
      setIsTickerVisible(true);
    }, 9000);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(tickerInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentApplicant = RECENT_APPLICANTS_TICKER[currentTickerIndex];

  return (
    <>
      {/* Live Social Proof Ticker (Bottom-Left) */}
      {isTickerVisible && currentApplicant && (
        <div className="fixed bottom-5 left-4 z-40 max-w-[320px] bg-[#0c122e]/95 backdrop-blur-md border border-cyan-500/30 p-3 rounded-2xl shadow-2xl shadow-cyan-950/50 flex items-start gap-3 animate-fadeIn">
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Bell className="w-4 h-4 animate-bounce" />
          </div>
          <div className="flex-1 text-xs">
            <div className="text-white font-bold flex items-center gap-1.5">
              <span>{currentApplicant.name}</span>
              <span className="text-[10px] text-slate-400 font-normal">({currentApplicant.city})</span>
            </div>
            <div className="text-cyan-300 text-[11px] mt-0.5 font-medium">
              Vừa ứng tuyển: <strong className="text-amber-300">{currentApplicant.app}</strong>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">{currentApplicant.time}</div>
          </div>
          <button
            onClick={() => setIsTickerVisible(false)}
            className="text-slate-500 hover:text-white p-0.5"
            aria-label="Đóng thông báo"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Pills (Bottom-Right) */}
      <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-2.5">
        
        {/* Quick Admin Access Button for CEO */}
        {onOpenAdmin && (
          <button
            onClick={onOpenAdmin}
            className="group px-3.5 py-2.5 rounded-full bg-gradient-to-r from-slate-900 via-[#0e163b] to-[#141f52] hover:from-[#0e163b] hover:to-[#1a2b70] text-cyan-300 hover:text-white font-bold text-xs shadow-2xl shadow-cyan-950/80 border border-cyan-500/50 hover:border-cyan-300 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            title="Mở bảng Quản Lý Hồ Sơ & Google Sheets"
          >
            <FolderCheck className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="font-bold">Quản Lý Hồ Sơ</span>
            {candidateCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-cyan-400 text-black text-[10px] font-black flex items-center justify-center">
                {candidateCount}
              </span>
            )}
          </button>
        )}

        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 shadow-lg transition-all"
            aria-label="Lên đầu trang"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        )}

        {/* Direct Zalo Chat Pill */}
        <a
          href={FOUNDER_INFO.zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group px-3.5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xl shadow-blue-600/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
          title="Nhắn Zalo CEO Hoàng Liêm"
        >
          <div className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center font-black text-xs">
            Z
          </div>
          <span className="hidden sm:inline font-bold">Zalo Tuyển Dụng</span>
        </a>

        {/* Hotline Call Pill */}
        <a
          href={`tel:${FOUNDER_INFO.phone}`}
          className="group px-3.5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs shadow-xl shadow-emerald-500/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
          title="Gọi Hotline tư vấn"
        >
          <Phone className="w-4 h-4 animate-bounce" />
          <span className="hidden sm:inline font-bold">{FOUNDER_INFO.phoneDisplay}</span>
        </a>

        {/* Quick Apply Pill */}
        <a
          href="#apply"
          className="px-4 py-3 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 text-white font-black text-xs uppercase tracking-wider shadow-2xl shadow-orange-500/40 flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all ring-4 ring-orange-500/20"
        >
          <Sparkles className="w-4 h-4" />
          <span>Ứng Tuyển Ngay</span>
        </a>

      </div>
    </>
  );
};
