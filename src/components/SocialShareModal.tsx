import React, { useState } from 'react';
import { Share2, X, Check, Copy, ExternalLink, Sparkles } from 'lucide-react';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-pre-26ba7szdkk52hrnsjnz5mo-342629783270.asia-southeast1.run.app';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white border border-[#C4C7C5]/50 rounded-3xl max-w-xl w-full p-6 shadow-xl relative animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 text-[#44474E] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#D8E2FF] flex items-center justify-center text-[#001A41]">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 id="share-modal-title" className="text-lg font-bold text-[#1A1C1E]">
              Social Media OpenGraph Card
            </h3>
            <p className="text-xs text-[#44474E]">
              Preview how this applet looks when shared on Twitter/X, WhatsApp, Discord & LinkedIn.
            </p>
          </div>
        </div>

        {/* Live OpenGraph Card Preview */}
        <div className="mb-5 rounded-2xl overflow-hidden border border-[#C4C7C5]/50 bg-[#061224] shadow-sm">
          <div className="relative aspect-[1200/630] w-full overflow-hidden bg-slate-900">
            <img
              src="/og-image.png"
              alt="MAYA Registration Helper OpenGraph preview card"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="p-3.5 bg-white border-t border-[#E1E2E6]">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#74777F]">
              MAYA.UM.EDU.MY · PREVIEW CARD
            </div>
            <h4 className="text-sm font-bold text-[#1A1C1E] mt-0.5 line-clamp-1">
              MAYA Registration Helper – Universiti Malaya
            </h4>
            <p className="text-xs text-[#44474E] mt-0.5 line-clamp-2">
              Pre-registration readiness helper: Check sample UM elective eligibility, detect timetable overlaps in real time, and review seat quota pressure.
            </p>
          </div>
        </div>

        {/* Share Link Actions */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 p-1.5 pl-3.5 bg-[#F0F4F9] border border-[#C4C7C5]/40 rounded-full">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="bg-transparent text-xs text-[#1A1C1E] font-mono flex-1 outline-none truncate"
            />
            <button
              onClick={handleCopy}
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0B2545] text-white text-xs font-semibold hover:bg-[#001A41] transition-all shadow-xs shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#74777F] pt-2">
            <span>Standard 1200 × 630 px format</span>
            <a
              href="/og-image.png"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[#0B2545] font-semibold hover:underline"
            >
              <span>View full image</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
