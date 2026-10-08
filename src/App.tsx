/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CosmicBackground } from './components/CosmicBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { GalaxyLiveShowcaseBanner } from './components/GalaxyLiveShowcaseBanner';
import { PlatformsSection } from './components/PlatformsSection';
import { IncomeCalculator } from './components/IncomeCalculator';
import { BenefitsSection } from './components/BenefitsSection';
import { FounderSection } from './components/FounderSection';
import { IdolShowcase } from './components/IdolShowcase';
import { DanceTeamSection } from './components/DanceTeamSection';
import { RoadmapSection } from './components/RoadmapSection';
import { ApplicationFormSection } from './components/ApplicationFormSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { AdminPortalModal } from './components/AdminPortalModal';
import { FloatingWidgets } from './components/FloatingWidgets';
import { ApplicationFormData } from './types';

const INITIAL_SEED_APPLICATIONS: ApplicationFormData[] = [
  {
    id: 'IDOL-2026-2297',
    fullName: 'Vũ Phương Linh (Đơn Test Hệ Thống)',
    phone: '0988668899',
    zalo: '0988668899',
    email: 'phuonglinh.idol@gmail.com',
    birthYear: '2003',
    gender: 'female',
    city: 'TP. Hồ Chí Minh',
    platform: 'both',
    liveHoursPerDay: '3.5 giờ/ngày',
    shiftPreference: 'Tối (19h00 - 22h30)',
    talents: ['Ca hát', 'Tâm sự & Giao lưu', 'PK Kịch tính'],
    socialLink: 'https://tiktok.com/@phuonglinh.live',
    note: 'Đơn thử nghiệm tự động kết nối Google Sheets thành công rực rỡ!',
    createdAt: new Date().toISOString(),
    status: 'pending'
  },
  {
    id: 'IDOL-2026-9041',
    fullName: 'Vũ Thu Trang',
    phone: '0978345612',
    zalo: '0978345612',
    email: 'thutrang.live@gmail.com',
    birthYear: '2003',
    gender: 'female',
    city: 'Hà Nội',
    platform: 'bigo',
    liveHoursPerDay: '3 giờ/ngày',
    shiftPreference: 'Tối (19h00 - 22h30)',
    talents: ['Ca hát', 'Tâm sự & Giao lưu'],
    socialLink: 'https://tiktok.com/@thutrang_sing',
    note: 'Em muốn đăng ký nhận bộ đèn live về phòng trọ',
    createdAt: '2026-10-04T19:30:00.000Z',
    status: 'contacted'
  },
  {
    id: 'IDOL-2026-8812',
    fullName: 'Hoàng Minh Quân',
    phone: '0903889123',
    zalo: '0903889123',
    email: 'quan.comedy@gmail.com',
    birthYear: '2001',
    gender: 'male',
    city: 'TP. Hồ Chí Minh',
    platform: 'tiktok',
    liveHoursPerDay: '4-5 giờ/ngày',
    shiftPreference: 'Đêm khuya (22h30 - 02h00)',
    talents: ['Hài hước / Chém gió', 'Chơi Game'],
    socialLink: 'https://tiktok.com/@quan_comedy',
    note: 'Đã có kinh nghiệm live tự do 2 tháng, muốn vào MCN Hoàng Liêm để mở khóa PK',
    createdAt: '2026-10-04T20:15:00.000Z',
    status: 'audition_scheduled'
  },
  {
    id: 'IDOL-2026-7734',
    fullName: 'Lê Phương Thảo',
    phone: '0912445889',
    zalo: '0912445889',
    email: 'thao.lee.dance@gmail.com',
    birthYear: '2004',
    gender: 'female',
    city: 'Đà Nẵng',
    platform: 'both',
    liveHoursPerDay: '3 giờ/ngày',
    shiftPreference: 'Tối (19h00 - 22h30)',
    talents: ['Nhảy múa / Vũ đạo', 'Makeup / Thời trang'],
    socialLink: 'https://instagram.com/thao_lee',
    note: 'Em mới bắt đầu, mong anh Liêm định hướng phong cách',
    createdAt: '2026-10-04T21:45:00.000Z',
    status: 'pending'
  }
];

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [applications, setApplications] = useState<ApplicationFormData[]>(() => {
    try {
      const saved = localStorage.getItem('galaxy_idol_applications');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_SEED_APPLICATIONS;
  });

  const [formPreFill, setFormPreFill] = useState<{ platform: string; liveHours: string }>({
    platform: 'bigo',
    liveHours: '3 giờ/ngày'
  });

  useEffect(() => {
    try {
      localStorage.setItem('galaxy_idol_applications', JSON.stringify(applications));
    } catch (e) {
      console.error(e);
    }
  }, [applications]);

  // Admin Mode: ONLY enabled when staff/CEO visits via #admin, ?admin=true, or shortcut Ctrl+Shift+A
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    try {
      return (
        window.location.hash === '#admin' ||
        window.location.search.includes('admin=true') ||
        sessionStorage.getItem('galaxy_admin_mode') === 'true'
      );
    } catch {
      return false;
    }
  });

  // Secret Admin Access for CEO (via URL #admin, ?admin=true, or shortcut Ctrl+Shift+A)
  useEffect(() => {
    const checkAdminTrigger = () => {
      if (window.location.hash === '#admin' || window.location.search.includes('admin=true')) {
        setIsAdminMode(true);
        setIsAdminOpen(true);
        try {
          sessionStorage.setItem('galaxy_admin_mode', 'true');
        } catch (e) {}
      }
    };
    checkAdminTrigger();
    window.addEventListener('hashchange', checkAdminTrigger);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminMode(true);
        setIsAdminOpen(prev => !prev);
        try {
          sessionStorage.setItem('galaxy_admin_mode', 'true');
        } catch (e) {}
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkAdminTrigger);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNewApplication = (candidate: ApplicationFormData) => {
    setApplications(prev => [candidate, ...prev]);
  };

  const handleUpdateStatus = (id: string, newStatus: ApplicationFormData['status']) => {
    setApplications(prev =>
      prev.map(app => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  const handleDeleteApplication = (id: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  const handleSelectPlatform = (platformId: string) => {
    setFormPreFill(prev => ({ ...prev, platform: platformId }));
    const formEl = document.getElementById('apply');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePreFillForm = (data: { platform: string; liveHours: string }) => {
    setFormPreFill(data);
  };

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 relative selection:bg-cyan-500 selection:text-black">
      {/* Dynamic Cosmic Background */}
      <CosmicBackground />

      {/* Main Navigation */}
      <Navbar 
        onOpenAdmin={() => setIsAdminOpen(true)} 
        candidateCount={applications.length}
        showAdminButton={isAdminMode}
      />

      <main className="relative z-10">
        {/* Hero Section with Live PK Stream Simulation */}
        <HeroSection />

        {/* Galaxy Live Agency Banner & Hot Idols Tier Showcase (Matching user image) */}
        <GalaxyLiveShowcaseBanner />

        {/* Platforms Showcase: Bigo Live, TikTok Live, Other Apps */}
        <PlatformsSection onSelectPlatform={handleSelectPlatform} />

        {/* Interactive Income Calculator */}
        <IncomeCalculator onPreFillForm={handlePreFillForm} />

        {/* Core Benefits & Free Equipment Kit */}
        <BenefitsSection />

        {/* Leadership & Recruitment Director Spotlight: CEO Hoàng Liêm */}
        <FounderSection />

        {/* Top Idols Showcase & Testimonials */}
        <IdolShowcase />

        {/* Recruitment for Offline Studio Dance Team with YouTube Shorts Video */}
        <DanceTeamSection onSelectPlatform={handleSelectPlatform} />

        {/* 4-Step Roadmap */}
        <RoadmapSection />

        {/* Application Form */}
        <ApplicationFormSection
          preFilledData={formPreFill}
          onNewApplication={handleNewApplication}
        />

        {/* FAQ Accordion */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => {
        setIsAdminMode(true);
        setIsAdminOpen(true);
        try {
          sessionStorage.setItem('galaxy_admin_mode', 'true');
        } catch (e) {}
      }} />

      {/* Recruiter / Admin Portal Modal */}
      <AdminPortalModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        applications={applications}
        onUpdateStatus={handleUpdateStatus}
        onDeleteApplication={handleDeleteApplication}
      />

      {/* Floating Ticker & Quick Contact Actions */}
      <FloatingWidgets 
        onOpenAdmin={isAdminMode ? () => setIsAdminOpen(true) : undefined} 
        candidateCount={applications.length} 
      />
    </div>
  );
}
