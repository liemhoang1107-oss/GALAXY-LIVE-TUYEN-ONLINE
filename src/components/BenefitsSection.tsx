import React from 'react';
import { DollarSign, GraduationCap, Camera, TrendingUp, ShieldCheck, Award, CheckCircle2, Gift, Sparkles } from 'lucide-react';
import { AGENCY_BENEFITS, FOUNDER_INFO } from '../data/mockData';

export const BenefitsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'DollarSign': return <DollarSign className="w-6 h-6 text-amber-400" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-cyan-400" />;
      case 'Camera': return <Camera className="w-6 h-6 text-pink-400" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-emerald-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-blue-400" />;
      case 'Award': return <Award className="w-6 h-6 text-purple-400" />;
      default: return <Sparkles className="w-6 h-6 text-cyan-400" />;
    }
  };

  const equipmentPackage = [
    { title: 'Đèn Ring Light 45cm', desc: '3 chế độ sáng, tùy chỉnh nhiệt độ màu tôn da trắng sáng tự nhiên' },
    { title: 'Micro Condenser Chuyên Nghiệp', desc: 'Khử tạp âm, bắt giọng ấm và trong trẻo kể cả khi nói thì thầm' },
    { title: 'Sound Card Âm Thanh Đa Hiệu Ứng', desc: 'Tích hợp vỗ tay, cười, nhạc nền và chỉnh tone giọng ngọt ngào' },
    { title: 'Chân Đế Điện Thoại 360°', desc: 'Chống rung lắc, căn chỉnh góc quay tỉ lệ vàng chuẩn Idol' }
  ];

  return (
    <section id="benefits" className="py-20 bg-[#070913] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 mb-4">
            <Gift className="w-3.5 h-3.5" />
            <span>QUYỀN LỢI ĐỘC QUYỀN TẠI GALAXY LIVE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Tại Sao Nên Chọn Về Với Team Chúng Tôi?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Chúng tôi không chỉ là đơn vị tuyển dụng, mà là người đồng hành lo trọn vẹn từ kỹ thuật, thiết bị đến định hướng xây dựng tên tuổi cho bạn.
          </p>
        </div>

        {/* 6 Key Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {AGENCY_BENEFITS.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-[#0d1226]/80 border border-white/10 hover:border-cyan-500/40 transition-all hover:-translate-y-1 duration-300 group shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {getIcon(item.icon)}
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                {item.highlight}
              </span>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Equipment Kit Feature Banner */}
        <div className="rounded-3xl p-1 bg-gradient-to-r from-amber-500/30 via-pink-500/30 to-cyan-500/30 shadow-2xl">
          <div className="bg-[#0b1029] rounded-[22px] p-6 sm:p-10 border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>GÓI QUÀ TẶNG KHỞI NGHIỆP TRỊ GIÁ 5.000.000 VNĐ</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                  Tài Trợ Trọn Bộ Trang Thiết Bị Livestream Chuẩn Studio
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Bạn không cần lo lắng về việc chưa có phòng đẹp hay máy móc đắt tiền. Ngay sau khi ký hợp đồng, 
                  Galaxy Live Agency sẽ gửi trực tiếp đến tận nhà bộ kit hoàn chỉnh để bạn bắt đầu tự tin lên sóng:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {equipmentPackage.map((eq, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{eq.title}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{eq.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Anti-Scam Assurance Box */}
              <div className="lg:col-span-5 bg-gradient-to-br from-red-950/40 to-slate-900 p-6 rounded-2xl border border-red-500/30">
                <div className="flex items-center gap-2.5 text-red-400 font-bold text-sm mb-3">
                  <ShieldCheck className="w-5 h-5" />
                  <span>CAM KẾT MINH BẠCH & AN TOÀN 100%</span>
                </div>
                <div className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
                  <p>
                    ⚠️ <strong>Cảnh Báo Lừa Đảo:</strong> Thời gian gần đây có nhiều đối tượng mạo danh agency yêu cầu ứng viên nộp tiền đặt cọc hoặc nạp thẻ để nhận việc.
                  </p>
                  <p className="text-amber-200">
                    🛡️ <strong>Tại Galaxy Live (CEO Hoàng Liêm):</strong> Chúng tôi cam kết <strong>KHÔNG THU BẤT KỲ MỘT KHOẢN PHÍ NÀO</strong> từ ứng viên trước, trong và sau quá trình làm việc.
                  </p>
                  <p>
                    Mọi thắc mắc vui lòng liên hệ trực tiếp số Hotline chính thức: <a href={`tel:${FOUNDER_INFO.phone}`} className="text-white font-bold underline hover:text-cyan-300">{FOUNDER_INFO.phoneDisplay} (Zalo)</a> để được bảo đảm quyền lợi.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
