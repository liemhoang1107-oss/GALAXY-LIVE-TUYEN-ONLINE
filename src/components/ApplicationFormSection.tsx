import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Send, CheckCircle2, Phone, MessageSquare, AlertCircle, Copy, Check, Clock, Mail } from 'lucide-react';
import { ApplicationFormData } from '../types';
import { FOUNDER_INFO } from '../data/mockData';

export const DEFAULT_GOOGLE_SHEETS_WEBHOOK = 'https://script.google.com/macros/s/AKfycbxIKLwUdWMcJTPkxuwaI1vX9HTu4WkX2d9SoPwcaJWWEwMMcgacD311wgQSWefiVaEF/exec';

interface ApplicationFormSectionProps {
  preFilledData?: { platform: string; liveHours: string };
  onNewApplication: (candidate: ApplicationFormData) => void;
}

export const ApplicationFormSection: React.FC<ApplicationFormSectionProps> = ({
  preFilledData,
  onNewApplication
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    zalo: '',
    email: '',
    birthYear: '2002',
    gender: 'female' as 'female' | 'male' | 'other',
    city: 'Hà Nội',
    platform: (preFilledData?.platform || 'bigo') as 'bigo' | 'tiktok' | 'both' | 'dance_offline' | 'other',
    liveHoursPerDay: preFilledData?.liveHours || '3 giờ/ngày',
    shiftPreference: 'Tối (19h00 - 22h30)',
    talents: ['Tâm sự & Giao lưu', 'Ca hát'],
    socialLink: '',
    note: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedCandidate, setSubmittedCandidate] = useState<ApplicationFormData | null>(null);
  const [copiedZalo, setCopiedZalo] = useState(false);

  // Sync if prefilled data updates from outside
  React.useEffect(() => {
    if (preFilledData?.platform) {
      setFormData(prev => ({
        ...prev,
        platform: preFilledData.platform as any,
        liveHoursPerDay: preFilledData.liveHours || prev.liveHoursPerDay
      }));
    }
  }, [preFilledData]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ và tên của bạn';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Số điện thoại không đúng định dạng (VD: 0382355777)';
    }

    if (!formData.zalo.trim()) {
      newErrors.zalo = 'Vui lòng nhập số Zalo để ban tuyển dụng liên hệ';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập địa chỉ Gmail / Email của bạn';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Địa chỉ Gmail / Email chưa đúng định dạng (VD: idol.galaxy@gmail.com)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      // Generate unique candidate id
      const uniqueId = `IDOL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newCandidate: ApplicationFormData = {
        id: uniqueId,
        ...formData,
        createdAt: new Date().toISOString(),
        status: 'pending'
      };

      // Trigger Confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore if not supported
      }

      // Save to parent state and localStorage
      onNewApplication(newCandidate);
      setSubmittedCandidate(newCandidate);

      // Asynchronously sync to Google Apps Script webhook
      try {
        const webhookUrl = localStorage.getItem('galaxy_google_sheets_webhook') || DEFAULT_GOOGLE_SHEETS_WEBHOOK;
        if (webhookUrl && webhookUrl.startsWith('http')) {
          // 1. Send via POST text/plain
          fetch(webhookUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify(newCandidate)
          }).catch(err => {
            console.log('Google Sheets POST sync notice:', err);
          });

          // 2. Dual send via GET with encoded payload & direct parameters for 100% receipt
          try {
            const params = new URLSearchParams({
              data: JSON.stringify(newCandidate),
              fullName: newCandidate.fullName,
              phone: newCandidate.phone,
              zalo: newCandidate.zalo,
              email: newCandidate.email,
              id: newCandidate.id,
              city: newCandidate.city,
              platform: newCandidate.platform
            });
            const getUrl = `${webhookUrl}${webhookUrl.includes('?') ? '&' : '?'}${params.toString()}`;
            fetch(getUrl, { method: 'GET', mode: 'no-cors' }).catch(() => {});
            const beaconImg = new Image();
            beaconImg.src = getUrl;
          } catch (e) {
            // ignore
          }
        }
      } catch (syncErr) {
        // ignore
      }

      setIsSubmitting(false);
    }, 600);
  };

  const copySamePhoneToZalo = () => {
    if (formData.phone) {
      setFormData(prev => ({ ...prev, zalo: prev.phone }));
    }
  };

  const toggleTalent = (t: string) => {
    setFormData(prev => {
      const exists = prev.talents.includes(t);
      if (exists) {
        return { ...prev, talents: prev.talents.filter(item => item !== t) };
      } else {
        return { ...prev, talents: [...prev.talents, t] };
      }
    });
  };

  const availableTalents = [
    'Nhảy múa / Vũ đạo (Dance Team)',
    'Tâm sự & Giao lưu',
    'Ca hát',
    'Nhạc cụ (Guitar, Piano)',
    'Hài hước / Chém gió',
    'Chơi Game',
    'Makeup / Thời trang',
    'Chưa có (Chờ đào tạo)'
  ];

  return (
    <section id="apply" className="py-20 bg-gradient-to-b from-[#090d1f] to-[#060814] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-xs font-bold text-pink-300 mb-4 shadow-lg shadow-pink-500/10">
            <span>🔥 HỒ SƠ XÉT DUYỆT TRỰC TUYẾN 2026</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 font-['Cabinet_Grotesk'] uppercase">
            ĐĂNG KÝ ỨNG TUYỂN <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-amber-300">IDOL LIVESTREAM</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Điền thông tin bên dưới để Ban Tuyển Dụng xét duyệt và gửi thư mời tham gia nhóm Zalo VIP trong vòng 5 phút!
          </p>
        </div>

        {/* Success Modal / State */}
        {submittedCandidate ? (
          <div className="bg-[#0b1230] rounded-3xl p-8 sm:p-12 border border-cyan-500/40 text-center shadow-2xl relative overflow-hidden animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10">
              ĐĂNG KÝ THÀNH CÔNG!
            </span>

            <h3 className="text-2xl sm:text-3xl font-black text-white mt-3 mb-2">
              Chào mừng {submittedCandidate.fullName} gia nhập Galaxy Live!
            </h3>

            <p className="text-slate-300 text-sm max-w-lg mx-auto mb-6">
              Hồ sơ của bạn đã được chuyển thẳng tới Giám đốc tuyển dụng <strong className="text-white">CEO {FOUNDER_INFO.name}</strong>.
            </p>

            {/* Candidate Code Box */}
            <div className="inline-block p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-white/10 mb-6 text-center">
              <div className="text-xs text-slate-400">Mã Ứng Viên Của Bạn:</div>
              <div className="text-2xl sm:text-3xl font-mono font-black text-amber-300 mt-1">
                {submittedCandidate.id}
              </div>
              {submittedCandidate.email && (
                <div className="text-xs text-slate-300 mt-2 flex items-center justify-center gap-1.5 font-medium">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Gmail liên hệ: <strong>{submittedCandidate.email}</strong></span>
                </div>
              )}
              <div className="text-[11px] text-cyan-300/80 mt-1.5">
                * Vui lòng lưu mã này để nhận hỗ trợ ưu tiên
              </div>
            </div>

            {/* Fast Track Next Action */}
            <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#11183c] border border-cyan-500/30 text-left space-y-3 mb-8">
              <div className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Các bước tiếp theo bạn cần làm ngay:</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">1.</span>
                  <span>Mở Zalo và kiểm tra tin nhắn/lời mời kết bạn từ Agency trong vòng 2 giờ.</span>
                </li>
                {submittedCandidate.email && (
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">2.</span>
                    <span>Kiểm tra hòm thư Gmail (<strong>{submittedCandidate.email}</strong>) để nhận thư hướng dẫn & hồ sơ ứng tuyển từ Agency.</span>
                  </li>
                )}
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">{submittedCandidate.email ? '3.' : '2.'}</span>
                  <span>Hoặc chủ động nhắn Zalo cho CEO Hoàng Liêm với nội dung: <em>"Chào anh, em là {submittedCandidate.fullName}, vừa nộp hồ sơ mã {submittedCandidate.id}"</em> để được test cam ngay!</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={FOUNDER_INFO.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Nhắn Zalo CEO Hoàng Liêm ({FOUNDER_INFO.phoneDisplay})</span>
              </a>

              <button
                type="button"
                onClick={() => setSubmittedCandidate(null)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors"
              >
                Nộp thêm hồ sơ khác
              </button>
            </div>
          </div>
        ) : (
          /* Application Form Card */
          <div className="rounded-3xl p-1 bg-gradient-to-br from-cyan-500/30 via-indigo-500/20 to-purple-500/30 shadow-2xl">
            <form onSubmit={handleSubmit} className="bg-[#0b1029] rounded-[22px] p-6 sm:p-10 border border-white/10 space-y-6">
              
              {/* Form Grid 1: Basic Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Họ và Tên <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Nguyễn Thùy Linh"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
                  />
                  {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
                </div>

                {/* Birth Year & Gender */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Năm Sinh <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={formData.birthYear}
                      onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
                      className="w-full px-3 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
                    >
                      {Array.from({ length: 18 }, (_, i) => 2007 - i).map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Giới Tính
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                      className="w-full px-3 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
                    >
                      <option value="female">Nữ</option>
                      <option value="male">Nam</option>
                      <option value="other">LGBT+ / Khác</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Form Grid 2: Contacts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Số Điện Thoại <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="VD: 0382355777"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Zalo */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Số Zalo <span className="text-red-400">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={copySamePhoneToZalo}
                      className="text-[11px] text-cyan-400 hover:text-cyan-300 underline"
                    >
                      Giống số điện thoại
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Số Zalo nhận tin nhắn"
                    value={formData.zalo}
                    onChange={(e) => setFormData({ ...formData, zalo: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
                  />
                  {errors.zalo && <p className="text-red-400 text-xs mt-1">{errors.zalo}</p>}
                </div>
              </div>

              {/* Form Grid 3: Gmail Collection & City Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Gmail Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Địa Chỉ Gmail / Email <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4 text-cyan-400" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="VD: idol.galaxy2026@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  <p className="text-[11px] text-slate-400 mt-1">
                    Dùng để nhận thư mời casting & hợp đồng bảo trợ độc quyền
                  </p>
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Tỉnh / Thành Phố Hiện Tại <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Hà Nội, TP.HCM, Đà Nẵng..."
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Hỗ trợ setup phòng live hoặc gia nhập studio offline
                  </p>
                </div>
              </div>

              {/* Form Grid 4: Platform Choice */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Nền Tảng Bạn Muốn Live <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value as any })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
                >
                  <option value="bigo">BIGO LIVE (Lương cứng + Đậu cao)</option>
                  <option value="tiktok">TIKTOK LIVE (Đẩy traffic xu hướng)</option>
                  <option value="both">CẢ HAI NỀN TẢNG (Tối ưu thu nhập)</option>
                  <option value="dance_offline">🔥 NHÓM NHẢY OFFLINE STUDIO (Lương cứng + Doanh thu)</option>
                  <option value="other">CÁC APP KHÁC (Uplive, Nimo TV...)</option>
                </select>
                {formData.platform === 'dance_offline' && (
                    <div className="mt-2.5 p-3 rounded-xl bg-pink-950/60 border border-pink-500/40 text-xs text-pink-200 flex items-start gap-2 shadow-lg animate-fadeIn">
                      <Sparkles className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Tuyển Nhóm Nhảy Dance Team Offline:</strong> Lương cứng cố định đảm bảo + Doanh thu quà tặng PK không giới hạn. Tài trợ phòng tập studio chuẩn quốc tế, biên đạo và trang phục!
                      </div>
                    </div>
                  )}
              </div>

              {/* Time & Shift */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Thời Lượng Live Dự Kiến Mỗi Ngày
                  </label>
                  <select
                    value={formData.liveHoursPerDay}
                    onChange={(e) => setFormData({ ...formData, liveHoursPerDay: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="2 giờ/ngày">2 giờ/ngày (Part-time kiếm thêm)</option>
                    <option value="3 giờ/ngày">3 giờ/ngày (Tiêu chuẩn)</option>
                    <option value="4-5 giờ/ngày">4-5 giờ/ngày (Chuyên nghiệp)</option>
                    <option value="6 giờ+/ngày">6 giờ+/ngày (Full-time cam kết)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Khung Giờ Rảnh Phù Hợp
                  </label>
                  <select
                    value={formData.shiftPreference}
                    onChange={(e) => setFormData({ ...formData, shiftPreference: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="Tối (19h00 - 22h30)">Buổi Tối (19h00 - 22h30 - Giờ Vàng)</option>
                    <option value="Đêm khuya (22h30 - 02h00)">Đêm Khuya (22h30 - 02h00 - Donate Khủng)</option>
                    <option value="Chiều (14h00 - 17h30)">Buổi Chiều (14h00 - 17h30)</option>
                    <option value="Sáng (08h30 - 11h30)">Buổi Sáng (08h30 - 11h30)</option>
                    <option value="Linh hoạt tự sắp xếp">Linh Hoạt Tự Sắp Xếp</option>
                  </select>
                </div>
              </div>

              {/* Talents / Skills Tags */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Thế Mạnh / Năng Khiếu (Chọn một hoặc nhiều):
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTalents.map((item) => {
                    const isSelected = formData.talents.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleTalent(item)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          isSelected
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                            : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-white'
                        }`}
                      >
                        {isSelected && '✓ '}
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Social Profile link */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Link Trang Cá Nhân (TikTok hoặc Facebook - Để Duyệt Ngoại Hình)
                </label>
                <input
                  type="text"
                  placeholder="VD: https://tiktok.com/@your_name hoặc https://facebook.com/your_id"
                  value={formData.socialLink}
                  onChange={(e) => setFormData({ ...formData, socialLink: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
                />
              </div>

              {/* Note / Message to CEO */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Ghi Chú Hoặc Câu Hỏi Cho CEO Hoàng Liêm (Tùy chọn)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ví dụ: Em muốn đăng ký nhận thiết bị đèn mic về nhà, lịch rảnh test cam là tối nay..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none resize-none"
                />
              </div>

              {/* Privacy and Anti-scam checkbox */}
              <div className="p-3.5 rounded-xl bg-[#0e1635] border border-cyan-500/20 text-xs text-slate-300 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>
                  Tôi hiểu rằng Galaxy Live Agency <strong>cam kết miễn phí 100%</strong>, không thu tiền cọc và sẽ bảo mật toàn bộ thông tin cá nhân của tôi theo quy định pháp luật.
                </span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-black text-base uppercase tracking-wider shadow-xl shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Đang Gửi Hồ Sơ...</span>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-cyan-200" />
                    <span>NỘP HỒ SƠ ỨNG TUYỂN IDOL NGAY</span>
                    <Send className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>

            </form>
          </div>
        )}

      </div>
    </section>
  );
};
