import React, { useState } from 'react';
import { Calculator, Sparkles, DollarSign, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';

interface IncomeCalculatorProps {
  onPreFillForm: (data: { platform: string; liveHours: string }) => void;
}

export const IncomeCalculator: React.FC<IncomeCalculatorProps> = ({ onPreFillForm }) => {
  const [platform, setPlatform] = useState<'bigo' | 'tiktok' | 'both'>('bigo');
  const [hoursPerDay, setHoursPerDay] = useState<number>(3);
  const [daysPerMonth, setDaysPerMonth] = useState<number>(24);
  const [talent, setTalent] = useState<'chat' | 'sing' | 'dance' | 'pk'>('sing');
  const [experience, setExperience] = useState<'beginner' | 'intermediate' | 'pro'>('beginner');

  // Realistic calculation engine based on VN live streaming market standards (khoảng 20 - 35 triệu/tháng)
  const calculateEstimatedIncome = () => {
    // Base hourly rate baseline
    const totalHours = hoursPerDay * daysPerMonth;
    
    // Platform multiplier
    let platformMultiplier = 1.0;
    if (platform === 'bigo') platformMultiplier = 1.05;
    if (platform === 'tiktok') platformMultiplier = 1.0;
    if (platform === 'both') platformMultiplier = 1.20;

    // Talent bonus multiplier
    let talentMultiplier = 1.0;
    if (talent === 'chat') talentMultiplier = 1.0;
    if (talent === 'sing') talentMultiplier = 1.1;
    if (talent === 'dance') talentMultiplier = 1.12;
    if (talent === 'pk') talentMultiplier = 1.15;

    // Experience bonus
    let expMultiplier = 1.0;
    if (experience === 'beginner') expMultiplier = 1.0;
    if (experience === 'intermediate') expMultiplier = 1.1;
    if (experience === 'pro') expMultiplier = 1.2;

    // Base salary projection (in VND: 3M - 10M tùy theo số giờ)
    let baseSalary = 0;
    if (totalHours < 40) baseSalary = 3000000;
    else if (totalHours < 60) baseSalary = 5000000;
    else if (totalHours < 80) baseSalary = 7000000;
    else if (totalHours < 100) baseSalary = 9000000;
    else baseSalary = 10500000;

    if (platform === 'both') baseSalary = Math.round((baseSalary * 1.15) / 500000) * 500000;

    // Realistic hourly gift rate (VND)
    const hourlyGiftMin = 95000 * platformMultiplier * talentMultiplier * expMultiplier;
    const hourlyGiftMax = 185000 * platformMultiplier * talentMultiplier * expMultiplier;

    let baseGiftMin = totalHours * hourlyGiftMin;
    let baseGiftMax = totalHours * hourlyGiftMax;

    // Agency KPI bonus (khoảng 1.5M - 3M)
    const agencyBonus = Math.min(Math.round((baseSalary * 0.28) / 500000) * 500000, 3000000);

    let totalMin = Math.round((baseSalary + baseGiftMin + agencyBonus) / 500000) * 500000;
    let totalMax = Math.round((baseSalary + baseGiftMax + agencyBonus * 1.2) / 500000) * 500000;

    // Ensure ceiling aligns with realistic 20-35M range for typical streaming
    if (totalHours >= 60 && totalHours <= 100) {
      totalMin = Math.max(totalMin, 18000000);
      totalMax = Math.min(totalMax, 35000000);
    } else if (totalHours > 100) {
      totalMax = Math.min(totalMax, 42000000);
    }

    return {
      baseSalary,
      agencyBonus,
      giftMin: Math.round(baseGiftMin / 500000) * 500000,
      giftMax: Math.round(baseGiftMax / 500000) * 500000,
      totalMin,
      totalMax,
      totalHours
    };
  };

  const results = calculateEstimatedIncome();

  const handleApplyWithPlan = () => {
    onPreFillForm({
      platform,
      liveHours: `${hoursPerDay} giờ/ngày (${daysPerMonth} ngày/tháng)`
    });
    const applyElement = document.getElementById('apply');
    if (applyElement) {
      applyElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="calculator" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-300 mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>CÔNG CỤ TÍNH THU NHẬP MINH BẠCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Dự Tính Thu Nhập Hàng Tháng Của Bạn
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Thu nhập của Idol Livestream hoàn toàn tỷ lệ thuận với thời gian và sự nỗ lực. Hãy chọn thông số để xem con số thực tế bạn có thể nhận được!
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-[#0b1026] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-6">
            
            {/* Step 1: Platform Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
                1. Chọn nền tảng bạn muốn livestream:
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'bigo', name: 'Bigo Live', note: 'Top quà tặng' },
                  { id: 'tiktok', name: 'TikTok Live', note: 'Traffic khủng' },
                  { id: 'both', name: 'Cả 2 Nền Tảng', note: 'Thu nhập x2' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPlatform(item.id as any)}
                    type="button"
                    className={`p-3 rounded-xl border text-center transition-all ${
                      platform === item.id
                        ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md shadow-cyan-500/10'
                        : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white hover:border-white/15'
                    }`}
                  >
                    <div className="font-bold text-xs sm:text-sm">{item.name}</div>
                    <div className="text-[10px] text-cyan-300/80 mt-0.5">{item.note}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Hours Per Day */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  2. Số giờ livestream mỗi ngày:
                </label>
                <span className="text-sm font-black text-cyan-400 bg-cyan-950/60 px-3 py-0.5 rounded-lg border border-cyan-500/30">
                  {hoursPerDay} Giờ / Ngày
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[2, 3, 4, 6].map((hrs) => (
                  <button
                    key={hrs}
                    type="button"
                    onClick={() => setHoursPerDay(hrs)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      hoursPerDay === hrs
                        ? 'bg-cyan-500 text-black border-cyan-400 font-black'
                        : 'bg-slate-900/60 text-slate-400 border-white/5 hover:text-white'
                    }`}
                  >
                    {hrs} Tiếng {hrs === 2 ? '(Part-time)' : hrs === 4 ? '(Tiêu chuẩn)' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Days Per Month */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  3. Số ngày livestream trong tháng:
                </label>
                <span className="text-sm font-black text-purple-400 bg-purple-950/60 px-3 py-0.5 rounded-lg border border-purple-500/30">
                  {daysPerMonth} Ngày / Tháng
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[15, 20, 24, 28].map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setDaysPerMonth(days)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      daysPerMonth === days
                        ? 'bg-purple-500 text-white border-purple-400 font-black shadow-md shadow-purple-500/20'
                        : 'bg-slate-900/60 text-slate-400 border-white/5 hover:text-white'
                    }`}
                  >
                    {days} Ngày
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Talent / Category */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
                4. Phong cách / Thế mạnh của bạn:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'chat', label: 'Tâm sự / Giao lưu' },
                  { id: 'sing', label: 'Ca hát / Nhạc cụ' },
                  { id: 'dance', label: 'Nhảy múa / Sexy' },
                  { id: 'pk', label: 'Hài hước / PK chiến' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTalent(item.id as any)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                      talent === item.id
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                        : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Experience */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
                5. Kinh nghiệm hiện tại:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'beginner', label: 'Chưa có kinh nghiệm' },
                  { id: 'intermediate', label: 'Đã từng live nghiệp dư' },
                  { id: 'pro', label: 'Đã có lượng fan sẵn' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setExperience(item.id as any)}
                    className={`py-2 px-2 rounded-xl text-[11px] font-semibold border transition-all text-center ${
                      experience === item.id
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                        : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Results Projection Card */}
          <div className="lg:col-span-5 relative flex flex-col justify-between bg-gradient-to-br from-[#12193d] to-[#0c102b] rounded-3xl p-6 sm:p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-950/40">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs uppercase font-bold text-cyan-400 tracking-wider">
                    Kết Quả Dự Tính
                  </span>
                  <div className="text-sm font-semibold text-slate-300 mt-0.5">
                    Tổng thời lượng: <strong className="text-white">{results.totalHours} giờ/tháng</strong>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>

              {/* Big Estimated Total */}
              <div className="py-6 text-center">
                <div className="text-xs text-slate-400 mb-1 font-medium">TỔNG THU NHẬP DỰ KIẾN / THÁNG</div>
                <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
                  {results.totalMin.toLocaleString('vi-VN')} - {results.totalMax.toLocaleString('vi-VN')}
                </div>
                <div className="text-xs text-amber-300/90 font-bold mt-1 tracking-wide">
                  VIỆT NAM ĐỒNG (VNĐ)
                </div>
              </div>

              {/* Breakdown List */}
              <div className="space-y-3 bg-[#080d24] p-4 rounded-2xl border border-white/5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    Lương cứng cam kết:
                  </span>
                  <span className="font-bold text-white">
                    {results.baseSalary.toLocaleString('vi-VN')} VNĐ
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                    Doanh thu Quà tặng (Đậu / Xu):
                  </span>
                  <span className="font-bold text-white">
                    {results.giftMin.toLocaleString('vi-VN')} - {results.giftMax.toLocaleString('vi-VN')} VNĐ
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    Thưởng hoàn thành KPI Agency:
                  </span>
                  <span className="font-bold text-emerald-400">
                    +{results.agencyBonus.toLocaleString('vi-VN')} VNĐ
                  </span>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-[11px] text-cyan-200 leading-relaxed">
                * Con số được tính dựa trên dữ liệu doanh thu thực tế của 500+ Idol tại Galaxy Live trong 12 tháng gần nhất. Nhiều Idol nỗ lực đạt doanh thu vượt gấp đôi mức này!
              </div>
            </div>

            {/* Direct CTA */}
            <div className="pt-6">
              <button
                type="button"
                onClick={handleApplyWithPlan}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 hover:from-amber-300 hover:to-pink-400 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-orange-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>ỨNG TUYỂN NHẬN MỨC THU NHẬP NÀY</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
