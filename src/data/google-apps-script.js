/**
 * ==============================================================================
 * GALAXY LIVE AGENCY - TỰ ĐỘNG ĐỒNG BỘ ỨNG VIÊN VÀO GOOGLE SHEETS
 * MENTOR & CEO: HOÀNG LIÊM
 * ==============================================================================
 * HƯỚNG DẪN CÀI ĐẶT 3 BƯỚC:
 * 1. Mở Google Sheets mới (hoặc Google Sheets có sẵn).
 * 2. Chọn "Tiện ích mở rộng" (Extensions) -> "Apps Script".
 * 3. Xóa hết mã cũ trong file Code.gs, dán toàn bộ đoạn mã này vào.
 * 4. Bấm "Triển khai" (Deploy) -> "Tùy chọn triển khai mới" (New deployment).
 *    - Loại: Chọn "Ứng dụng web" (Web app).
 *    - Mô tả: "Galaxy Live Webhook".
 *    - Thực thi dưới dạng: "Tôi" (Me).
 *    - Ai có quyền truy cập: Chọn "Bất kỳ ai" (Anyone). -> Rất quan trọng!
 * 5. Bấm "Triển khai" và sao chép URL ứng dụng web (Web App URL).
 * 6. Dán URL đó vào mục Quản trị Admin trên website Galaxy Live.
 * ==============================================================================
 */

// Tên trang tính lưu danh sách ứng viên
const SHEET_NAME = "Ứng Viên Galaxy Live";

// (Tùy chọn) Nhận thông báo qua Email khi có ứng viên mới
const SEND_EMAIL_NOTIFICATION = true;
const NOTIFICATION_EMAIL = "liemhoang1107@gmail.com"; 

/**
 * Xử lý khi website gửi đơn ứng tuyển (POST Request)
 */
