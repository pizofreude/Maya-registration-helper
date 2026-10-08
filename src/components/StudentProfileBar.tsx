import React from 'react';
import { UserCheck, Check } from 'lucide-react';
import { StudentProfile } from '../data/courses';

interface StudentProfileBarProps {
  profile: StudentProfile;
  onUpdateYear: (year: number) => void;
  onToggleCompletedCourse: (code: string) => void;
}

const AVAILABLE_PREREQ_OPTIONS = [
  { code: 'WIX1001', title: 'Computing Mathematics' },
  { code: 'WIX1002', title: 'Fundamentals of Programming' },
  { code: 'WIA2004', title: 'Operating Systems' },
];

export const StudentProfileBar: React.FC<StudentProfileBarProps> = ({
  profile,
  onUpdateYear,
  onToggleCompletedCourse,
}) => {
  return (
    <div className="bg-[#F0F4F9] border border-[#C4C7C5]/40 rounded-3xl p-5 sm:p-6 mb-8 transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-7 h-7 rounded-full bg-[#D8E2FF] flex items-center justify-center text-[#001A41]">
              <UserCheck className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold tracking-wide uppercase text-[#44474E]">
              Student Standing & Passed Subjects
            </span>
          </div>
          <p className="text-xs text-[#44474E] max-w-xl leading-relaxed">
            Configure your simulated academic standing. Prerequisite rules and readiness indicators update immediately.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 sm:gap-7">
          {/* MD3 Connected Segmented Button for Year Standing */}
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-semibold text-[#1A1C1E]">Year:</span>
            <div className="inline-flex rounded-full bg-[#E1E6EB] p-1 border border-[#C4C7C5]/40 shadow-2xs">
              {[1, 2, 3, 4].map((year) => {
                const isSelected = profile.yearLevel === year;
                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() => onUpdateYear(year)}
                    className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#0B2545] text-white shadow-xs'
                        : 'text-[#44474E] hover:text-[#1A1C1E] hover:bg-black/5'
                    }`}
                  >
                    Year {year}
                  </button>
                );
              })}
            </div>
          </div>

          {/* MD3 Filter Chips for Passed Modules */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-xs font-semibold text-[#1A1C1E]">Passed:</span>
            <div className="flex items-center gap-2 flex-wrap">
              {AVAILABLE_PREREQ_OPTIONS.map((item) => {
                const isPassed = profile.completedCourses.includes(item.code);
                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => onToggleCompletedCourse(item.code)}
                    className={`h-8 inline-flex items-center gap-1.5 px-3 rounded-lg border text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                      isPassed
                        ? 'bg-[#D8E2FF] border-[#0B2545]/20 text-[#001A41] shadow-2xs'
                        : 'bg-white border-[#C4C7C5]/60 text-[#44474E] hover:bg-[#F8F9FA] hover:border-[#74777F]'
                    }`}
                    title={item.title}
                  >
                    {isPassed ? (
                      <Check className="w-3.5 h-3.5 stroke-[2.5] text-[#001A41]" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-[#74777F]/40" />
                    )}
                    <span className="font-mono text-[11px] font-semibold">{item.code}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

