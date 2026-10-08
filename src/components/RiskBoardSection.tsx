import React from 'react';
import { Course } from '../data/courses';
import { TrendingUp, ShieldCheck, Flame, Info } from 'lucide-react';

interface RiskBoardSectionProps {
  courses: Course[];
  selectedCourse: Course;
  onSelectCourse: (course: Course) => void;
}

export const RiskBoardSection: React.FC<RiskBoardSectionProps> = ({
  courses,
  selectedCourse,
  onSelectCourse,
}) => {
  const getPressureConfig = (pressure: 'Low' | 'Medium' | 'High') => {
    switch (pressure) {
      case 'High':
        return {
          label: 'High Demand',
          chipStyle: 'bg-[#FFDAD6] text-[#410002] border border-[#BA1A1A]/30',
          dotColor: 'bg-[#BA1A1A]',
          barColor: 'bg-[#BA1A1A]',
          advice: 'Crowded class. Quota exhausts rapidly in the first 15–30 minutes of MAYA opening. Maintain a secondary elective backup code.',
          icon: Flame,
        };
      case 'Medium':
        return {
          label: 'Medium Demand',
          chipStyle: 'bg-[#FEF3C7] text-[#78350F] border border-[#D97706]/30',
          dotColor: 'bg-[#D97706]',
          barColor: 'bg-[#D97706]',
          advice: 'Moderate competition. Quota fills progressively over 48 hours. Good probability of enrollment.',
          icon: TrendingUp,
        };
      case 'Low':
        return {
          label: 'Low Demand',
          chipStyle: 'bg-[#D1F2D9] text-[#04381C] border border-[#1B6E3E]/30',
          dotColor: 'bg-[#1B6E3E]',
          barColor: 'bg-[#1B6E3E]',
          advice: 'High capacity auditorium with vacancies usually open throughout add/drop period.',
          icon: ShieldCheck,
        };
    }
  };

  const selectedConfig = getPressureConfig(selectedCourse.pressure);
  const SelectedIcon = selectedConfig.icon;

  return (
    <section id="risk-board" className="mb-12 scroll-mt-20">
      {/* MD3 Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-3 mb-6 border-b border-[#E1E2E6]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B2545] bg-[#D8E2FF] px-2.5 py-0.5 rounded-full">
              Section 02
            </span>
            <span className="text-[#74777F]">·</span>
            <span className="text-xs font-semibold text-[#44474E]">Quota & Demand Board</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1A1C1E]">
            Registration Risk Board
          </h2>
          <p className="text-xs sm:text-sm text-[#44474E] mt-0.5">
            Identify which classes look crowded or easier to get into based on sample intake capacity and historical demand.
          </p>
        </div>

        {/* MD3 Assist Chip */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EDEEF2] text-[#44474E] text-xs font-medium border border-[#C4C7C5]/30">
          <Info className="w-3.5 h-3.5 text-[#74777F]" />
          <span>Sample simulation metrics</span>
        </div>
      </div>

      {/* Selected Course Spotlight Card (MD3 Elevated Card) */}
      <div className="bg-white border-2 border-[#0B2545] rounded-3xl p-5 sm:p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-5 border-b border-[#E1E2E6]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#44474E] mb-1">
              <span>Active Course Demand Analysis</span>
              <span>·</span>
              <span className="font-mono font-semibold text-[#1A1C1E]">{selectedCourse.code}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#1A1C1E]">
              {selectedCourse.title}
            </h3>
            <p className="text-xs text-[#44474E] mt-1 leading-relaxed max-w-xl">
              {selectedCourse.pressureNote}
            </p>
          </div>

          {/* MD3 Pressure Badge for Selected Course */}
          <div className="flex items-center gap-4 shrink-0">
            <div className={`flex items-center gap-2 px-3.5 py-2 rounded-full font-bold text-xs ${selectedConfig.chipStyle}`}>
              <SelectedIcon className="w-4 h-4" />
              <span>{selectedConfig.label}</span>
            </div>
            <div className="text-right">
              <span className="block font-mono text-base font-bold text-[#1A1C1E] tabular-nums">
                {selectedCourse.projectedEnrolledSample} / {selectedCourse.quotaSample} Seats
              </span>
              <span className="block text-[11px] text-[#44474E]">Est. Demand vs Quota</span>
            </div>
          </div>
        </div>

        {/* MD3 Linear Progress Indicator */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#44474E]">
            <span className="font-bold text-[#1A1C1E]">Strategy:</span>
            <span>{selectedConfig.advice}</span>
          </div>
          <div className="w-full sm:w-56 bg-[#EDEEF2] h-2.5 rounded-full overflow-hidden shrink-0">
            <div
              className={`h-full rounded-full transition-all duration-300 ${selectedConfig.barColor}`}
              style={{
                width: `${Math.min(100, (selectedCourse.projectedEnrolledSample / selectedCourse.quotaSample) * 100)}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* MD3 Comparative Electives List */}
      <div className="bg-white border border-[#C4C7C5]/50 rounded-3xl overflow-hidden shadow-2xs">
        <div className="p-4 sm:px-6 bg-[#F0F4F9] border-b border-[#E1E2E6] flex items-center justify-between">
          <span className="text-xs font-bold text-[#1A1C1E] uppercase tracking-wider">
            Comparative Electives List
          </span>
          <span className="text-xs text-[#44474E]">
            Select any course to view full readiness
          </span>
        </div>

        <div className="divide-y divide-[#E1E2E6]">
          {courses.map((course) => {
            const isSelected = course.id === selectedCourse.id;
            const config = getPressureConfig(course.pressure);
            const Icon = config.icon;
            const ratioPercent = Math.min(100, Math.round((course.projectedEnrolledSample / course.quotaSample) * 100));

            return (
              <div
                key={course.id}
                onClick={() => onSelectCourse(course)}
                className={`p-4 sm:px-6 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isSelected ? 'bg-[#E8EEF7] border-l-4 border-l-[#0B2545]' : 'hover:bg-[#F8F9FA]'
                }`}
              >
                {/* Course identity */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-[#1A1C1E]">
                      {course.code}
                    </span>
                    <span className="text-[#C4C7C5]">·</span>
                    <span className="text-xs text-[#44474E]">{course.faculty}</span>
                    {isSelected && (
                      <span className="text-[10px] font-bold bg-[#0B2545] text-white px-2 py-0.5 rounded-full">
                        Selected
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-[#1A1C1E] truncate">
                    {course.title}
                  </h4>
                  <p className="text-xs text-[#44474E] mt-0.5">
                    {course.pressureNote}
                  </p>
                </div>

                {/* Demand & Pressure Stats */}
                <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                  {/* Quota Bar */}
                  <div className="text-right w-28 sm:w-32">
                    <div className="font-mono text-xs font-bold text-[#1A1C1E] tabular-nums">
                      {course.projectedEnrolledSample} / {course.quotaSample}
                    </div>
                    <div className="text-[10px] text-[#44474E]">
                      {ratioPercent}% Quota Filled
                    </div>
                    <div className="w-full bg-[#EDEEF2] h-2 rounded-full overflow-hidden mt-1.5">
                      <div
                        className={`h-full rounded-full ${config.barColor}`}
                        style={{ width: `${ratioPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Pressure Chip */}
                  <div className="w-36 flex justify-end">
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${config.chipStyle}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{course.pressure} Demand</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

