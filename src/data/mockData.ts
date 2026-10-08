import { PlatformInfo, TopIdol, FAQItem } from '../types';

export const PLATFORMS_DATA: PlatformInfo[] = [
  {
    id: 'bigo',
    name: 'Bigo Live',
    badge: 'Đối Tác Chiến Lược Kim Cương',
    logoColor: 'from-cyan-400 to-blue-600',
    accentColor: '#00D1FF',
    tagline: 'Vua ứng dụng Livestream toàn cầu với cơ chế Lương cứng & Quà tặng khủng nhất',
    description: 'Bigo Live là nền tảng livestream số 1 về doanh thu đậu (Beans). Idol trực thuộc Agency nhận lương cứng từ công ty Bigo cùng 100% doanh thu quà tặng quy đổi trực tiếp.',
    baseSalary: '5.000.000đ - 35.000.000đ (Cam kết theo KPI giờ + đậu)',
    giftShare: 'Lên tới 70% - 90% (Quy đổi Đậu sang tiền mặt tự do)',
    suitableFor: [
      'Giao lưu tâm sự, kết bạn bốn phương',
      'Ca hát, nhạc cụ acoustic, karaoke',
      'Nhảy múa, cosplay, thời trang',
      'Idol có khả năng tương tác duyên dáng'
    ],
    highlights: [
      'Hỗ trợ đẩy PK Quốc tế (Việt Nam - Hàn Quốc - Thái Lan - Dubai)',
      'Banner Top 1 trang chủ các khung giờ vàng',
      'Rút tiền trực tiếp về tài khoản ngân hàng Việt Nam 24/7',
      'Được bảo vệ kênh, mở khóa nếu bị report oan uổng'
    ],
    requirements: [
      'Từ 18 tuổi trở lên, ngoại hình ưa nhìn',
      'Tối thiểu 30 - 45 giờ live/tháng (chia đều các ngày)',
      'Không yêu cầu kinh nghiệm, có ban đào tạo hỗ trợ'
    ]
  },
  {
    id: 'tiktok',
    name: 'TikTok Live',
    badge: 'MCN Creator Partner Uy Tín',
    logoColor: 'from-pink-500 via-red-500 to-cyan-400',
    accentColor: '#FE2C55',
    tagline: 'Bùng nổ hàng triệu lượt xem với thuật toán For You và cộng đồng PK sôi động nhất',
    description: 'Hệ thống MCN chính thức bảo trợ: mở full tính năng PK, cấp traffic đẩy xu hướng For You, bảo vệ tài khoản chống gậy bản quyền và kết nối nhãn hàng booking quảng cáo.',
    baseSalary: 'Lương cứng MCN 5.000.000đ - 12.000.000đ + Doanh thu Kim Cương (Tổng 20M - 35M/tháng)',
    giftShare: 'Nhận trọn vẹn hoa hồng quà tặng TikTok + Thưởng nóng Agency',
    suitableFor: [
      'Sáng tạo nội dung video ngắn & livestream tương tác',
      'PK đối kháng hài hước, kéo view khủng',
      'Ca sĩ, vũ công, hot tiktoker, streamer game',
      'Livestream kết hợp giới thiệu sản phẩm & affiliate'
    ],
    highlights: [
      'Mở ngay quyền Livestream & tính năng PK không cần đủ 1.000 followers',
      'Bảo vệ tài khoản, gỡ vi phạm tiêu chuẩn cộng đồng nhanh',
      'Được đội ngũ Agency kéo user vào phòng live "buff mắt xem"',
      'Cơ hội nhận booking quảng cáo từ các thương hiệu lớn'
    ],
    requirements: [
      'Từ 18 tuổi trở lên, hoạt ngôn, năng động',
      'Có mong muốn xây dựng thương hiệu cá nhân bền vững',
      'Live từ 2h - 4h mỗi ngày vào khung giờ đông người xem'
    ]
  },
  {
    id: 'other',
    name: 'Các App Khác (Uplive, Nimo, Chamet...)',
    badge: 'Đa Nền Tảng Độc Quyền',
    logoColor: 'from-amber-400 to-orange-500',
    accentColor: '#F59E0B',
    tagline: 'Tối ưu hóa nguồn thu nhập thụ động và đa dạng hóa lượng người hâm mộ',
    description: 'Dành cho Idol muốn gia tăng thu nhập ngoài giờ hoặc có thế mạnh về ngoại ngữ (tiếng Anh, Trung, Hàn) để live trên các app quốc tế với mức quà tặng từ người dùng nước ngoài cực cao.',
    baseSalary: 'Lương cố định theo giờ live + Thưởng thành tích',
    giftShare: 'Quy đổi USD / VNĐ minh bạch, hỗ trợ đổi ngoại tệ',
    suitableFor: [
      'Idol biết tiếng Anh, tiếng Trung hoặc ngôn ngữ thứ 2',
      'Streamer chuyên về game (Nimo TV)',
      'Idol muốn live kín đáo hoặc khung giờ khuya'
    ],
    highlights: [
      'Ít cạnh tranh hơn, dễ leo top bảng xếp hạng quốc tế',
      'Quà tặng bằng đô la Mỹ từ khán giả quốc tế hào phóng',
      'Hỗ trợ setup kịch bản giao lưu đa ngôn ngữ'
    ],
    requirements: [
      'Độ tuổi 18 - 32 tuổi',
      'Tự tin, thân thiện và kiên trì'
    ]
  }
];

