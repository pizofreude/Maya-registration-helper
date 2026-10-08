import React from 'react';
import { Course, checkTimeClash } from '../data/courses';
import { Calendar, AlertOctagon } from 'lucide-react';

interface WeeklySchedulePreviewProps {
  selectedCourse: Course;
  compareCourse: Course | null;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;

export const WeeklySchedulePreview: React.FC<WeeklySchedulePreviewProps> = ({
  selectedCourse,
  compareCourse,
}) => {
  const clashResult = compareCourse
    ? checkTimeClash(selectedCourse, compareCourse)
    : { hasClash: false };

  return (
    <div className="bg-white border border-[#C4C7C5]/50 rounded-3xl p-5 sm:p-6 mb-8 shadow-2xs">
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#E1E2E6]">
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-full bg-[#D8E2FF] flex items-center justify-center text-[#001A41]">
            <Calendar className="w-4 h-4" />
          </span>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1C1E]">
            Weekly Timetable Simulation (Mon – Fri)
          </h3>
        </div>

        {clashResult.hasClash && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFDAD6] text-[#410002] border border-[#BA1A1A]/30 text-xs font-semibold">
            <AlertOctagon className="w-3.5 h-3.5 text-[#BA1A1A]" />
            <span>Time Overlap Detected</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
        {DAYS.map((day) => {
          const isSelectedDay = selectedCourse.day === day;
          const isCompareDay = compareCourse?.day === day;
          const dayHasClash = isSelectedDay && isCompareDay && clashResult.hasClash;

          return (
            <div
              key={day}
              className={`rounded-2xl p-3 min-h-[96px] flex flex-col justify-between transition-all ${
                dayHasClash
                  ? 'bg-[#FFDAD6]/60 border border-[#BA1A1A]/40'
                  : isSelectedDay || isCompareDay
                  ? 'bg-[#EDEEF2] border border-[#C4C7C5]/40'
                  : 'bg-[#F8F9FA] border border-[#E1E2E6]/60'
              }`}
            >
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#C4C7C5]/30">
                <span className="font-semibold text-[#1A1C1E] text-xs">{day}</span>
                {dayHasClash && (
                  <span className="text-[10px] font-bold text-[#BA1A1A] bg-[#FFDAD6] px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                    Clash
                  </span>
                )}
              </div>

              <div className="space-y-1.5 flex-1 flex flex-col justify-center">
                {isSelectedDay && (
                  <div
                    className={`p-2 rounded-xl text-xs leading-tight transition-transform ${
                      dayHasClash
                        ? 'bg-[#FFDAD6] text-[#410002] border border-[#BA1A1A]/40 font-semibold shadow-2xs'
                        : 'bg-[#0B2545] text-white font-medium shadow-xs'
                    }`}
                  >
                    <div className="font-mono font-bold">{selectedCourse.code}</div>
                    <div className="text-[10px] opacity-90">{selectedCourse.startTime}–{selectedCourse.endTime}</div>
                  </div>
                )}

                {isCompareDay && compareCourse && (
                  <div
                    className={`p-2 rounded-xl text-xs leading-tight transition-transform ${
                      dayHasClash
                        ? 'bg-[#FFDAD6] text-[#410002] border border-[#BA1A1A]/40 font-semibold shadow-2xs'
                        : 'bg-[#D8E2FF] text-[#001A41] border border-[#0B2545]/20 font-medium'
                    }`}
                  >
                    <div className="font-mono font-bold">{compareCourse.code}</div>
                    <div className="text-[10px] opacity-80">{compareCourse.startTime}–{compareCourse.endTime}</div>
                  </div>
                )}

                {!isSelectedDay && !isCompareDay && (
                  <div className="text-[#74777F] text-[11px] text-center italic py-2">
                    Free
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

