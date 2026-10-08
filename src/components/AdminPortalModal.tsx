import React, { useState, useEffect } from 'react';
import { 
  X, Search, Phone, MessageSquare, Download, Trash2, CheckCircle2, 
  Clock, Calendar, User, ExternalLink, Link, Copy, Check, Send, 
  FileCode, Sparkles, AlertCircle, Database, Lock, Unlock, KeyRound, 
  Eye, EyeOff, LogOut, ShieldCheck, Mail
} from 'lucide-react';
import { ApplicationFormData } from '../types';
import { GOOGLE_APPS_SCRIPT_CODE } from '../data/appsScriptCode';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  applications: ApplicationFormData[];
  onUpdateStatus: (id: string, newStatus: ApplicationFormData['status']) => void;
  onDeleteApplication: (id: string) => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose,
  applications,
  onUpdateStatus,
  onDeleteApplication
}) => {
  const [activeTab, setActiveTab] = useState<'applications' | 'sheets'>('applications');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  
  // Admin Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('galaxy_admin_authenticated') === 'true';
    } catch {
      return false;
    }
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [changePassSuccess, setChangePassSuccess] = useState(false);

  const getAdminPassword = () => {
    try {
      return localStorage.getItem('galaxy_admin_password') || '888888';
    } catch {
      return '888888';
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = getAdminPassword();
    if (passwordInput.trim() === correctPassword) {
      setIsAuthenticated(true);
      setAuthError('');
      try {
        sessionStorage.setItem('galaxy_admin_authenticated', 'true');
      } catch (err) {}
    } else {
      setAuthError('Mật mã không đúng! Vui lòng kiểm tra lại.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    try {
      sessionStorage.removeItem('galaxy_admin_authenticated');
    } catch (err) {}
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPasswordInput.trim().length < 4) {
      alert('Mật khẩu mới phải có ít nhất 4 ký tự!');
      return;
    }
    try {
      localStorage.setItem('galaxy_admin_password', newPasswordInput.trim());
      setChangePassSuccess(true);
      setTimeout(() => {
        setChangePassSuccess(false);
        setIsChangingPassword(false);
        setNewPasswordInput('');
      }, 1500);
    } catch (err) {
      console.error(err);
    }
  };

  // Google Sheets Apps Script Webhook State
  const [webhookUrl, setWebhookUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('galaxy_google_sheets_webhook') || 'https://script.google.com/macros/s/AKfycbxIKLwUdWMcJTPkxuwaI1vX9HTu4WkX2d9SoPwcaJWWEwMMcgacD311wgQSWefiVaEF/exec';
    } catch {
      return 'https://script.google.com/macros/s/AKfycbxIKLwUdWMcJTPkxuwaI1vX9HTu4WkX2d9SoPwcaJWWEwMMcgacD311wgQSWefiVaEF/exec';
    }
  });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [testingWebhook, setTestingWebhook] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const handleSaveWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('galaxy_google_sheets_webhook', webhookUrl.trim());
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 3000);
  };

  const handleDownloadCode = () => {
    const blob = new Blob([GOOGLE_APPS_SCRIPT_CODE], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Code.gs';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleTestWebhook = async () => {
    if (!webhookUrl.trim() || !webhookUrl.startsWith('http')) {
      setTestResult({ success: false, message: 'Vui lòng nhập đường link Web App URL hợp lệ (bắt đầu bằng https://script.google.com/)' });
      return;
    }

    setTestingWebhook(true);
    setTestResult(null);

    const sampleCandidate: ApplicationFormData = {
      id: `TEST-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: 'Hoàng Liêm (Test Hệ Thống)',
      phone: '0382355777',
      zalo: '0382355777',
      email: 'hliem247@gmail.com',
      birthYear: '2000',
      gender: 'male',
      city: 'Hà Nội',
      platform: 'both',
      liveHoursPerDay: '3.5 giờ/ngày',
      shiftPreference: 'Tối (19h00 - 22h30)',
      talents: ['Tâm sự & Giao lưu', 'Ca hát'],
      socialLink: 'https://tiktok.com/@hoangliem.live',
      note: 'Đơn test tự động từ Admin Portal của CEO Hoàng Liêm',
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    try {
      await fetch(webhookUrl.trim(), {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(sampleCandidate)
      });

      // Dual trigger via GET beacon & fetch for 100% receipt
      try {
        const params = new URLSearchParams({
          data: JSON.stringify(sampleCandidate),
          fullName: sampleCandidate.fullName,
          phone: sampleCandidate.phone,
          zalo: sampleCandidate.zalo,
          email: sampleCandidate.email,
          id: sampleCandidate.id,
          city: sampleCandidate.city,
          platform: sampleCandidate.platform
        });
        const getUrl = `${webhookUrl.trim()}${webhookUrl.trim().includes('?') ? '&' : '?'}${params.toString()}`;
        fetch(getUrl, { method: 'GET', mode: 'no-cors' }).catch(() => {});
        const img = new Image();
        img.src = getUrl;
      } catch (beaconErr) {
        // ignore
      }

      setTestResult({
        success: true,
        message: '✓ Đã kích hoạt gửi đơn thử nghiệm! Bạn hãy kiểm tra: 1. Hòm thư Gmail (hliem247@gmail.com & liemhoang1107@gmail.com); 2. Bảng tính Google Sheets có hàng mới và Note tự động màu vàng!'
      });
    } catch (err: any) {
      setTestResult({
        success: false,
        message: 'Lỗi gửi dữ liệu: ' + (err.message || 'Không thể kết nối đến Webhook Apps Script')
      });
    } finally {
      setTestingWebhook(false);
    }
  };

  const filtered = applications.filter((app) => {
    const matchSearch =
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone.includes(searchTerm) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchPlatform = platformFilter === 'all' || app.platform === platformFilter;

    return matchSearch && matchStatus && matchPlatform;
  });

  const getStatusBadge = (status: ApplicationFormData['status']) => {
    switch (status) {
      case 'pending':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">Mới ứng tuyển</span>;
      case 'contacted':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">Đã liên hệ Zalo</span>;
      case 'audition_scheduled':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">Hẹn Test Camera</span>;
      case 'approved':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Đã Ký Hợp Đồng</span>;
      case 'rejected':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/30">Không phù hợp</span>;
    }
  };

  const exportCSV = () => {
    const headers = ['Mã Đơn', 'Họ Tên', 'SĐT', 'Zalo', 'Gmail/Email', 'Năm Sinh', 'Giới Tính', 'Tỉnh Thành', 'App', 'Giờ Live', 'Ca Live', 'Thế Mạnh', 'Link MXH', 'Trạng Thái', 'Ngày Nộp'];
    const rows = applications.map(a => [
      a.id,
      `"${a.fullName}"`,
      `"${a.phone}"`,
      `"${a.zalo}"`,
      `"${a.email || ''}"`,
      a.birthYear,
      a.gender,
      `"${a.city}"`,
      a.platform,
      `"${a.liveHoursPerDay}"`,
      `"${a.shiftPreference}"`,
      `"${a.talents.join(', ')}"`,
      `"${a.socialLink || ''}"`,
      a.status,
      a.createdAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `galaxy_idol_ung_vien_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 1. Passcode Gate Screen when not authenticated
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
        <div className="w-full max-w-md rounded-3xl p-1 bg-gradient-to-br from-cyan-500/40 via-purple-500/30 to-blue-600/40 shadow-2xl shadow-cyan-950/80">
          <div className="bg-[#0b1029] rounded-[22px] p-6 sm:p-8 border border-white/10 text-center relative overflow-hidden">
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Glowing Lock Emblem */}
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 p-0.5 mx-auto mb-4 shadow-lg shadow-cyan-500/30">
              <div className="w-full h-full bg-[#080d22] rounded-[14px] flex items-center justify-center">
                <Lock className="w-8 h-8 text-cyan-300 animate-pulse" />
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              XÁC THỰC QUẢN TRỊ VIÊN
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">
              Dành riêng cho CEO Hoàng Liêm & nhân viên kiểm tra hồ sơ ứng viên Galaxy Live.
            </p>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="mt-6 space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Nhập Mật Mã Quản Trị:
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    autoFocus
                    required
                    placeholder="Nhập mật khẩu để mở khóa..."
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (authError) setAuthError('');
                    }}
                    className="w-full pl-4 pr-11 py-3 rounded-xl bg-slate-900 border border-white/15 text-white text-sm font-mono tracking-widest focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {authError && (
                  <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{authError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>Mở Khóa Quản Lý Hồ Sơ</span>
              </button>
            </form>

          </div>
        </div>
      </div>
    );
  }

  // 2. Authenticated Admin Portal Screen
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-5xl h-[88vh] bg-[#0b1026] rounded-3xl border border-cyan-500/40 shadow-2xl flex flex-col overflow-hidden animate-fadeIn relative">
        
        {/* Change Password Dialog Modal */}
        {isChangingPassword && (
          <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
            <div className="w-full max-w-sm bg-[#0e163b] rounded-2xl p-6 border border-cyan-500/40 shadow-2xl text-left">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-cyan-400" />
                  <span>Đổi Mật Mã Quản Trị Mới</span>
                </h4>
                <button 
                  onClick={() => setIsChangingPassword(false)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-300 font-semibold mb-1">
                    Nhập Mật Mã Mới Cho Nhân Viên / CEO:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: 123456, hoangliem88..."
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {changePassSuccess && (
                  <p className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
                    <Check className="w-3.5 h-3.5" />
                    <span>Đã đổi mật khẩu thành công!</span>
                  </p>
                )}

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs uppercase"
                  >
                    Lưu Mật Mã Mới
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsChangingPassword(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#080d22]">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white">Quản Trị Hệ Thống Galaxy Live</h2>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold">
                {applications.length} Ứng viên
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Dành riêng cho Giám đốc tuyển dụng CEO Hoàng Liêm & Ban Quản Trị
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Change Passcode button */}
            <button
              onClick={() => setIsChangingPassword(true)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/10"
              title="Đổi mật mã Admin cho nhân viên"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Đổi Mật Mã</span>
            </button>

            {/* Logout / Lock button */}
            <button
              onClick={handleLogout}
              className="px-2.5 py-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-rose-500/30"
              title="Khóa cổng & Đăng xuất"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">Khóa Cổng</span>
            </button>

            <button
              onClick={exportCSV}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors border border-white/10"
              title="Xuất file CSV Excel"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Xuất Excel</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 sm:px-6 pt-3 bg-[#080d22] border-b border-white/10 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-2 border-t-2 transition-all ${
              activeTab === 'applications'
                ? 'bg-[#090e24] text-cyan-300 border-cyan-400 shadow-md'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Danh Sách Ứng Viên ({applications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('sheets')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-2 border-t-2 transition-all ${
              activeTab === 'sheets'
                ? 'bg-[#090e24] text-amber-300 border-amber-400 shadow-md'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <Database className="w-4 h-4 text-emerald-400" />
            <span>Đồng Bộ Google Sheets (Apps Script)</span>
            {webhookUrl ? (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Đã kết nối Webhook" />
            ) : (
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-500/20 text-amber-300">Chưa kết nối</span>
            )}
          </button>
        </div>

        {/* TAB 1: APPLICATIONS LIST */}
        {activeTab === 'applications' && (
          <>
            {/* Filters & Search Toolbar */}
            <div className="p-4 border-b border-white/5 bg-[#090e24] flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-[200px] relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm theo tên, SĐT, tỉnh thành hoặc mã đơn..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Status filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 text-xs focus:outline-none"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="pending">Mới ứng tuyển</option>
                <option value="contacted">Đã liên hệ Zalo</option>
                <option value="audition_scheduled">Hẹn Test Camera</option>
                <option value="approved">Đã Ký Hợp Đồng</option>
                <option value="rejected">Không phù hợp</option>
              </select>

              {/* Platform filter */}
              <select
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 text-xs focus:outline-none"
              >
                <option value="all">Tất cả nền tảng</option>
                <option value="bigo">Bigo Live</option>
                <option value="tiktok">TikTok Live</option>
                <option value="both">Cả 2 nền tảng</option>
                <option value="dance_offline">Nhóm Nhảy Offline Studio</option>
              </select>
            </div>

            {/* Applications List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filtered.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center text-slate-500">
                  <User className="w-12 h-12 mb-3 text-slate-600" />
                  <p className="text-sm">Không tìm thấy ứng viên nào phù hợp bộ lọc.</p>
                </div>
              ) : (
                filtered.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="p-4 rounded-2xl bg-[#0e1433] border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs text-cyan-400 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                          {candidate.id}
                        </span>
                        <h3 className="text-base font-black text-white">{candidate.fullName}</h3>
                        <span className="text-xs text-slate-400">
                          ({candidate.birthYear} · {candidate.gender === 'female' ? 'Nữ' : 'Nam'} · {candidate.city})
                        </span>
                        {getStatusBadge(candidate.status)}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-cyan-400" />
                          <a href={`tel:${candidate.phone}`} className="hover:text-cyan-300 font-mono">
                            {candidate.phone}
                          </a>
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Zalo: </span>
                          <a 
                            href={`https://zalo.me/${candidate.zalo.replace(/\s+/g, '')}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-emerald-300 hover:underline font-mono"
                          >
                            {candidate.zalo}
                          </a>
                        </span>
                        {candidate.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="w-3.5 h-3.5 text-amber-400" />
                            <span>Gmail: </span>
                            <a 
                              href={`mailto:${candidate.email}`}
                              className="text-amber-300 hover:underline font-mono"
                            >
                              {candidate.email}
                            </a>
                          </span>
                        )}
                        <span className="text-slate-400">
                          Đăng ký: <strong className="text-amber-300 uppercase">{candidate.platform}</strong> ({candidate.liveHoursPerDay} - {candidate.shiftPreference})
                        </span>
                      </div>

                      {/* Talents */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[11px] text-slate-400">Thế mạnh:</span>
                        {candidate.talents.map((t, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] text-slate-300 border border-white/5">
                            {t}
                          </span>
                        ))}
                      </div>

                      {candidate.socialLink && (
                        <div className="text-xs text-slate-400 flex items-center gap-1">
                          <span>Link MXH / Clip test:</span>
                          <a 
                            href={candidate.socialLink.startsWith('http') ? candidate.socialLink : `https://${candidate.socialLink}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:underline flex items-center gap-0.5 truncate max-w-xs"
                          >
                            <span className="truncate">{candidate.socialLink}</span>
                            <ExternalLink className="w-3 h-3 flex-shrink-0" />
                          </a>
                        </div>
                      )}

                      {candidate.note && (
                        <p className="text-xs text-slate-400 italic bg-black/30 p-2 rounded-lg border border-white/5">
                          "{candidate.note}"
                        </p>
                      )}
                    </div>

                    {/* Status Management Actions */}
                    <div className="flex flex-wrap items-center gap-2 lg:flex-col lg:items-end justify-between border-t lg:border-t-0 pt-3 lg:pt-0 border-white/10">
                      <div className="flex items-center gap-2">
                        <select
                          value={candidate.status}
                          onChange={(e) => onUpdateStatus(candidate.id, e.target.value as any)}
                          className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-white/20 text-xs text-white focus:outline-none focus:border-cyan-400 font-medium"
                        >
                          <option value="pending">Mới ứng tuyển</option>
                          <option value="contacted">Đã liên hệ Zalo</option>
                          <option value="audition_scheduled">Hẹn Test Camera</option>
                          <option value="approved">Đã Ký Hợp Đồng</option>
                          <option value="rejected">Không phù hợp</option>
                        </select>

                        <button
                          onClick={() => onDeleteApplication(candidate.id)}
                          className="p-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-800/40 transition-colors"
                          title="Xóa đơn ứng tuyển"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-[10px] text-slate-500">
                        {new Date(candidate.createdAt).toLocaleString('vi-VN')}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* TAB 2: GOOGLE SHEETS APPS SCRIPT INTEGRATION */}
        {activeTab === 'sheets' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* Intro Alert Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-cyan-950/30 to-slate-900 border border-emerald-500/30">
              <div className="flex items-start gap-3">
                <Database className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">Tự Động Đồng Bộ Hồ Sơ Sang Google Sheets Bằng Apps Script</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Mỗi khi có ứng viên mới bấm <strong>"Gửi Hồ Sơ Ứng Tuyển"</strong> trên website, toàn bộ thông tin (Họ tên, SĐT, Zalo, Nền tảng, Ca live, Năng khiếu...) sẽ được tự động thêm 1 dòng mới vào bảng tính Google Sheets của bạn ngay lập tức!
                  </p>
                </div>
              </div>
            </div>

            {/* Webhook URL Input & Test */}
            <div className="p-5 rounded-2xl bg-[#0e1433] border border-white/10 space-y-4">
              <h4 className="text-sm font-black text-cyan-300 flex items-center gap-2">
                <Link className="w-4 h-4" />
                <span>Bước Cuối: Dán URL Ứng Dụng Web (Web App URL) Của Bạn Vào Đây</span>
              </h4>

              <form onSubmit={handleSaveWebhook} className="flex flex-col sm:flex-row items-center gap-2">
                <input
                  type="url"
                  placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-cyan-500/20"
                >
                  <Check className="w-4 h-4" />
                  <span>Lưu Webhook</span>
                </button>
              </form>

              {savedSuccess && (
                <div className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Đã lưu thành công Webhook! Website đã sẵn sàng tự động đồng bộ sang Google Sheets.</span>
                </div>
              )}

              {/* Action Buttons: Test Webhook & Copy Script */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleTestWebhook}
                  disabled={testingWebhook}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow transition-all disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{testingWebhook ? 'Đang gửi kiểm tra...' : '🧪 Gửi thử nghiệm 1 đơn mẫu vào Google Sheets'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-white/10 transition-colors"
                >
                  {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                  <span>{copiedScript ? 'Đã sao chép mã Code.gs!' : '📋 Sao chép mã Google Apps Script'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadCode}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-white/10 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Tải file Code.gs về máy</span>
                </button>
              </div>

              {testResult && (
                <div className={`p-3 rounded-xl text-xs font-medium border ${
                  testResult.success 
                    ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40' 
                    : 'bg-red-950/40 text-red-300 border-red-500/40'
                }`}>
                  {testResult.message}
                </div>
              )}
            </div>

            {/* Step-by-Step Instructions */}
            <div className="p-5 rounded-2xl bg-[#090e24] border border-white/10 space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <FileCode className="w-4 h-4 text-cyan-400" />
                <span>Hướng Dẫn 4 Bước Cài Đặt Lên Google Sheets (Chỉ 2 Phút)</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-white/5 space-y-1.5">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px]">1</span>
                    <span>Tạo Trang Tính Google Sheets Mới</span>
                  </div>
                  <p className="text-slate-400 pl-6.5">
                    Mở <a href="https://sheets.new" target="_blank" rel="noreferrer" className="text-cyan-400 underline">sheets.new</a> hoặc trang tính Google Sheets của bạn. Đặt tên bảng tính là <strong>"Hồ Sơ Idol Galaxy Live"</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-white/5 space-y-1.5">
                  <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px]">2</span>
                    <span>Mở Trình Soạn Thảo Apps Script</span>
                  </div>
                  <p className="text-slate-400 pl-6.5">
                    Trên thanh menu của Google Sheets, chọn <strong>Tiện ích mở rộng (Extensions)</strong> &rarr; <strong>Apps Script</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-white/5 space-y-1.5">
                  <div className="font-bold text-purple-300 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-[10px]">3</span>
                    <span>Dán Toàn Bộ Mã Code.gs</span>
                  </div>
                  <p className="text-slate-400 pl-6.5">
                    Xóa sạch nội dung cũ trong file <code>Code.gs</code>, sau đó bấm nút <strong>"Sao chép mã"</strong> ở trên và dán toàn bộ vào. Bấm biểu tượng <strong>Lưu (Ctrl + S)</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-white/5 space-y-1.5">
                  <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">4</span>
                    <span>Triển Khai Dưới Dạng Ứng Dụng Web</span>
                  </div>
                  <p className="text-slate-400 pl-6.5 leading-relaxed">
                    Bấm <strong>Triển khai (Deploy)</strong> &rarr; <strong>Tùy chọn triển khai mới (New deployment)</strong>.<br />
                    - Chọn loại: <strong>Ứng dụng web (Web app)</strong>.<br />
                    - Ai có quyền truy cập: Chọn <strong>Bất kỳ ai (Anyone)</strong>.<br />
                    - Sao chép <strong>URL ứng dụng web</strong> và dán vào ô bên trên!
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs space-y-2 md:col-span-2">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <span>Lưu Ý Cốt Lõi Để Nhận Được Thông Báo Gmail & Ghi Note Tự Động:</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                    <li><strong>Quyền truy cập (Who has access):</strong> Bắt buộc chọn <strong>Bất kỳ ai (Anyone)</strong> để website gửi được dữ liệu.</li>
                    <li><strong>Cấp quyền gửi Gmail:</strong> Khi triển khai hoặc chạy thử, Google sẽ hiện hộp thoại xin quyền gửi thư (MailApp), bạn bấm <em>Nâng cao (Advanced)</em> &rarr; <em>Đi tới... (Go to...)</em> &rarr; <em>Cho phép (Allow)</em>.</li>
                    <li><strong>Kiểm tra tức thì trong Apps Script:</strong> Bạn có thể chọn hàm <code>testGuiThuVaGhiChu</code> trên thanh công cụ Apps Script rồi bấm nút <strong>Chạy (Run)</strong> để kiểm tra nhận email và ghi Note ngay lập tức!</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Code Preview Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">Nội dung mã nguồn Google Apps Script (Code.gs):</span>
                <button
                  onClick={handleCopyCode}
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                >
                  {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedScript ? 'Đã chép' : 'Sao chép'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-2xl bg-black/90 border border-white/10 text-slate-300 text-[11px] font-mono overflow-x-auto max-h-72 leading-relaxed">
                {GOOGLE_APPS_SCRIPT_CODE}
              </pre>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