export const AGENCY_BENEFITS = [
  {
    icon: 'DollarSign',
    title: 'Cam Kết Lương Cứng & Thưởng Khủng',
    desc: 'Không lo tháng đầu bỡ ngỡ. Agency hỗ trợ mức lương cứng đảm bảo từ 5M - 12M+ VNĐ/tháng kèm 100% doanh thu quà tặng (Đậu/Kim Cương/Xu) và thưởng nóng vượt KPI.',
    highlight: 'Thu nhập 20M - 35M+/tháng'
  },
  {
    icon: 'GraduationCap',
    title: 'Đào Tạo 1:1 Cầm Tay Chỉ Việc',
    desc: 'Huấn luyện riêng từ các chuyên gia hàng đầu: Kỹ năng giao tiếp duyên dáng, giữ chân đại gia, kịch bản khuấy động phòng live, nghệ thuật PK đối kháng giành chiến thắng.',
    highlight: 'Miễn phí 100% trọn đời'
  },
  {
    icon: 'Camera',
    title: 'Tài Trợ Thiết Bị Live Studio',
    desc: 'Tặng hoặc hỗ trợ trọn bộ đèn Ring Light 45cm 3 chế độ sáng, Micro thu âm Condenser khử tạp âm, Sound card âm thanh thần thánh và chân đế livestream thông minh.',
    highlight: 'Hỗ trợ thiết bị tận nhà'
  },
  {
    icon: 'TrendingUp',
    title: 'Đẩy Mắt Xem & Top Bảng Xếp Hạng',
    desc: 'Agency liên tục buff mắt xem thực, kết nối những trận PK nảy lửa với các Idol kỳ cựu để kéo tương tác và đưa phòng live của bạn lên tab Khám Phá/Xu Hướng.',
    highlight: 'Traffic bùng nổ hàng ngày'
  },
  {
    icon: 'ShieldCheck',
    title: 'Bảo Vệ Bản Quyền & Tài Khoản 24/7',
    desc: 'Được đội ngũ kỹ thuật của Agency can thiệp trực tiếp với nền tảng Bigo và TikTok để xử lý nhanh sự cố quét bản quyền âm nhạc, report vô cớ hay khóa tính năng.',
    highlight: 'An toàn & Bảo mật 100%'
  },
  {
    icon: 'Award',
    title: 'Hợp Đồng Minh Bạch & Vinh Danh Gala',
    desc: 'Hợp đồng pháp lý rõ ràng, không giam tiền hay ép buộc trái cam kết. Cơ hội tham gia Gala vinh danh cuối năm, nhận cúp vàng và các chuyến du lịch nghỉ dưỡng 5 sao.',
    highlight: 'Môi trường văn minh, tôn trọng'
  }
];

