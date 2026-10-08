import React from 'react';
import { Course, StudentProfile, checkTimeClash } from '../data/courses';
import { CheckCircle2, AlertOctagon, XCircle, Clock, MapPin, ChevronDown } from 'lucide-react';

interface CourseCheckerSectionProps {
  courses: Course[];
  selectedCourse: Course;
  compareCourse: Course | null;
  onSelectCourse: (course: Course) => void;
  onSelectCompareCourse: (courseId: string | null) => void;
  profile: StudentProfile;
}

export const CourseCheckerSection: React.FC<CourseCheckerSectionProps> = ({
  courses,
  selectedCourse,
  compareCourse,
  onSelectCourse,
  onSelectCompareCourse,
  profile,
}) => {
  // Check eligibility for a course
  const getEligibilityStatus = (course: Course) => {
    const yearMet = profile.yearLevel >= course.yearLevel;
    const prereqMet = !course.prerequisiteCode || profile.completedCourses.includes(course.prerequisiteCode);

    if (yearMet && prereqMet) {
      return {
        status: 'eligible',
        badgeText: 'Eligible',
        note: 'You satisfy the academic year level and all required course prerequisites for this module.',
      };
    } else if (!yearMet && !prereqMet) {
      return {
        status: 'ineligible',
        badgeText: 'Prerequisite & Year Unmet',
        note: `Requires Year ${course.yearLevel} standing (you are Year ${profile.yearLevel}) and passed ${course.prerequisiteCode}.`,
      };
    } else if (!yearMet) {
      return {
        status: 'ineligible',
        badgeText: 'Year Requirement Unmet',
        note: `Restricted to Year ${course.yearLevel} or higher (current standing: Year ${profile.yearLevel}).`,
      };
    } else {
      return {
        status: 'ineligible',
        badgeText: 'Prerequisite Missing',
        note: `Missing required prerequisite ${course.prerequisiteCode} (${course.prerequisiteTitle}).`,
      };
    }
  };

  const selectedEligibility = getEligibilityStatus(selectedCourse);
  const clashResult = compareCourse ? checkTimeClash(selectedCourse, compareCourse) : { hasClash: false };

  return (
    <section id="checker" className="mb-12 scroll-mt-20">
      {/* MD3 Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-3 mb-6 border-b border-[#E1E2E6]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B2545] bg-[#D8E2FF] px-2.5 py-0.5 rounded-full">
              Section 01
            </span>
            <span className="text-[#74777F]">·</span>
            <span className="text-xs font-semibold text-[#44474E]">Inspection & Rules</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1A1C1E]">
            Course Checker
          </h2>
          <p className="text-xs sm:text-sm text-[#44474E] mt-0.5">
            Inspect sample University of Malaya electives, check prerequisites, and select courses to evaluate registration eligibility.
          </p>
        </div>

        {/* MD3 Outlined Menu for Clash Comparator */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <label htmlFor="compare-select" className="text-xs font-medium text-[#44474E] whitespace-nowrap">
            Compare clash with:
          </label>
          <div className="relative">
            <select
              id="compare-select"
              value={compareCourse ? compareCourse.id : ''}
              onChange={(e) => onSelectCompareCourse(e.target.value || null)}
              className="text-xs font-medium bg-white border border-[#74777F]/40 rounded-full px-3.5 py-2 pr-8 text-[#1A1C1E] focus:outline-none focus:ring-2 focus:ring-[#0B2545] appearance-none cursor-pointer shadow-2xs"
            >
              <option value="">-- None (Solo check) --</option>
              {courses
                .filter((c) => c.id !== selectedCourse.id)
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code} · {c.title} ({c.timeSlot})
                  </option>
                ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#74777F] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Active Selection Hero Card (MD3 Filled Card) */}
      <div className="bg-[#F0F4F9] border border-[#C4C7C5]/40 rounded-3xl p-5 sm:p-6 mb-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#44474E] mb-1">
              <span>Inspecting Elective</span>
              <span>·</span>
              <span className="font-semibold text-[#1A1C1E]">{selectedCourse.faculty}</span>
            </div>
            <div className="flex items-baseline gap-2.5 flex-wrap">
              <span className="font-mono text-xl font-extrabold text-[#0B2545]">
                {selectedCourse.code}
              </span>
              <h3 className="text-lg font-bold text-[#1A1C1E]">
                {selectedCourse.title}
              </h3>
              <span className="text-xs text-[#44474E] font-medium bg-[#E1E6EB] px-2 py-0.5 rounded-md">
                {selectedCourse.credits} Credits
              </span>
            </div>
          </div>

          {/* MD3 Eligibility Status Container */}
          <div
            className={`flex items-start gap-3 p-4 rounded-2xl border shrink-0 transition-all ${
              selectedEligibility.status === 'eligible'
                ? 'bg-[#D1F2D9] border-[#1B6E3E]/30 text-[#04381C]'
                : 'bg-[#FFDAD6] border-[#BA1A1A]/30 text-[#410002]'
            }`}
          >
            {selectedEligibility.status === 'eligible' ? (
              <CheckCircle2 className="w-5 h-5 text-[#1B6E3E] shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-[#BA1A1A] shrink-0 mt-0.5" />
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wide">
                  Eligibility Note:
                </span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    selectedEligibility.status === 'eligible'
                      ? 'bg-[#1B6E3E] text-white'
                      : 'bg-[#BA1A1A] text-white'
                  }`}
                >
                  {selectedEligibility.badgeText}
                </span>
              </div>
              <p className="text-xs mt-1 max-w-sm leading-relaxed opacity-95">
                {selectedEligibility.note}
              </p>
            </div>
          </div>
        </div>

        {/* MD3 Clash Alert Banner (Feature 2) */}
        {compareCourse && (
          <div className="mt-5 pt-4 border-t border-[#C4C7C5]/30">
            {clashResult.hasClash ? (
              <div className="flex items-start gap-3.5 p-4 bg-[#FFDAD6] border border-[#BA1A1A]/40 rounded-2xl text-[#410002]">
                <AlertOctagon className="w-5 h-5 text-[#BA1A1A] shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Timetable Clash Warning Detected
                    </span>
                    <span className="text-xs font-mono font-bold bg-[#410002] text-[#FFDAD6] px-2 py-0.5 rounded-md">
                      Conflict: {clashResult.overlapDetails}
                    </span>
                  </div>
                  <p className="text-xs mt-1 leading-relaxed opacity-95">
                    <strong>{selectedCourse.code}</strong> ({selectedCourse.timeSlot}) directly overlaps with{' '}
                    <strong>{compareCourse.code}</strong> ({compareCourse.timeSlot}). MAYA will flag this timetable collision and deny simultaneous registration.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-[#D1F2D9] border border-[#1B6E3E]/30 rounded-2xl text-[#04381C]">
                <CheckCircle2 className="w-4 h-4 text-[#1B6E3E] shrink-0" />
                <p className="text-xs">
                  <strong>No Clash:</strong> <strong>{selectedCourse.code}</strong> ({selectedCourse.timeSlot}) and{' '}
                  <strong>{compareCourse.code}</strong> ({compareCourse.timeSlot}) have mutually compatible schedules.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MD3 Data Table Card */}
      <div className="bg-white border border-[#C4C7C5]/50 rounded-3xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F0F4F9] border-b border-[#E1E2E6] text-[#44474E] font-semibold text-[11px] uppercase tracking-wider">
                <th className="py-3.5 px-5">Course Code & Title</th>
                <th className="py-3.5 px-4">Faculty</th>
                <th className="py-3.5 px-4">Level</th>
                <th className="py-3.5 px-4">Prerequisites Note</th>
                <th className="py-3.5 px-4">Time Slot & Venue</th>
                <th className="py-3.5 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1E2E6]">
              {courses.map((course) => {
                const isSelected = course.id === selectedCourse.id;
                const isCompared = compareCourse?.id === course.id;
                const eligibility = getEligibilityStatus(course);

                return (
                  <tr
                    key={course.id}
                    className={`transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#E8EEF7]'
                        : isCompared
                        ? 'bg-[#FEF3C7]/40'
                        : 'hover:bg-[#F8F9FA]'
                    }`}
                    onClick={() => onSelectCourse(course)}
                  >
                    <td className="py-4 px-5 align-top">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono font-bold text-[#1A1C1E] text-xs">
                          {course.code}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] bg-[#0B2545] text-white px-2 py-0.5 rounded-full font-semibold">
                            Active
                          </span>
                        )}
                        {isCompared && (
                          <span className="text-[10px] bg-[#D97706] text-white px-2 py-0.5 rounded-full font-semibold">
                            Comparison
                          </span>
                        )}
                      </div>
                      <div className="font-semibold text-[#1A1C1E] text-xs mt-1">
                        {course.title}
                      </div>
                      <div className="text-[11px] text-[#44474E] mt-0.5">
                        {course.credits} credit hours
                      </div>
                    </td>

                    <td className="py-4 px-4 align-top text-[#44474E] max-w-[170px] leading-relaxed">
                      {course.faculty}
                    </td>

                    <td className="py-4 px-4 align-top">
                      <span className="inline-block px-2.5 py-1 rounded-full bg-[#E1E6EB] font-medium text-[#1A1C1E] text-[11px]">
                        Year {course.yearLevel}+
                      </span>
                    </td>

                    <td className="py-4 px-4 align-top max-w-[240px]">
                      <div className="text-[#1A1C1E] leading-relaxed">
                        {course.prerequisitesNote}
                      </div>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            eligibility.status === 'eligible' ? 'bg-[#1B6E3E]' : 'bg-[#BA1A1A]'
                          }`}
                        />
                        <span
                          className={`text-[11px] font-semibold ${
                            eligibility.status === 'eligible' ? 'text-[#1B6E3E]' : 'text-[#BA1A1A]'
                          }`}
                        >
                          {eligibility.badgeText}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4 align-top whitespace-nowrap">
                      <div className="flex items-center gap-1.5 font-medium text-[#1A1C1E]">
                        <Clock className="w-3.5 h-3.5 text-[#74777F]" />
                        <span>{course.timeSlot}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#44474E] text-[11px] mt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#74777F]" />
                        <span className="truncate max-w-[160px]">{course.location}</span>
                      </div>
                    </td>

                    <td className="py-4 px-5 align-top text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectCourse(course);
                          }}
                          className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
                            isSelected
                              ? 'bg-[#0B2545] text-white shadow-xs'
                              : 'bg-[#EDEEF2] text-[#1A1C1E] hover:bg-[#E1E6EB]'
                          }`}
                        >
                          {isSelected ? 'Inspecting' : 'Pick Course'}
                        </button>
                        <button
                          type="button"
                          title="Set as second course to check for timetable clashes"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectCompareCourse(isCompared ? null : course.id);
                          }}
                          className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                            isCompared
                              ? 'bg-[#FEF3C7] border-[#D97706]/40 text-[#78350F]'
                              : 'border-[#74777F]/30 text-[#44474E] hover:bg-[#F8F9FA]'
                          }`}
                        >
                          {isCompared ? 'Remove Clash' : 'Test Clash'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

