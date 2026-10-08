export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * ==============================================================================
 * GALAXY LIVE AGENCY - TỰ ĐỘNG ĐỒNG BỘ ỨNG VIÊN & THÔNG BÁO GMAIL + GOOGLE SHEETS
 * MENTOR & CEO: HOÀNG LIÊM (Hotline / Zalo: 0382.355.777)
 * ==============================================================================
 */

// Danh sách Email nhận thông báo quản trị (CEO Hoàng Liêm)
const ADMIN_EMAILS = "liemhoang1107@gmail.com,hliem247@gmail.com";
const SHEET_NAME = "Ứng Viên Galaxy Live";

/**
 * Xử lý khi website gửi yêu cầu GET (Hỗ trợ trình duyệt và tránh lỗi CORS)
 */
function doGet(e) {
  try {
    if (e && e.parameter && (e.parameter.data || e.parameter.fullName || e.parameter.phone || e.parameter.email)) {
      return handleSaveCandidate(e);
    }
    return ContentService.createTextOutput(JSON.stringify({
      status: "active",
      agency: "GALAXY LIVE AGENCY",
      founder: "CEO HOÀNG LIÊM",
      phone: "0382.355.777",
      message: "Webhook Google Apps Script đang hoạt động tốt và sẵn sàng đồng bộ sang Google Sheets + Gmail!"
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Xử lý khi website gửi yêu cầu POST
 */
function doPost(e) {
  return handleSaveCandidate(e);
}

/**
 * Hàm chung: Lưu ứng viên, tạo Note Google Sheets và tự động gửi thông báo Gmail
 */
function handleSaveCandidate(e) {
  try {
    let data = {};

    // 1. Phân tích dữ liệu gửi lên
    if (e && e.parameter && e.parameter.data) {
      try {
        data = JSON.parse(e.parameter.data);
      } catch (err) {}
    } else if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    if (!data.fullName && !data.phone && !data.email) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Không tìm thấy dữ liệu ứng viên hợp lệ."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const ss = getSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      initSheetHeader(sheet);
    }

    const timestamp = Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");
    const candidateId = data.id || ("IDOL-2026-" + Math.floor(1000 + Math.random() * 9000));
    const talentsStr = Array.isArray(data.talents) ? data.talents.join(", ") : (data.talents || "Chưa có");

    // Tạo nội dung Note tự động
    const autoNote = 
      "★ [GHI CHÚ HỆ THỐNG GALAXY LIVE] ★\\n" +
      "• Thời gian nộp: " + timestamp + "\\n" +
      "• Ứng viên: " + (data.fullName || "Chưa nhập") + " (Mã: " + candidateId + ")\\n" +
      "• Gmail: " + (data.email || "Chưa cung cấp") + "\\n" +
      "• SĐT: " + (data.phone || "Chưa có") + " | Zalo: " + (data.zalo || data.phone || "Chưa có") + "\\n" +
      "• Nền tảng: " + formatPlatform(data.platform) + "\\n" +
      "• Ca live: " + (data.shiftPreference || "Chưa chọn") + " (" + (data.liveHoursPerDay || "N/A") + ")\\n" +
      "• Thế mạnh: " + talentsStr + "\\n" +
      (data.note ? ("• Lời nhắn: " + data.note + "\\n") : "") +
      "• Trạng thái: Đã gửi email xác nhận. Sẵn sàng gọi điện & test camera.";

    const rowData = [
      timestamp,                                                      // Cột 1: Thời gian
      candidateId,                                                    // Cột 2: Mã đơn
      data.fullName || "Chưa nhập",                                  // Cột 3: Họ và tên
      "'" + (data.phone || ""),                                       // Cột 4: Số điện thoại
      "'" + (data.zalo || data.phone || ""),                          // Cột 5: Số Zalo
      data.email || "",                                               // Cột 6: Gmail / Email
      data.birthYear || "",                                           // Cột 7: Năm sinh
      data.gender === 'female' ? 'Nữ' : (data.gender === 'male' ? 'Nam' : 'Khác'), // Cột 8: Giới tính
      data.city || "",                                                // Cột 9: Khu vực
      formatPlatform(data.platform),                                  // Cột 10: Nền tảng
      data.liveHoursPerDay || "",                                     // Cột 11: Giờ live
      data.shiftPreference || "",                                     // Cột 12: Ca live
      talentsStr,                                                     // Cột 13: Năng khiếu
      data.socialLink || "Không có",                                  // Cột 14: Link MXH
      data.note || "",                                                // Cột 15: Lời nhắn
      "Mới ứng tuyển",                                                // Cột 16: Trạng thái
      autoNote                                                        // Cột 17: Note Tự Động
    ];

    sheet.appendRow(rowData);

    const lastRow = sheet.getLastRow();
    const rowRange = sheet.getRange(lastRow, 1, 1, rowData.length);
    rowRange.setVerticalAlignment("middle");
    rowRange.setFontFamily("Roboto");
    rowRange.setFontSize(10);

    // Gán Note màu vàng trực tiếp vào ô Họ và tên (Cột 3)
    sheet.getRange(lastRow, 3).setNote(autoNote);

    // Định dạng màu trạng thái (Vàng cam)
    sheet.getRange(lastRow, 16).setBackground("#FEF3C7").setFontColor("#92400E").setFontWeight("bold");
    // Định dạng cột Auto Note
    sheet.getRange(lastRow, 17).setFontColor("#0369A1").setFontSize(9);

    // 2. TỰ ĐỘNG GỬI EMAIL THÔNG BÁO GMAIL
    // A. Gửi email xác nhận đến Ứng viên (nếu có email)
    if (data.email && data.email.indexOf("@") !== -1) {
      try {
        sendCandidateConfirmationEmail(data, candidateId, timestamp);
      } catch (errCandidateMail) {
        Logger.log("Lỗi gửi mail ứng viên: " + errCandidateMail.toString());
      }
    }

    // B. Gửi email thông báo cho CEO Hoàng Liêm & Quản trị viên
    try {
      sendAdminNotificationEmail(data, candidateId, timestamp);
    } catch (errAdminMail) {
      Logger.log("Lỗi gửi mail quản trị: " + errAdminMail.toString());
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Đã lưu ứng viên và kích hoạt thông báo Gmail tự động!",
      candidateId: candidateId,
      emailSent: data.email ? true : false
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Lỗi: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Lấy trang tính hiện tại hoặc tự động tìm/tạo mới
 */
function getSpreadsheet() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    const files = DriveApp.getFilesByName("Hồ Sơ Idol Galaxy Live");
    if (files.hasNext()) {
      ss = SpreadsheetApp.open(files.next());
    } else {
      ss = SpreadsheetApp.create("Hồ Sơ Idol Galaxy Live");
    }
  }
  return ss;
}

/**
 * Khởi tạo tiêu đề bảng trang tính sang trọng và khoa học
 */
function initSheetHeader(sheet) {
  const headers = [
    "Thời Gian Nộp",
    "Mã Ứng Viên",
    "Họ Và Tên",
    "Số Điện Thoại",
    "Số Zalo Liên Hệ",
    "Gmail / Email",
    "Năm Sinh",
    "Giới Tính",
    "Khu Vực",
    "Nền Tảng Live",
    "Giờ Live / Ngày",
    "Ca Live Đăng Ký",
    "Năng Khiếu / Thế Mạnh",
    "Link Tài Khoản / Video",
    "Lời Nhắn Ứng Viên",
    "Trạng Thái Xử Lý",
    "Ghi Chú & Note Tự Động"
  ];

  sheet.clear();
  sheet.appendRow(headers);

  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#0F172A");
  headerRange.setFontColor("#38BDF8");
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(11);
  headerRange.setFontFamily("Roboto");
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  sheet.setRowHeight(1, 40);
  sheet.setFrozenRows(1);

  sheet.setColumnWidth(1, 150); // Thời gian
  sheet.setColumnWidth(2, 130); // Mã
  sheet.setColumnWidth(3, 180); // Họ tên
  sheet.setColumnWidth(4, 130); // SĐT
  sheet.setColumnWidth(5, 130); // Zalo
  sheet.setColumnWidth(6, 190); // Gmail
  sheet.setColumnWidth(7, 90);  // Năm sinh
  sheet.setColumnWidth(8, 90);  // Giới tính
  sheet.setColumnWidth(9, 130); // Khu vực
  sheet.setColumnWidth(10, 140);// Nền tảng
  sheet.setColumnWidth(11, 130);// Giờ live
  sheet.setColumnWidth(12, 160);// Ca live
  sheet.setColumnWidth(13, 220);// Năng khiếu
  sheet.setColumnWidth(14, 200);// Link
  sheet.setColumnWidth(15, 200);// Lời nhắn
  sheet.setColumnWidth(16, 140);// Trạng thái
  sheet.setColumnWidth(17, 300);// Auto Note
}

function formatPlatform(platform) {
  switch (platform) {
    case 'bigo': return 'Bigo Live';
    case 'tiktok': return 'TikTok Live';
    case 'both': return 'Cả Bigo & TikTok';
    case 'dance_offline': return 'Nhóm Nhảy Offline Studio';
    default: return platform || 'Đa nền tảng';
  }
}

/**
 * 1. Gửi email xác nhận chính thức đến Ứng viên (Gửi tới data.email)
 */
function sendCandidateConfirmationEmail(data, candidateId, timestamp) {
  const subject = "[XÁC NHẬN] Chúc mừng bạn đã đăng ký tham gia Đội Ngũ Idol Galaxy Live (" + candidateId + ")";
  const recipient = data.email.trim();
  
  const htmlBody = 
    "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #070913; color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #1e293b;'>" +
      "<div style='background: linear-gradient(135deg, #0284c7, #6366f1); padding: 24px; text-align: center;'>" +
        "<h1 style='margin: 0; font-size: 24px; letter-spacing: 1px; color: #ffffff;'>GALAXY LIVE AGENCY</h1>" +
        "<p style='margin: 6px 0 0; font-size: 13px; color: #e0f2fe;'>Cổng Đào Tạo & Bảo Trợ Idol Livestream Chuyên Nghiệp</p>" +
      "</div>" +
      "<div style='padding: 24px; background: #0f172a;'>" +
        "<h2 style='color: #38bdf8; font-size: 18px; margin-top: 0;'>Chào bạn " + (data.fullName || "bạn") + ",</h2>" +
        "<p style='font-size: 14px; line-height: 1.6; color: #cbd5e1;'>" +
          "Chúc mừng bạn đã nộp hồ sơ ứng tuyển thành công vào <strong>Galaxy Live Agency</strong>. Hồ sơ của bạn đã được chuyển thẳng tới Giám đốc tuyển dụng <strong>CEO Hoàng Liêm</strong> để xét duyệt ưu tiên." +
        "</p>" +
        "<div style='background: #1e293b; border-left: 4px solid #38bdf8; padding: 16px; border-radius: 8px; margin: 20px 0;'>" +
          "<p style='margin: 0 0 8px; font-size: 13px;'><strong>Mã Ứng Viên:</strong> <span style='color: #facc15; font-size: 16px; font-weight: bold;'>" + candidateId + "</span></p>" +
          "<p style='margin: 0 0 8px; font-size: 13px;'><strong>Họ và tên:</strong> " + (data.fullName || "") + "</p>" +
          "<p style='margin: 0 0 8px; font-size: 13px;'><strong>Số Điện Thoại:</strong> " + (data.phone || "") + "</p>" +
          "<p style='margin: 0 0 8px; font-size: 13px;'><strong>Số Zalo:</strong> " + (data.zalo || data.phone || "") + "</p>" +
          "<p style='margin: 0 0 8px; font-size: 13px;'><strong>Nền tảng đăng ký:</strong> " + formatPlatform(data.platform) + "</p>" +
          "<p style='margin: 0; font-size: 13px;'><strong>Thời gian nộp:</strong> " + timestamp + "</p>" +
        "</div>" +
        "<h3 style='color: #facc15; font-size: 15px;'>CÁC BƯỚC TIẾP THEO BẠN CẦN LÀM:</h3>" +
        "<ol style='font-size: 13px; color: #cbd5e1; line-height: 1.8; padding-left: 20px;'>" +
          "<li><strong>Mở Zalo và kiểm tra tin nhắn</strong> từ chuyên viên tuyển dụng Galaxy Live trong vòng 2 giờ.</li>" +
          "<li><strong>Chủ động kết bạn Zalo với CEO Hoàng Liêm:</strong> <span style='color: #38bdf8; font-weight: bold;'>0382.355.777</span> với nội dung: <em>\\\"Chào anh, em là " + (data.fullName || "") + " vừa nộp đơn mã " + candidateId + "\\\"</em> để được test camera và duyệt lương cứng nhanh nhất!</li>" +
          "<li>Chuẩn bị điện thoại có camera rõ nét và góc ngồi đủ ánh sáng cho buổi test thử giọng.</li>" +
        "</ol>" +
        "<div style='margin-top: 24px; padding-top: 16px; border-top: 1px solid #334155; text-align: center; font-size: 12px; color: #94a3b8;'>" +
          "<p style='margin: 4px 0;'>Hotline / Zalo Tuyển Dụng Trực Tiếp: <strong style='color: #38bdf8;'>0382.355.777 (CEO Hoàng Liêm)</strong></p>" +
          "<p style='margin: 4px 0;'>Galaxy Live Agency - Nâng Tầm Thu Nhập & Định Hình Phong Cách Idol</p>" +
        "</div>" +
      "</div>" +
    "</div>";

  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    htmlBody: htmlBody,
    name: "Ban Tuyển Dụng & Đào Tạo Galaxy Live"
  });
}

/**
 * 2. Gửi email thông báo tức thì đến CEO Hoàng Liêm & Quản trị viên
 */
function sendAdminNotificationEmail(data, candidateId, timestamp) {
  const subject = "[HỒ SƠ MỚI] Ứng viên Idol: " + (data.fullName || "Ẩn danh") + " (" + (data.phone || "") + ") - " + formatPlatform(data.platform);
  
  const htmlBody = 
    "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #334155;'>" +
      "<h2 style='color: #facc15; margin-top: 0;'>🔥 CÓ ĐƠN ỨNG TUYỂN IDOL MỚI!</h2>" +
      "<p style='color: #94a3b8; font-size: 13px;'>Hệ thống Galaxy Live vừa ghi nhận 1 đơn mới lúc: <strong>" + timestamp + "</strong></p>" +
      "<table style='width: 100%; border-collapse: collapse; font-size: 13px; color: #e2e8f0; margin-top: 15px;'>" +
        "<tr style='border-bottom: 1px solid #334155;'><td style='padding: 8px 0; color: #94a3b8; width: 140px;'>Mã ứng viên:</td><td style='padding: 8px 0; font-weight: bold; color: #38bdf8;'>" + candidateId + "</td></tr>" +
        "<tr style='border-bottom: 1px solid #334155;'><td style='padding: 8px 0; color: #94a3b8;'>Họ và tên:</td><td style='padding: 8px 0; font-weight: bold;'>" + (data.fullName || "Chưa có") + "</td></tr>" +
        "<tr style='border-bottom: 1px solid #334155;'><td style='padding: 8px 0; color: #94a3b8;'>Số điện thoại:</td><td style='padding: 8px 0;'><a href='tel:" + (data.phone || "") + "' style='color: #38bdf8; text-decoration: none; font-weight: bold;'>" + (data.phone || "") + "</a></td></tr>" +
        "<tr style='border-bottom: 1px solid #334155;'><td style='padding: 8px 0; color: #94a3b8;'>Zalo:</td><td style='padding: 8px 0;'><a href='https://zalo.me/" + ((data.zalo || data.phone || "").replace(/\\s+/g, "")) + "' style='color: #10b981; text-decoration: none; font-weight: bold;'>" + (data.zalo || data.phone || "") + "</a></td></tr>" +
        "<tr style='border-bottom: 1px solid #334155;'><td style='padding: 8px 0; color: #94a3b8;'>Gmail ứng viên:</td><td style='padding: 8px 0; color: #f59e0b;'>" + (data.email || "Chưa cung cấp") + "</td></tr>" +
        "<tr style='border-bottom: 1px solid #334155;'><td style='padding: 8px 0; color: #94a3b8;'>Năm sinh & Giới tính:</td><td style='padding: 8px 0;'>" + (data.birthYear || "N/A") + " (" + (data.gender === 'female' ? 'Nữ' : 'Nam') + ")</td></tr>" +
        "<tr style='border-bottom: 1px solid #334155;'><td style='padding: 8px 0; color: #94a3b8;'>Khu vực:</td><td style='padding: 8px 0;'>" + (data.city || "Chưa rõ") + "</td></tr>" +
        "<tr style='border-bottom: 1px solid #334155;'><td style='padding: 8px 0; color: #94a3b8;'>Nền tảng live:</td><td style='padding: 8px 0; font-weight: bold; color: #facc15;'>" + formatPlatform(data.platform) + "</td></tr>" +
        "<tr style='border-bottom: 1px solid #334155;'><td style='padding: 8px 0; color: #94a3b8;'>Ca live & Giờ live:</td><td style='padding: 8px 0;'>" + (data.shiftPreference || "N/A") + " (" + (data.liveHoursPerDay || "N/A") + ")</td></tr>" +
        "<tr style='border-bottom: 1px solid #334155;'><td style='padding: 8px 0; color: #94a3b8;'>Năng khiếu:</td><td style='padding: 8px 0;'>" + (Array.isArray(data.talents) ? data.talents.join(", ") : (data.talents || "Chưa có")) + "</td></tr>" +
        "<tr style='border-bottom: 1px solid #334155;'><td style='padding: 8px 0; color: #94a3b8;'>Link MXH/Clip:</td><td style='padding: 8px 0;'><a href='" + (data.socialLink || "#") + "' style='color: #38bdf8;'>" + (data.socialLink || "Không có") + "</a></td></tr>" +
        "<tr><td style='padding: 8px 0; color: #94a3b8;'>Lời nhắn:</td><td style='padding: 8px 0; font-style: italic;'>" + (data.note || "Không có") + "</td></tr>" +
      "</table>" +
      "<div style='margin-top: 20px; text-align: center;'>" +
        "<p style='font-size: 12px; color: #94a3b8;'>👉 Vui lòng mở Google Sheets hoặc bấm vào Zalo để liên hệ test cam ngay cho bạn ấy!</p>" +
      "</div>" +
    "</div>";

  MailApp.sendEmail({
    to: ADMIN_EMAILS,
    subject: subject,
    htmlBody: htmlBody,
    name: "Galaxy Live Agency Alert"
  });
}

/**
 * 3. HÀM CHẠY TEST THỬ NGHIỆM TRỰC TIẾP TRONG GOOGLE APPS SCRIPT:
 * (Bạn chỉ cần chọn hàm này và bấm nút 'Run' trong Apps Script để nhận ngay 1 email test và 1 dòng Note vào Google Sheets)
 */
function testGuiThuVaGhiChu() {
  const fakeData = {
    id: "IDOL-TEST-" + Math.floor(1000 + Math.random() * 9000),
    fullName: "Hoàng Liêm (Test Hệ Thống)",
    phone: "0382355777",
    zalo: "0382355777",
    email: "hliem247@gmail.com",
    birthYear: "2000",
    gender: "male",
    city: "Hà Nội",
    platform: "both",
    liveHoursPerDay: "3 giờ/ngày",
    shiftPreference: "Tối (19h00 - 22h30)",
    talents: ["Ca hát", "PK Livestream"],
    socialLink: "https://tiktok.com/@hoangliem.live",
    note: "Đơn test kiểm tra chức năng gửi Gmail và tự động ghi Note vào Google Sheets."
  };

  const fakeEvent = {
    parameter: {
      data: JSON.stringify(fakeData)
    }
  };

  const result = handleSaveCandidate(fakeEvent);
  Logger.log("Kết quả test: " + result.getContent());
}
`;
