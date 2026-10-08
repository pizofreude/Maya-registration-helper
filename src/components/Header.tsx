import React, { useState } from 'react';
import { Logo } from './Logo';
import { Share2 } from 'lucide-react';
import { SocialShareModal } from './SocialShareModal';

export const Header: React.FC = () => {
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <>
      <header className="border-b border-[#C4C7C5]/50 bg-[#F8F9FA]/95 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Zone 1: MD3 Brand title wordmark */}
          <div className="flex items-center gap-3.5">
            <Logo className="w-10 h-10 shadow-xs" size={40} />
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-[#1A1C1E] leading-tight">
                MAYA Registration Helper
              </h1>
              <p className="text-xs text-[#44474E] hidden sm:block font-normal">
                Universiti Malaya · Elective Course Readiness & Timetable Assistant
              </p>
            </div>
          </div>

          {/* Zone 2: MD3 Navigation text buttons */}
          <nav className="hidden md:flex items-center gap-1 text-xs sm:text-sm font-medium text-[#44474E]">
            <a
              href="#checker"
              className="px-3.5 py-1.5 rounded-full hover:bg-black/5 hover:text-[#1A1C1E] transition-colors"
            >
              Course Checker
            </a>
            <a
              href="#risk-board"
              className="px-3.5 py-1.5 rounded-full hover:bg-black/5 hover:text-[#1A1C1E] transition-colors"
            >
              Risk Board
            </a>
            <a
              href="#summary"
              className="px-3.5 py-1.5 rounded-full hover:bg-black/5 hover:text-[#1A1C1E] transition-colors"
            >
              Readiness Summary
            </a>
          </nav>

          {/* Zone 3: MD3 Status Assist Chip & Share Action */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsShareOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#C4C7C5]/60 hover:bg-[#F0F4F9] text-xs font-semibold text-[#1A1C1E] transition-colors shadow-2xs"
              title="Preview OpenGraph Social Card & Share"
            >
              <Share2 className="w-3.5 h-3.5 text-[#0B2545]" />
              <span className="hidden sm:inline">Share Card</span>
            </button>

            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8EEF7] border border-[#0B2545]/15 text-xs font-medium text-[#001A41]">
              <span className="w-2 h-2 rounded-full bg-[#1B6E3E] ring-2 ring-[#D1F2D9]" />
              <span>Sem 2, 2026/2027</span>
            </div>
          </div>
        </div>
      </header>

      {/* Social Share Modal with live OG Image preview */}
      <SocialShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
    </>
  );
};


