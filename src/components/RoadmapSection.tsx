import React from 'react';
import { FileText, Video, Award, Sparkles, ArrowRight } from 'lucide-react';

export const RoadmapSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Điền Đơn Đăng Ký',
      duration: '1 Phút',
      desc: 'Điền thông tin cơ bản: họ tên, số điện thoại, zalo, sở thích và link mạng xã hội để ban tuyển dụng nắm bắt.',
      icon: <FileText className="w-6 h-6 text-cyan-400" />
    },
    {
      num: '02',
      title: 'Test Camera Online',
      duration: '15 Phút',
      desc: 'Gọi video call online thân thiện qua Zalo để kiểm tra góc máy, giọng nói và tư vấn định hình phong cách phù hợp nhất.',
      icon: <Video className="w-6 h-6 text-purple-400" />
    },
    {
      num: '03',
      title: 'Ký Hợp Đồng & Nhận Thiết Bị',
      duration: '1-2 Ngày',
      desc: 'Ký thỏa thuận quyền lợi minh bạch 100%. Agency gửi tặng hoặc cấp bộ thiết bị Đèn Live & Micro thu âm về tận nhà.',
      icon: <Award className="w-6 h-6 text-amber-400" />
    },
    {
      num: '04',
      title: 'Đào Tạo & Lên Sóng Bùng Nổ',
      duration: 'Trọn Đời',
      desc: 'Tham gia khóa hướng dẫn 1:1, mở phòng live được Agency buff mắt xem, chiến thắng các trận PK và nhận thu nhập định kỳ.',
      icon: <Sparkles className="w-6 h-6 text-emerald-400" />
    }
  ];

  return (
    <section id="roadmap" className="py-20 bg-[#090d1f]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>QUY TRÌNH TUYỂN DỤNG ĐƠN GIẢN</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            4 Bước Để Trở Thành Idol Ngôi Sao
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Không thủ tục rườm rà. Bạn có thể bắt đầu lên sóng và kiếm tiền ngay trong tuần này!
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-[#0c112b] rounded-2xl p-6 border border-white/10 relative group hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Step Number Background */}
              <div className="text-5xl font-black text-slate-800/60 absolute top-4 right-4 pointer-events-none group-hover:text-cyan-500/20 transition-colors">
                {step.num}
              </div>

              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <div className="inline-block text-[10px] font-bold uppercase tracking-wider text-cyan-300 px-2 py-0.5 rounded bg-cyan-500/10 mb-2">
                  Thời gian: {step.duration}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
                <span>Bước {idx + 1} / 4</span>
                {idx < 3 && <ArrowRight className="w-4 h-4 text-cyan-400/50 hidden lg:block" />}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
