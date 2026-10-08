import React from 'react';
import { Course, StudentProfile, checkTimeClash } from '../data/courses';
import { CheckCircle2, AlertTriangle, Clock, Flame, BookOpen, AlertOctagon, Check } from 'lucide-react';

interface ReadinessSummarySectionProps {
  selectedCourse: Course;
  compareCourse: Course | null;
  profile: StudentProfile;
}

export const ReadinessSummarySection: React.FC<ReadinessSummarySectionProps> = ({
  selectedCourse,
  compareCourse,
  profile,
}) => {
  // 1. Prerequisite check
  const isYearMet = profile.yearLevel >= selectedCourse.yearLevel;
  const isPrereqMet =
    !selectedCourse.prerequisiteCode ||
    profile.completedCourses.includes(selectedCourse.prerequisiteCode);
  const prereqPass = isYearMet && isPrereqMet;

  // 2. Clash check
  const clashResult = compareCourse
    ? checkTimeClash(selectedCourse, compareCourse)
    : { hasClash: false };

  // 3. Pressure check
  const isHighPressure = selectedCourse.pressure === 'High';

  // Overall verdict: YES, MAYBE, or NO
  type VerdictType = 'YES' | 'MAYBE' | 'NO';
  let verdict: VerdictType = 'YES';
  let verdictTitle = 'YES — Safe to Register';
  let verdictBadgeBg = 'bg-[#1B6E3E] text-white';
  let verdictContainer = 'border-2 border-[#1B6E3E]/40 bg-[#D1F2D9]/30';
  let verdictDescription =
    'All requirements are satisfied, timetable is clear, and registration is likely to succeed smoothly.';

  const warningFlags: { type: 'danger' | 'warning' | 'info'; title: string; message: string }[] = [];

  // Determine warnings and verdict
  if (!prereqPass) {
    if (!isYearMet && !isPrereqMet) {
      warningFlags.push({
        type: 'danger',
        title: 'Prerequisite & Year Standing Unmet',
        message: `Requires Year ${selectedCourse.yearLevel} standing (current: Year ${profile.yearLevel}) and passed ${selectedCourse.prerequisiteCode}.`,
      });
    } else if (!isYearMet) {
      warningFlags.push({
        type: 'danger',
        title: 'Academic Year Standing Unmet',
        message: `Restricted to Year ${selectedCourse.yearLevel}+ students. Current standing: Year ${profile.yearLevel}.`,
      });
    } else {
      warningFlags.push({
        type: 'danger',
        title: 'Missing Required Prerequisite',
        message: `Must complete and pass ${selectedCourse.prerequisiteCode} (${selectedCourse.prerequisiteTitle}) prior to registering.`,
      });
    }
  }

  if (clashResult.hasClash && compareCourse) {
    warningFlags.push({
      type: 'danger',
      title: 'Timetable Clash Conflict',
      message: `Directly overlaps with ${compareCourse.code} on ${clashResult.overlapDetails}. MAYA will block concurrent registration.`,
    });
  }

  if (isHighPressure) {
    warningFlags.push({
      type: 'warning',
      title: 'High Demand Quota Contention',
      message: `${selectedCourse.pressureNote} (Estimated demand: ${selectedCourse.projectedEnrolledSample} for ${selectedCourse.quotaSample} seats).`,
    });
  }

  // Calculate final verdict
  if (!prereqPass || clashResult.hasClash) {
    verdict = 'NO';
    verdictTitle = 'NO — Action Required / Blocked';
    verdictBadgeBg = 'bg-[#BA1A1A] text-white';
    verdictContainer = 'border-2 border-[#BA1A1A]/40 bg-[#FFDAD6]/40';
    verdictDescription =
      'This course cannot be safely registered in MAYA due to unmet prerequisites, year restrictions, or timetable schedule clashes.';
  } else if (isHighPressure) {
    verdict = 'MAYBE';
    verdictTitle = 'MAYBE — Proceed With Caution';
    verdictBadgeBg = 'bg-[#D97706] text-white';
    verdictContainer = 'border-2 border-[#D97706]/40 bg-[#FEF3C7]/40';
    verdictDescription =
      'You are fully eligible with no timetable clashes, but high seat contention means you must register promptly at 8:00 AM and keep a backup plan ready.';
  } else {
    verdict = 'YES';
    verdictTitle = 'YES — Safe to Register';
    verdictBadgeBg = 'bg-[#1B6E3E] text-white';
    verdictContainer = 'border-2 border-[#1B6E3E]/40 bg-[#D1F2D9]/30';
    verdictDescription =
      'You meet all eligibility criteria, have no timetable conflicts, and seating quota is comfortable.';
  }

  return (
    <section id="summary" className="mb-14 scroll-mt-20">
      {/* MD3 Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-3 mb-6 border-b border-[#E1E2E6]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B2545] bg-[#D8E2FF] px-2.5 py-0.5 rounded-full">
              Section 03
            </span>
            <span className="text-[#74777F]">·</span>
            <span className="text-xs font-semibold text-[#44474E]">Readiness Verdict</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1A1C1E]">
            Ready-to-Register Summary
          </h2>
          <p className="text-xs sm:text-sm text-[#44474E] mt-0.5">
            Consolidated readiness verdict, rule breakdown, and actionable registration advice for your chosen course.
          </p>
        </div>
      </div>

      {/* Main Verdict Card (MD3 Elevated Card) */}
      <div className={`rounded-3xl p-6 sm:p-7 mb-8 transition-all ${verdictContainer} shadow-sm`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            {verdict === 'YES' && (
              <div className="w-12 h-12 rounded-2xl bg-[#D1F2D9] flex items-center justify-center shrink-0 shadow-2xs">
                <CheckCircle2 className="w-7 h-7 text-[#1B6E3E]" />
              </div>
            )}
            {verdict === 'MAYBE' && (
              <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] flex items-center justify-center shrink-0 shadow-2xs">
                <AlertTriangle className="w-7 h-7 text-[#B45309]" />
              </div>
            )}
            {verdict === 'NO' && (
              <div className="w-12 h-12 rounded-2xl bg-[#FFDAD6] flex items-center justify-center shrink-0 shadow-2xs">
                <AlertOctagon className="w-7 h-7 text-[#BA1A1A]" />
              </div>
            )}

            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className={`px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-2xs ${verdictBadgeBg}`}>
                  {verdict}
                </span>
                <span className="text-lg sm:text-xl font-bold text-[#1A1C1E]">
                  {verdictTitle}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#44474E] mt-1.5 max-w-2xl leading-relaxed">
                {verdictDescription}
              </p>
            </div>
          </div>

          {/* Quick Reviewed Target Course Pill */}
          <div className="bg-white p-4 rounded-2xl border border-[#C4C7C5]/40 shrink-0 lg:text-right shadow-2xs">
            <span className="block text-[11px] font-semibold text-[#44474E] uppercase tracking-wider">Course Reviewed</span>
            <span className="block font-mono text-base font-bold text-[#0B2545] mt-0.5">
              {selectedCourse.code}
            </span>
            <span className="block text-xs font-medium text-[#1A1C1E] truncate max-w-[220px]">
              {selectedCourse.title}
            </span>
            <span className="block text-[11px] text-[#44474E] mt-0.5">
              {selectedCourse.timeSlot}
            </span>
          </div>
        </div>
      </div>

      {/* 3 Pillars Breakdown Cards (MD3 Outlined Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Pillar 1: Prerequisite Check */}
        <div className="bg-white border border-[#C4C7C5]/50 rounded-3xl p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-[#E1E2E6]">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#EDEEF2] flex items-center justify-center text-[#1A1C1E]">
                <BookOpen className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-bold text-[#1A1C1E] uppercase tracking-wide">
                Prerequisites & Year
              </span>
            </div>
            {prereqPass ? (
              <span className="text-xs font-bold text-[#1B6E3E] bg-[#D1F2D9] px-2.5 py-0.5 rounded-full">
                Passed
              </span>
            ) : (
              <span className="text-xs font-bold text-[#BA1A1A] bg-[#FFDAD6] px-2.5 py-0.5 rounded-full">
                Unmet
              </span>
            )}
          </div>
          <div className="space-y-2 text-xs text-[#44474E]">
            <div className="flex justify-between">
              <span>Required Standing:</span>
              <span className="font-semibold text-[#1A1C1E]">Year {selectedCourse.yearLevel}+</span>
            </div>
            <div className="flex justify-between">
              <span>Your Standing:</span>
              <span className="font-semibold text-[#1A1C1E]">Year {profile.yearLevel}</span>
            </div>
            <div className="pt-2.5 border-t border-[#E1E2E6] text-[11px] leading-relaxed text-[#44474E]">
              {selectedCourse.prerequisitesNote}
            </div>
          </div>
        </div>

        {/* Pillar 2: Clash Warning Check */}
        <div className="bg-white border border-[#C4C7C5]/50 rounded-3xl p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-[#E1E2E6]">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#EDEEF2] flex items-center justify-center text-[#1A1C1E]">
                <Clock className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-bold text-[#1A1C1E] uppercase tracking-wide">
                Timetable Clash Check
              </span>
            </div>
            {clashResult.hasClash ? (
              <span className="text-xs font-bold text-[#BA1A1A] bg-[#FFDAD6] px-2.5 py-0.5 rounded-full">
                Clash Detected
              </span>
            ) : (
              <span className="text-xs font-bold text-[#1B6E3E] bg-[#D1F2D9] px-2.5 py-0.5 rounded-full">
                No Clash
              </span>
            )}
          </div>
          <div className="space-y-2 text-xs text-[#44474E]">
            <div className="flex justify-between">
              <span>Slot:</span>
              <span className="font-medium text-[#1A1C1E]">{selectedCourse.timeSlot}</span>
            </div>
            <div className="flex justify-between">
              <span>Comparing:</span>
              <span className="font-medium text-[#1A1C1E]">
                {compareCourse ? compareCourse.code : 'None (Solo test)'}
              </span>
            </div>
            <div className="pt-2.5 border-t border-[#E1E2E6] text-[11px] leading-relaxed">
              {clashResult.hasClash ? (
                <span className="text-[#BA1A1A] font-medium">
                  Direct overlap on {clashResult.overlapDetails} with {compareCourse?.code}.
                </span>
              ) : compareCourse ? (
                <span className="text-[#1B6E3E] font-medium">
                  Compatible timetable with {compareCourse.code} ({compareCourse.timeSlot}).
                </span>
              ) : (
                <span className="text-[#74777F]">
                  Select a second course above to test against potential timetable clashes.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Pillar 3: Demand & Pressure Check */}
        <div className="bg-white border border-[#C4C7C5]/50 rounded-3xl p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-[#E1E2E6]">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#EDEEF2] flex items-center justify-center text-[#1A1C1E]">
                <Flame className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-bold text-[#1A1C1E] uppercase tracking-wide">
                Demand Pressure
              </span>
            </div>
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                selectedCourse.pressure === 'High'
                  ? 'bg-[#FFDAD6] text-[#410002]'
                  : selectedCourse.pressure === 'Medium'
                  ? 'bg-[#FEF3C7] text-[#78350F]'
                  : 'bg-[#D1F2D9] text-[#04381C]'
              }`}
            >
              {selectedCourse.pressure} Demand
            </span>
          </div>
          <div className="space-y-2 text-xs text-[#44474E]">
            <div className="flex justify-between">
              <span>Intake Quota:</span>
              <span className="font-mono font-bold text-[#1A1C1E] tabular-nums">
                {selectedCourse.quotaSample} seats
              </span>
            </div>
            <div className="flex justify-between">
              <span>Est. Demand:</span>
              <span className="font-mono font-bold text-[#1A1C1E] tabular-nums">
                ~{selectedCourse.projectedEnrolledSample} students
              </span>
            </div>
            <div className="pt-2.5 border-t border-[#E1E2E6] text-[11px] leading-relaxed text-[#44474E]">
              {selectedCourse.pressureNote}
            </div>
          </div>
        </div>
      </div>

      {/* Warning Flags & Actionable Registration Advice (MD3 Outlined Card) */}
      <div className="bg-white border border-[#C4C7C5]/50 rounded-3xl p-5 sm:p-6 shadow-2xs">
        <h4 className="text-xs font-bold text-[#1A1C1E] uppercase tracking-wider mb-4">
          Registration Advice & Warning Flags
        </h4>

        {warningFlags.length > 0 ? (
          <div className="space-y-3 mb-5">
            {warningFlags.map((flag, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3.5 p-3.5 rounded-2xl text-xs ${
                  flag.type === 'danger'
                    ? 'bg-[#FFDAD6] border border-[#BA1A1A]/40 text-[#410002]'
                    : flag.type === 'warning'
                    ? 'bg-[#FEF3C7] border border-[#D97706]/40 text-[#78350F]'
                    : 'bg-[#D8E2FF] border border-[#0B2545]/20 text-[#001A41]'
                }`}
              >
                {flag.type === 'danger' ? (
                  <AlertOctagon className="w-4 h-4 text-[#BA1A1A] shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-bold text-xs">{flag.title}</div>
                  <div className="mt-0.5 leading-relaxed opacity-95">{flag.message}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-3.5 bg-[#D1F2D9] border border-[#1B6E3E]/30 rounded-2xl text-xs text-[#04381C] mb-5 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#1B6E3E] shrink-0" />
            <span className="font-medium">Zero warning flags detected. This elective looks completely safe to select on MAYA launch day.</span>
          </div>
        )}

        {/* UM Registration Action Checklist */}
        <div className="pt-4 border-t border-[#E1E2E6] text-xs text-[#44474E]">
          <span className="font-bold text-[#1A1C1E] block mb-2">
            Tips for UM MAYA Registration Window:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] leading-relaxed">
            <div className="p-3 rounded-2xl bg-[#F0F4F9] border border-[#C4C7C5]/30">
              <span className="font-semibold text-[#1A1C1E] block mb-0.5">1. Financial Clearances</span>
              Verify zero outstanding tuition fee arrears or library fines that lock your MAYA account.
            </div>
            <div className="p-3 rounded-2xl bg-[#F0F4F9] border border-[#C4C7C5]/30">
              <span className="font-semibold text-[#1A1C1E] block mb-0.5">2. Timetable Conflicts</span>
              If slots clash, check faculty notice boards for alternative tutorial groups or lab sessions.
            </div>
            <div className="p-3 rounded-2xl bg-[#F0F4F9] border border-[#C4C7C5]/30">
              <span className="font-semibold text-[#1A1C1E] block mb-0.5">3. 8:00 AM Window Opening</span>
              For high-demand modules, log in 5 minutes early and keep your secondary elective code copied.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

