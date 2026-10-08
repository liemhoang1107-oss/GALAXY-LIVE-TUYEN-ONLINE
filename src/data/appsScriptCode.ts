export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * ==============================================================================
 * GALAXY LIVE AGENCY - TỰ ĐỘNG ĐỒNG BỘ ỨNG VIÊN VÀO GOOGLE SHEETS
 * MENTOR & CEO: HOÀNG LIÊM
 * ==============================================================================
 */

const SHEET_NAME = "Ứng Viên Galaxy Live";
const SEND_EMAIL_NOTIFICATION = true;
const NOTIFICATION_EMAIL = "liemhoang1107@gmail.com"; 

/**
 * Xử lý khi website gửi yêu cầu GET (vừa kiểm tra kết nối, vừa hỗ trợ gửi đơn)
 */
function doGet(e) {
  if (e && e.parameter && (e.parameter.fullName || e.parameter.phone || e.parameter.data)) {
    return handleSaveCandidate(e);
  }
  return ContentService.createTextOutput(JSON.stringify({
    status: "active",
    agency: "GALAXY LIVE AGENCY",
    founder: "CEO HOÀNG LIÊM",
    message: "Google Apps Script Webhook đang hoạt động tốt và sẵn sàng tiếp nhận đơn ứng tuyển!"
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Xử lý khi website gửi yêu cầu POST
 */
function doPost(e) {
  return handleSaveCandidate(e);
}

/**
 * Hàm chung lưu ứng viên vào Google Sheets
 */
function handleSaveCandidate(e) {
  try {
    let data = {};

    if (e.parameter && e.parameter.data) {
      try {
        data = JSON.parse(e.parameter.data);
      } catch (err) {}
    } else if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else if (e.parameter) {
      data = e.parameter;
    }

    const ss = getSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      initSheetHeader(sheet);
    }

    const timestamp = Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");

    const rowData = [
      timestamp,
      data.id || ("IDOL-" + Math.floor(1000 + Math.random() * 9000)),
      data.fullName || "Chưa nhập",
      "'" + (data.phone || ""),
      "'" + (data.zalo || data.phone || ""),
      data.birthYear || "",
      data.gender === 'female' ? 'Nữ' : (data.gender === 'male' ? 'Nam' : 'Khác'),
      data.city || "",
      formatPlatform(data.platform),
      data.liveHoursPerDay || "",
      data.shiftPreference || "",
      Array.isArray(data.talents) ? data.talents.join(", ") : (data.talents || ""),
      data.socialLink || "Không có",
      data.note || "",
      "Mới ứng tuyển"
    ];

    sheet.appendRow(rowData);

    const lastRow = sheet.getLastRow();
    const rowRange = sheet.getRange(lastRow, 1, 1, rowData.length);
    rowRange.setVerticalAlignment("middle");
    rowRange.setFontFamily("Roboto");
    rowRange.setFontSize(10);
    sheet.getRange(lastRow, 15).setBackground("#FEF3C7").setFontColor("#92400E").setFontWeight("bold");

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
    Logger.log("Lỗi: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Lấy trang tính hiện tại hoặc tự động mở/tạo mới nếu chạy độc lập
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
    "Ghi Chú Của Ứng Viên",
    "Trạng Thái Xử Lý"
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

  sheet.setColumnWidth(1, 150);
  sheet.setColumnWidth(2, 130);
  sheet.setColumnWidth(3, 180);
  sheet.setColumnWidth(4, 130);
  sheet.setColumnWidth(5, 130);
  sheet.setColumnWidth(6, 90);
  sheet.setColumnWidth(7, 90);
  sheet.setColumnWidth(8, 130);
  sheet.setColumnWidth(9, 140);
  sheet.setColumnWidth(10, 130);
  sheet.setColumnWidth(11, 160);
  sheet.setColumnWidth(12, 220);
  sheet.setColumnWidth(13, 200);
  sheet.setColumnWidth(14, 200);
  sheet.setColumnWidth(15, 140);
}

function formatPlatform(platform) {
  switch (platform) {
    case 'bigo': return 'Bigo Live';
    case 'tiktok': return 'TikTok Live';
    case 'both': return 'Cả Bigo & TikTok';
    default: return platform || 'Đa nền tảng';
  }
}

function sendNotificationEmail(data, timestamp) {
  const subject = "🔥 [GALAXY LIVE] Ứng viên Idol mới: " + (data.fullName || "Ẩn danh") + " (" + (data.phone || "") + ")";
  const body = 
    "Xin chào CEO Hoàng Liêm,\\n\\n" +
    "Hệ thống Galaxy Live Agency vừa ghi nhận 1 đơn ứng tuyển mới:\\n\\n" +
    "- Họ và tên: " + (data.fullName || "Chưa có") + "\\n" +
    "- Số điện thoại: " + (data.phone || "Chưa có") + "\\n" +
    "- Zalo: " + (data.zalo || data.phone || "Chưa có") + "\\n" +
    "- Năm sinh: " + (data.birthYear || "N/A") + " (" + (data.gender === 'female' ? 'Nữ' : 'Nam') + ")\\n" +
    "- Khu vực: " + (data.city || "Chưa rõ") + "\\n" +
    "- Nền tảng đăng ký: " + formatPlatform(data.platform) + "\\n" +
    "- Thời lượng live: " + (data.liveHoursPerDay || "N/A") + "\\n" +
    "- Ca live: " + (data.shiftPreference || "N/A") + "\\n" +
    "- Năng khiếu: " + (Array.isArray(data.talents) ? data.talents.join(", ") : (data.talents || "Chưa có")) + "\\n" +
    "- Link MXH/Clip: " + (data.socialLink || "Không có") + "\\n" +
    "- Ghi chú: " + (data.note || "Không có") + "\\n" +
    "- Thời gian nộp: " + timestamp + "\\n\\n" +
    "👉 Vui lòng mở Google Sheets để kiểm tra và liên hệ Zalo phỏng vấn ứng viên ngay!\\n" +
    "Trân trọng,\\n" +
    "Galaxy Live Agency Auto-Notification System";

  MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
}
`;