export const TOP_IDOLS_SHOWCASE: TopIdol[] = [
  {
    id: 'idol-nhung',
    name: 'NHUNG ❤️',
    age: 22,
    platform: 'Đa Nền Tảng',
    badge: 'Idol Hot Đa Nền Tảng (TikTok / Bigo)',
    monthlyIncome: '35.000.000 VNĐ',
    liveHours: '3.5h/ngày · 24 ngày/tháng',
    talent: 'Tâm sự, Ca hát & PK Đa Nền Tảng',
    quote: 'Phát sóng song song cả TikTok Live và Bigo giúp mình nhân đôi lượng quà tặng và người theo dõi. Được CEO Hoàng Liêm trực tiếp lên kịch bản phòng live nên tháng nào thu nhập cũng vượt 35 triệu!',
    image: 'https://i.ibb.co/jvDMb758/IMG-5567.jpg',
    growth: 'Live 2 Nền Tảng (TikTok & Bigo)'
  },
  {
    id: 'idol-2',
    name: 'Linh Sobin',
    age: 22,
    platform: 'Bigo Live',
    badge: 'Idol Dance Hot App Bigo (ID: Linhsobin17.02)',
    monthlyIncome: '40.000.000 VNĐ',
    liveHours: '4h/ngày · 24 ngày/tháng',
    talent: 'Vũ đạo, Nhảy hiện đại & PK Dance',
    quote: 'Được anh Hoàng Liêm hỗ trợ kỹ thuật phòng live và chiến lược PK vũ đạo, phòng live của Linh luôn giữ top 1 bảng xếp hạng Dance tại Bigo Live!',
    image: 'https://i.ibb.co/qYL9RDBM/IMG-5712.jpg',
    growth: '7.6K mắt xem cao điểm'
  },
  {
    id: 'idol-5',
    name: 'Changmy',
    age: 22,
    platform: 'Bigo Live',
    badge: 'Top Doanh Thu 3 Tháng Liền (ID: Changmy)',
    monthlyIncome: '32.500.000 VNĐ',
    liveHours: '3.5h/ngày · 24 ngày/tháng',
    talent: 'Top Doanh Thu 3 Tháng Liền App Bigo Live',
    quote: 'Được sự định hướng đúng đắn và chiến lược phòng live từ CEO Hoàng Liêm, Changmy giữ vững kỷ lục Top Doanh Thu 3 tháng liền trên Bigo Live với thu nhập vượt mong đợi!',
    image: 'https://i.ibb.co/xKY9RjSG/IMG-5713.jpg',
    growth: '5.8K mắt xem thường xuyên'
  },
  {
    id: 'idol-6',
    name: 'Kẹo Biết Yêu',
    age: 20,
    platform: 'Bigo Live',
    badge: 'Gương Mặt Triển Vọng (ID: Keobietyeu)',
    monthlyIncome: '18.500.000 VNĐ',
    liveHours: '2.5h/ngày · 22 ngày/tháng',
    talent: 'Giao lưu kết bạn, Tâm sự & Nụ cười tỏa nắng',
    quote: 'Khởi đầu từ con số 0, nhờ sự kèm cặp 1:1 từ CEO Hoàng Liêm, tháng đầu tiên mình đã chạm mốc 10 triệu và giờ đã vững vàng với mức thu nhập mơ ước.',
    image: 'https://i.ibb.co/dJk107nf/IMG-5710.jpg',
    growth: 'Khởi nghiệp thành công từ số 0'
  },
  {
    id: 'idol-4',
    name: 'HƯƠNG GIANG',
    age: 23,
    platform: 'TikTok Live',
    badge: 'Idol Tài Năng & Sáng Tạo (3.8K Live)',
    monthlyIncome: '26.500.000 VNĐ',
    liveHours: '3h/ngày · 24 ngày/tháng',
    talent: 'Livestream Tương tác, Ca hát & PK',
    quote: 'Từ khi về với Agency của anh Hoàng Liêm, mình được định hướng phong cách rõ ràng, phòng live luôn sôi động và thu nhập hàng tháng ổn định từ 20-30 triệu!',
    image: 'https://i.ytimg.com/vi/_sNEbarb5IU/hqdefault.jpg',
    growth: 'Có Video clip trực tiếp trên app',
    videoUrl: 'https://youtube.com/shorts/_sNEbarb5IU?si=NZXpe7MHuHD0gihd',
    youtubeId: '_sNEbarb5IU'
  },
  {
    id: 'idol-1',
    name: 'Linh Miêu (Baby Linh)',
    age: 21,
    platform: 'Bigo Live',
    badge: 'Top 1 BXH Kim Cương (12.4K Live)',
    monthlyIncome: '35.500.000 VNĐ',
    liveHours: '4h/ngày · 24 ngày/tháng',
    talent: 'Hát Acoustic & Tâm sự đêm khuya',
    quote: 'Trước đây em là sinh viên đi làm thêm 20k/h. Sau khi được anh Hoàng Liêm đào tạo, em đã tự tin livestream, cán mốc 12.4K mắt xem và độc lập tài chính hoàn toàn!',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80',
    growth: '12.4K mắt xem trực tiếp'
  },
  {
    id: 'idol-na',
    name: 'Bé Na',
    age: 21,
    platform: 'Bigo Live',
    badge: 'Idol Duyên Dáng Bigo (ID: Na0110)',
    monthlyIncome: '25.500.000 VNĐ',
    liveHours: '3h/ngày · 24 ngày/tháng',
    talent: 'Giao lưu tâm sự, Ca hát & PK tương tác',
    quote: 'Được sự hướng dẫn và nâng đỡ tận tình từ CEO Hoàng Liêm, Na đã tìm thấy niềm đam mê livestream và xây dựng được lượng khán giả trung thành mỗi tối.',
    image: 'https://i.ibb.co/fVMPzyfM/IMG-5714.jpg',
    growth: 'Thu nhập ổn định 25M+/tháng'
  },
  {
    id: 'idol-vy',
    name: 'Tường Vy',
    age: 22,
    platform: 'Bigo Live',
    badge: 'Gương Mặt Sáng Giá Bigo (ID: vy059)',
    monthlyIncome: '28.000.000 VNĐ',
    liveHours: '3.5h/ngày · 24 ngày/tháng',
    talent: 'Trò chuyện duyên dáng, PK Kịch tính',
    quote: 'Từ ngày gia nhập Galaxy Live của anh Liêm, mình được định hình phong cách chuyên nghiệp, lượng đậu và quà tặng tăng trưởng đều đặn qua từng tuần.',
    image: 'https://i.ibb.co/MyJBqQTg/IMG-5716.jpg',
    growth: 'Tăng trưởng quà tặng 200%'
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    category: 'policy',
    question: 'Tôi chưa từng livestream và không có kinh nghiệm thì có làm được không?',
    answer: 'Hoàn toàn được! 85% Idol thành công nhất tại Galaxy Live Agency đều bắt đầu từ con số 0. Chúng tôi có giáo trình đào tạo 1:1 độc quyền, hướng dẫn từ cách chào khán giả, tạo chủ đề trò chuyện, biểu cảm trước ống kính đến cách set ánh sáng và góc quay đẹp nhất.'
  },
  {
    category: 'policy',
    question: 'Tham gia Agency có mất bất kỳ khoản chi phí nào không?',
    answer: 'TUYỆT ĐỐI KHÔNG! Galaxy Live Agency KHÔNG THU BẤT KỲ MỘT ĐỒNG NÀO từ ứng viên (không phí hồ sơ, không phí cọc, không phí đào tạo). Mọi chi phí tuyển dụng và hướng dẫn đều do Agency tài trợ 100%. Hãy cảnh giác với các bên yêu cầu nộp tiền trước mạo danh agency!'
  },
  {
    category: 'salary',
    question: 'Thu nhập của Idol được tính và thanh toán như thế nào?',
    answer: 'Thu nhập gồm: (1) Lương cứng từ nền tảng và Agency khi đạt mốc giờ/đậu quy định; (2) Tiền quà tặng từ người xem (đổi ra tiền mặt với tỷ lệ chia sẻ cao nhất); (3) Tiền thưởng nóng tuần/tháng từ Agency. Tiền được chuyển khoản trực tiếp qua ngân hàng hoặc rút trên app minh bạch từ ngày mùng 5 đến ngày 10 hàng tháng.'
  },
  {
    category: 'equipment',
    question: 'Tôi không có đèn, mic hoặc phòng đẹp thì phải làm sao?',
    answer: 'Khi vượt qua vòng phỏng vấn test cam và ký hợp đồng chính thức, Agency sẽ tài trợ hoặc gửi tận nhà trọn bộ thiết bị livestream gồm: Đèn Ring Light đổi màu, Micro thu âm chống ồn chuyên dụng, Sound card làm ấm giọng. Nếu bạn ở gần trụ sở (Hà Nội, TP.HCM), bạn có thể đến phòng Live Studio chuẩn quốc tế của công ty để livestream miễn phí.'
  },
  {
    category: 'training',
    question: 'Thời gian livestream có bị gò bó không? Tôi đang đi làm/đi học có tham gia được không?',
    answer: 'Rất linh hoạt! Bạn hoàn toàn tự do lựa chọn khung giờ phù hợp với lịch sinh hoạt cá nhân (buổi sáng, buổi chiều, buổi tối hoặc đêm khuya). Mỗi ngày chỉ cần tối thiểu 2 đến 3 tiếng live chất lượng.'
  },
  {
    category: 'policy',
    question: 'Tôi ở tỉnh xa có thể ứng tuyển và làm việc online được không?',
    answer: 'Hoàn toàn được! Chúng tôi tuyển dụng Idol trên toàn quốc và cả người Việt Nam đang sinh sống tại nước ngoài (Nhật Bản, Hàn Quốc, Đài Loan...). Vòng phỏng vấn, test camera và đào tạo đều được thực hiện online qua video call 1:1 rất tiện lợi.'
  }
];

