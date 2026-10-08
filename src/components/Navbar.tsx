import React, { useState, useEffect } from 'react';
import { Sparkles, Phone, Menu, X, ShieldCheck, Flame, UserCheck, FolderCheck } from 'lucide-react';
import { FOUNDER_INFO } from '../data/mockData';
import { GalaxyLiveLogo } from './GalaxyLiveLogo';

interface NavbarProps {
  onOpenAdmin: () => void;
  candidateCount: number;
  showAdminButton?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenAdmin, 
  candidateCount,
  showAdminButton = false
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Nền Tảng', href: '#platforms' },
    { label: 'Nhóm Nhảy Studio 🔥', href: '#dance-team' },
    { label: 'Quyền Lợi', href: '#benefits' },
    { label: 'Tính Thu Nhập', href: '#calculator' },
    { label: 'Lãnh Đạo & Mentor', href: '#founder' },
    { label: 'Top Idol', href: '#showcase' },
    { label: 'Hỏi Đáp', href: '#faq' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top flash alert banner */}
      <div className="bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-cyan-500/20 border-b border-white/5 backdrop-blur-md py-1.5 px-4 text-xs text-center text-amber-200 flex items-center justify-center gap-2">
        <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse flex-shrink-0" />
        <span className="font-semibold text-white">Đợt tuyển chọn đặc biệt:</span>
        <span className="hidden sm:inline">Tài trợ trọn gói bộ Đèn Live + Micro cao cấp cho 15 Idol đăng ký sớm nhất!</span>
        <span className="sm:hidden">Tài trợ đèn mic cho 15 Idol đầu tiên!</span>
        <a 
          href="#apply" 
          className="ml-2 underline text-amber-300 font-bold hover:text-white transition-colors"
        >
          Nhận ngay &rarr;
        </a>
      </div>

      {/* Main Navbar */}
      <nav 
        className={`px-4 sm:px-6 lg:px-8 py-3.5 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#070913]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-cyan-950/20' 
            : 'bg-[#070913]/80 backdrop-blur-md border-b border-white/5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4 lg:gap-6">
          
          {/* Brand Logo (Left) */}
          <a href="#" className="flex-shrink-0 transition-transform hover:scale-[1.02] active:scale-[0.98]">
            <GalaxyLiveLogo size="md" />
          </a>

          {/* Desktop Navigation Links (Center - strictly 1 line, no awkward wrapping) */}
          <div className="hidden xl:flex items-center gap-5 2xl:gap-7 flex-shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs 2xl:text-sm font-bold text-slate-300 hover:text-cyan-300 transition-colors py-1 whitespace-nowrap relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-cyan-400 hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action CTAs (Right) */}
          <div className="hidden sm:flex items-center gap-2.5 2xl:gap-3 flex-shrink-0 whitespace-nowrap">
            {/* Nút Quản Lý Hồ Sơ (Chỉ hiển thị khi CEO/Admin kích hoạt chế độ quản trị) */}
            {showAdminButton && (
              <button
                onClick={onOpenAdmin}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-slate-900 via-[#0e163b] to-[#141f52] hover:from-[#0e163b] hover:to-[#1a2b70] text-cyan-300 hover:text-white text-xs font-black border border-cyan-500/50 hover:border-cyan-300 flex items-center gap-2 transition-all shadow-md shadow-cyan-950/40 whitespace-nowrap flex-shrink-0 animate-fadeIn"
                title="Mở cổng Quản Lý Hồ Sơ Ứng Viên & Google Sheets"
              >
                <FolderCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>QUẢN LÝ HỒ SƠ</span>
                {candidateCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-cyan-400 text-black text-[10px] font-black leading-none shadow-sm">
                    {candidateCount}
                  </span>
                )}
              </button>
            )}

            {/* Hotline Link */}
            <a
              href={`tel:${FOUNDER_INFO.phone}`}
              className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5 transition-colors whitespace-nowrap"
              title="Hotline tuyển dụng trực tiếp"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400 animate-bounce flex-shrink-0" />
              <span>{FOUNDER_INFO.phoneDisplay}</span>
            </a>

            {/* Main CTA */}
            <a
              href="#apply"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs sm:text-sm font-black tracking-wide shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-1.5 whitespace-nowrap flex-shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-200 flex-shrink-0" />
              <span>Ứng Tuyển Ngay</span>
            </a>
          </div>

          {/* Mobile / Tablet Menu Toggle Button */}
          <div className="flex xl:hidden items-center gap-2 flex-shrink-0">
            {/* Quick Mobile Admin Button for CEO (Chỉ hiển thị khi ở chế độ admin) */}
            {showAdminButton && (
              <button
                onClick={onOpenAdmin}
                className="px-2.5 py-2 rounded-xl bg-[#0e163b] text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center gap-1.5 whitespace-nowrap shadow-sm animate-fadeIn"
                title="Quản Lý Hồ Sơ"
              >
                <FolderCheck className="w-4 h-4 text-cyan-400" />
                <span className="text-[11px] font-bold">Hồ Sơ</span>
                {candidateCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-cyan-400 text-black text-[10px] font-black leading-none">
                    {candidateCount}
                  </span>
                )}
              </button>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white border border-white/10"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden mt-3 pt-3 pb-4 border-t border-white/10 bg-[#090d1f]/95 backdrop-blur-2xl rounded-2xl p-4 shadow-2xl animate-fadeIn">
            {/* Admin Button Inside Mobile Menu (Chỉ hiển thị khi ở chế độ admin) */}
            {showAdminButton && (
              <div className="mb-3 pb-3 border-b border-white/10">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#0e163b] hover:bg-[#141f52] text-cyan-300 border border-cyan-500/40 text-xs font-black flex items-center justify-between shadow-sm transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FolderCheck className="w-4 h-4 text-cyan-400" />
                    <span>QUẢN LÝ HỒ SƠ ỨNG VIÊN</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-400 text-black text-[10px] font-black">
                    {candidateCount} Đơn
                  </span>
                </button>
              </div>
            )}

            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl text-slate-200 hover:bg-white/5 hover:text-cyan-300 text-sm font-bold transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2.5">
              <a
                href="#apply"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white text-sm font-black text-center shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-cyan-200" />
                <span>Nộp Đơn Ứng Tuyển Idol Ngay</span>
              </a>

              <div className="flex items-center gap-2 mt-1">
                <a
                  href={`tel:${FOUNDER_INFO.phone}`}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Gọi Hotline</span>
                </a>
                <a
                  href={FOUNDER_INFO.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-bold text-center flex items-center justify-center gap-1.5"
                >
                  <span>Nhắn Zalo CEO</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
