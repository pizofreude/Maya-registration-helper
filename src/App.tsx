/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SAMPLE_COURSES, Course, StudentProfile } from './data/courses';
import { Header } from './components/Header';
import { StudentProfileBar } from './components/StudentProfileBar';
import { CourseCheckerSection } from './components/CourseCheckerSection';
import { RiskBoardSection } from './components/RiskBoardSection';
import { ReadinessSummarySection } from './components/ReadinessSummarySection';
import { WeeklySchedulePreview } from './components/WeeklySchedulePreview';
import { Info, HelpCircle } from 'lucide-react';

export default function App() {
  // Initial courses state (never blank)
  const [courses] = useState<Course[]>(SAMPLE_COURSES);

  // Default selected course: WIX2002 (Project Management)
  const [selectedCourse, setSelectedCourse] = useState<Course>(SAMPLE_COURSES[0]);

  // Default compare course for clash testing: WIA2004 (Operating Systems - which clashes on Wed 11-12)
  const [compareCourse, setCompareCourse] = useState<Course | null>(SAMPLE_COURSES[1]);

  // Default student profile: Year 2 student who completed WIX1001 & WIX1002
  const [profile, setProfile] = useState<StudentProfile>({
    yearLevel: 2,
    completedCourses: ['WIX1001', 'WIX1002'],
  });

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    // If the selected course is the same as the compare course, reset the compare course
    if (compareCourse && compareCourse.id === course.id) {
      setCompareCourse(null);
    }
  };

  const handleSelectCompareCourse = (courseId: string | null) => {
    if (!courseId) {
      setCompareCourse(null);
      return;
    }
    const found = courses.find((c) => c.id === courseId);
    if (found) {
      setCompareCourse(found);
    }
  };

  const handleUpdateYear = (year: number) => {
    setProfile((prev) => ({ ...prev, yearLevel: year }));
  };

  const handleToggleCompletedCourse = (code: string) => {
    setProfile((prev) => {
      const exists = prev.completedCourses.includes(code);
      return {
        ...prev,
        completedCourses: exists
          ? prev.completedCourses.filter((c) => c !== code)
          : [...prev.completedCourses, code],
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
      {/* Top Navigation */}
      <Header />

      {/* Main Container - Single Page, Stacked Sections */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Intro Subtitle / Context */}
        <div className="mb-7">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#001A41] bg-[#D8E2FF] px-3 py-1 rounded-full border border-[#0B2545]/15">
              Universiti Malaya · Academic Elective Advisor
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1A1C1E]">
            MAYA Elective Course Registration Helper
          </h2>
          <p className="text-xs sm:text-sm text-[#44474E] mt-1.5 max-w-3xl leading-relaxed">
            Quickly judge whether you are ready to register for elective courses in MAYA. Inspect sample UM course prerequisites, simulate timetable clashes between slots, and evaluate class demand pressure before enrollment opens.
          </p>
        </div>

        {/* Student Profile Standing Bar */}
        <StudentProfileBar
          profile={profile}
          onUpdateYear={handleUpdateYear}
          onToggleCompletedCourse={handleToggleCompletedCourse}
        />

        {/* Timetable schedule visual strip */}
        <WeeklySchedulePreview
          selectedCourse={selectedCourse}
          compareCourse={compareCourse}
        />

        {/* SECTION 1: Course Checker */}
        <CourseCheckerSection
          courses={courses}
          selectedCourse={selectedCourse}
          compareCourse={compareCourse}
          onSelectCourse={handleSelectCourse}
          onSelectCompareCourse={handleSelectCompareCourse}
          profile={profile}
        />

        {/* SECTION 2: Registration Risk Board */}
        <RiskBoardSection
          courses={courses}
          selectedCourse={selectedCourse}
          onSelectCourse={handleSelectCourse}
        />

        {/* SECTION 3: Ready-to-Register Summary */}
        <ReadinessSummarySection
          selectedCourse={selectedCourse}
          compareCourse={compareCourse}
          profile={profile}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-[#C4C7C5]/40 bg-white py-6 text-center text-xs text-[#44474E]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div>
            <span className="font-bold text-[#1A1C1E]">MAYA Registration Helper</span> · Universiti Malaya Student Helper Tool
          </div>
          <div className="text-[#44474E]">
            Simulated sample registration data · Everything runs locally in-browser
          </div>
        </div>
      </footer>
    </div>
  );
}
