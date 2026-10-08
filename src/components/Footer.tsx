import React from 'react';
import { Sparkles, Phone, Mail, MapPin, ShieldCheck, Heart, UserCheck } from 'lucide-react';
import { FOUNDER_INFO } from '../data/mockData';
import { GalaxyLiveLogo } from './GalaxyLiveLogo';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-[#04060d] border-t border-white/10 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <GalaxyLiveLogo size="md" />

            <p className="text-xs text-slate-400 leading-relaxed">
              Hệ thống đào tạo và quản lý Nghệ sĩ Idol Livestream hàng đầu tại Việt Nam. Đối tác chiến lược Kim Cương của Bigo Live và MCN chính thức của TikTok Live.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Cam kết 100% không thu phí ứng viên</span>
            </div>
          </div>

          {/* Office Locations */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Trụ Sở & Studio Live</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">Trụ sở Hà Nội:</strong> Tầng 8, Tòa nhà Detech Tower, Số 8 Tôn Thất Thuyết, Cầu Giấy, Hà Nội.
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">Chi nhánh TP.HCM:</strong> Tòa nhà Landmark Plus, Vinhomes Central Park, Bình Thạnh, TP. Hồ Chí Minh.
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">Đào tạo Online:</strong> Tiếp nhận ứng viên trên toàn bộ 63 tỉnh thành & Idol hải ngoại (Nhật, Hàn, Đài Loan).
                </div>
              </div>
            </div>
          </div>

          {/* Direct Contacts */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Liên Hệ Tuyển Dụng</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href={`tel:${FOUNDER_INFO.phone}`} className="hover:text-cyan-300 flex items-center gap-2 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Hotline: <strong className="text-white">{FOUNDER_INFO.phoneDisplay}</strong></span>
                </a>
              </li>
              <li>
                <a href={FOUNDER_INFO.zaloUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 flex items-center gap-2 transition-colors">
                  <span className="w-3.5 h-3.5 rounded bg-blue-500 text-[9px] font-bold text-white flex items-center justify-center">Z</span>
                  <span>Zalo Tuyển Dụng: <strong className="text-white">{FOUNDER_INFO.zalo}</strong></span>
                </a>
              </li>
              <li>
                <a href={`mailto:${FOUNDER_INFO.email}`} className="hover:text-cyan-300 flex items-center gap-2 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Email: {FOUNDER_INFO.email}</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Galaxy Live Entertainment by CEO {FOUNDER_INFO.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#platforms" className="hover:text-slate-300 transition-colors">Bigo Live</a>
            <span>·</span>
            <a href="#platforms" className="hover:text-slate-300 transition-colors">TikTok Live</a>
            <span>·</span>
            <a href="#benefits" className="hover:text-slate-300 transition-colors">Chính Sách</a>
            <span>·</span>
            <a href="#faq" className="hover:text-slate-300 transition-colors">Bảo Mật</a>
            {/* Discreet Admin Lock trigger for CEO */}
            <button 
              onClick={onOpenAdmin} 
              className="text-slate-700 hover:text-slate-400 transition-colors cursor-default"
              title="Cổng nội bộ"
            >
              ·
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