function doPost(e) {
  try {
    let data;
    
    // Đọc dữ liệu từ request
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter;
      }
    } else if (e.parameter) {
      data = e.parameter;
    } else {
      data = {};
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Nếu chưa có sheet, tự động tạo mới với định dạng đẹp mắt
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      initSheetHeader(sheet);
    }

    // Thời gian đăng ký (Giờ Việt Nam)
    const timestamp = Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");

    // Chuẩn bị dữ liệu từng cột
    const rowData = [
      timestamp,                                                      // Cột A: Thời gian
      data.id || ("IDOL-" + Math.floor(1000 + Math.random() * 9000)), // Cột B: Mã đơn
      data.fullName || "Chưa nhập",                                  // Cột C: Họ và tên
      "'" + (data.phone || ""),                                       // Cột D: Số điện thoại (dấu ' để giữ số 0 đầu)
      "'" + (data.zalo || data.phone || ""),                          // Cột E: Số Zalo
      data.birthYear || "",                                           // Cột F: Năm sinh
      data.gender === 'female' ? 'Nữ' : (data.gender === 'male' ? 'Nam' : 'Khác'), // Cột G: Giới tính
      data.city || "",                                                // Cột H: Khu vực / Tỉnh thành
      formatPlatform(data.platform),                                  // Cột I: Nền tảng
      data.liveHoursPerDay || "",                                     // Cột J: Giờ live/ngày
      data.shiftPreference || "",                                     // Cột K: Ca live mong muốn
      Array.isArray(data.talents) ? data.talents.join(", ") : (data.talents || ""), // Cột L: Năng khiếu
      data.socialLink || "Không có",                                  // Cột M: Link MXH / Video
      data.note || "",                                                // Cột N: Ghi chú
      "Mới ứng tuyển"                                                 // Cột O: Trạng thái duyệt
    ];

    // Chèn dòng mới vào trang tính
    sheet.appendRow(rowData);

    // Định dạng dòng vừa thêm
    const lastRow = sheet.getLastRow();
    const rowRange = sheet.getRange(lastRow, 1, 1, rowData.length);
    rowRange.setVerticalAlignment("middle");
    rowRange.setFontFamily("Roboto");
    rowRange.setFontSize(10);
    
    // Đổi màu cột trạng thái
    sheet.getRange(lastRow, 15).setBackground("#FEF3C7").setFontColor("#92400E").setFontWeight("bold");

    // Gửi email thông báo tức thì cho CEO Hoàng Liêm nếu bật
    if (SEND_EMAIL_NOTIFICATION && NOTIFICATION_EMAIL) {
      try {
        sendNotificationEmail(data, timestamp);
      } catch (mailErr) {
        Logger.log("Lỗi gửi mail: " + mailErr.toString());
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Đã lưu ứng viên thành công vào Google Sheets!",
      candidateId: data.id
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Lỗi xử lý đơn: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Xử lý kiểm tra kết nối từ trình duyệt (GET Request)
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "active",
    agency: "GALAXY LIVE AGENCY",
    founder: "CEO HOÀNG LIÊM",
    message: "Google Apps Script Webhook đang hoạt động tốt và sẵn sàng tiếp nhận đơn ứng tuyển!"
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Khởi tạo tiêu đề bảng trang tính với thiết kế sang trọng
 */
function initSheetHeader(sheet) {
  const headers = [
    "Thời Gian Nộp",
    "Mã Ứng Viên",
    "Họ Và Tên",
    "Số Điện Thoại",
    "Số Zalo Liên Hệ",
    "Năm Sinh",
    "Giới Tính",
    "Khu Vực",
    "Nền Tảng Live",
    "Giờ Live / Ngày",
    "Ca Live Đăng Ký",
    "Năng Khiếu / Thế Mạnh",
    "Link Tài Khoản / Video",
    "Ghi Chú",
    "Trạng Thái Xử Lý"
  ];

  sheet.clear();
  sheet.appendRow(headers);

  // Định dạng hàng tiêu đề
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#0F172A"); // Màu xanh đen Galaxy cao cấp
  headerRange.setFontColor("#38BDF8"); // Chữ xanh Cyan nổi bật
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(11);
  headerRange.setFontFamily("Roboto");
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  headerRange.setWrap(true);
  sheet.setRowHeight(1, 40);

  // Cố định dòng tiêu đề
  sheet.setFrozenRows(1);

  // Căn chỉnh độ rộng cột tối ưu
  sheet.setColumnWidth(1, 150); // Thời gian
  sheet.setColumnWidth(2, 130); // Mã
  sheet.setColumnWidth(3, 180); // Họ tên
  sheet.setColumnWidth(4, 130); // SĐT
  sheet.setColumnWidth(5, 130); // Zalo
  sheet.setColumnWidth(6, 90);  // Năm sinh
  sheet.setColumnWidth(7, 90);  // Giới tính
  sheet.setColumnWidth(8, 130); // Khu vực
  sheet.setColumnWidth(9, 140); // Nền tảng
  sheet.setColumnWidth(10, 130);// Giờ live
  sheet.setColumnWidth(11, 160);// Ca live
  sheet.setColumnWidth(12, 220);// Năng khiếu
  sheet.setColumnWidth(13, 200);// Link
  sheet.setColumnWidth(14, 200);// Ghi chú
  sheet.setColumnWidth(15, 140);// Trạng thái
}

/**
 * Định dạng tên nền tảng hiển thị rõ ràng
 */
function formatPlatform(platform) {
  switch (platform) {
    case 'bigo': return 'Bigo Live';
    case 'tiktok': return 'TikTok Live';
    case 'both': return 'Cả Bigo & TikTok';
    default: return platform || 'Đa nền tảng';
  }
}

/**
 * Gửi email thông báo tự động khi có bạn mới ứng tuyển
 */
function sendNotificationEmail(data, timestamp) {
  const subject = "🔥 [GALAXY LIVE] Ứng viên Idol mới: " + (data.fullName || "Ẩn danh") + " (" + (data.phone || "") + ")";
  const body = `
Xin chào CEO Hoàng Liêm,

Hệ thống Galaxy Live Agency vừa ghi nhận 1 đơn ứng tuyển mới:

- Họ và tên: ${data.fullName || "Chưa có"}
- Số điện thoại: ${data.phone || "Chưa có"}
- Zalo: ${data.zalo || data.phone || "Chưa có"}
- Năm sinh: ${data.birthYear || "N/A"} (${data.gender === 'female' ? 'Nữ' : 'Nam'})
- Khu vực: ${data.city || "Chưa rõ"}
- Nền tảng đăng ký: ${formatPlatform(data.platform)}
- Thời lượng: ${data.liveHoursPerDay || "N/A"}
- Ca live: ${data.shiftPreference || "N/A"}
- Năng khiếu: ${Array.isArray(data.talents) ? data.talents.join(", ") : (data.talents || "Chưa có")}
- Link MXH: ${data.socialLink || "Không có"}
- Ghi chú: ${data.note || "Không có"}
- Thời gian nộp: ${timestamp}

👉 Vui lòng mở Google Sheets để xem và liên hệ Zalo phỏng vấn ứng viên ngay!
Trân trọng,
Galaxy Live Agency Auto-Notification System
  `;

  MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
}