export const FOUNDER_INFO = {
  name: 'Hoàng Liêm',
  title: 'Founder & CEO Galaxy Live Entertainment',
  subtitle: 'Chuyên gia Đào tạo & Quản lý Nghệ sĩ Idol Livestream',
  experience: '6+ Năm Phát Triển Hệ Thống Idol Bigo & TikTok Live',
  avatarUrl: 'https://i.ibb.co/Jw2DVpy6/IMG-5606.jpg',
  phone: '0382.355.777',
  phoneDisplay: '0382.355.777',
  zalo: '0382.355.777',
  zaloUrl: 'https://zalo.me/0382355777',
  email: 'liemhoang1107@gmail.com',
  facebook: 'https://facebook.com',
  tiktok: 'https://tiktok.com',
  quote: 'Tại Galaxy Live, chúng tôi không chỉ tìm kiếm Idol, chúng tôi đồng hành cùng bạn xây dựng thương hiệu cá nhân bền vững và đạt tự do tài chính nhanh nhất.',
  bio: 'Từng dẫn dắt và đưa hơn 500+ gương mặt trẻ từ những người rụt rè trước ống kính trở thành những Top Streamer có thu nhập hàng chục, hàng trăm triệu mỗi tháng. Cam kết đồng hành minh bạch, uy tín và chuyên nghiệp tuyệt đối.'
};

export const RECENT_APPLICANTS_TICKER = [
  { name: 'Nguyễn Thảo My', city: 'Hà Nội', app: 'Bigo Live', time: '1 phút trước' },
  { name: 'Trần Minh Quân', city: 'TP. Hồ Chí Minh', app: 'TikTok Live', time: '3 phút trước' },
  { name: 'Lê Phương Thảo', city: 'Đà Nẵng', app: 'Bigo Live', time: '5 phút trước' },
  { name: 'Vũ Hoàng Yến', city: 'Cần Thơ', app: 'Cả 2 App', time: '8 phút trước' },
  { name: 'Đặng Ngọc Ánh', city: 'Hải Phòng', app: 'TikTok Live', time: '12 phút trước' },
  { name: 'Bùi Gia Hân', city: 'Bình Dương', app: 'Bigo Live', time: '15 phút trước' }
];
