export interface Course {
  id: string;
  code: string;
  title: string;
  faculty: string;
  yearLevel: number;
  credits: number;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  startTime: string; // "10:00"
  endTime: string;   // "12:00"
  timeSlot: string;  // "Wed 10:00 AM – 12:00 PM"
  location: string;
  prerequisiteCode: string | null;
  prerequisiteTitle: string | null;
  prerequisitesNote: string;
  pressure: 'Low' | 'Medium' | 'High';
  quotaSample: number;
  projectedEnrolledSample: number;
  pressureNote: string;
}

export interface StudentProfile {
  yearLevel: number;
  completedCourses: string[];
}

export const SAMPLE_COURSES: Course[] = [
  {
    id: 'wix2002',
    code: 'WIX2002',
    title: 'Project Management',
    faculty: 'Faculty of Computer Science & IT (FSKTM)',
    yearLevel: 2,
    credits: 3,
    day: 'Wednesday',
    startTime: '10:00',
    endTime: '12:00',
    timeSlot: 'Wed 10:00 AM – 12:00 PM',
    location: 'Dewan Kuliah 2 (DK2), FSKTM',
    prerequisiteCode: 'WIX1002',
    prerequisiteTitle: 'Fundamentals of Programming',
    prerequisitesNote: 'Requires completion of Year 1 and pass in WIX1002 (Fundamentals of Programming).',
    pressure: 'High',
    quotaSample: 45,
    projectedEnrolledSample: 58,
    pressureNote: 'Core faculty elective. Fills in first 15 mins of MAYA portal opening.',
  },
  {
    id: 'wia2004',
    code: 'WIA2004',
    title: 'Operating Systems',
    faculty: 'Faculty of Computer Science & IT (FSKTM)',
    yearLevel: 2,
    credits: 4,
    day: 'Wednesday',
    startTime: '11:00',
    endTime: '13:00',
    timeSlot: 'Wed 11:00 AM – 1:00 PM',
    location: 'Makmal Perisian 1, Block A',
    prerequisiteCode: 'WIX1001',
    prerequisiteTitle: 'Computing Mathematics',
    prerequisitesNote: 'Prerequisite: Pass in WIX1001 (Computing Mathematics). Minimum Year 2 standing.',
    pressure: 'Medium',
    quotaSample: 50,
    projectedEnrolledSample: 44,
    pressureNote: 'Steady demand across software engineering batches; moderate capacity.',
  },
  {
    id: 'cix2001',
    code: 'CIX2001',
    title: 'Malaysian Literature & Cultural Narratives',
    faculty: 'Faculty of Arts & Social Sciences (FASS)',
    yearLevel: 1,
    credits: 2,
    day: 'Thursday',
    startTime: '14:00',
    endTime: '16:00',
    timeSlot: 'Thu 2:00 PM – 4:00 PM',
    location: "Auditorium Za'ba, FASS",
    prerequisiteCode: null,
    prerequisiteTitle: null,
    prerequisitesNote: 'No prerequisites. Open as University elective cluster for all faculties.',
    pressure: 'Low',
    quotaSample: 60,
    projectedEnrolledSample: 28,
    pressureNote: 'Large lecture auditorium capacity; slots remain open throughout add/drop.',
  },
  {
    id: 'eix2003',
    code: 'EIX2003',
    title: 'Digital Economy & Malaysian Markets',
    faculty: 'Faculty of Business & Economics (FBE)',
    yearLevel: 2,
    credits: 3,
    day: 'Monday',
    startTime: '09:00',
    endTime: '11:00',
    timeSlot: 'Mon 9:00 AM – 11:00 AM',
    location: 'Dewan Kuliah 4 (DK4), FBE',
    prerequisiteCode: null,
    prerequisiteTitle: null,
    prerequisitesNote: 'No strict prerequisite. Year 2 standing recommended for economics concepts.',
    pressure: 'Medium',
    quotaSample: 40,
    projectedEnrolledSample: 38,
    pressureNote: 'Popular broadening elective for non-business majors; fills gradually.',
  },
  {
    id: 'wix3001',
    code: 'WIX3001',
    title: 'Soft Computing & Neural Networks',
    faculty: 'Faculty of Computer Science & IT (FSKTM)',
    yearLevel: 3,
    credits: 3,
    day: 'Monday',
    startTime: '10:00',
    endTime: '12:00',
    timeSlot: 'Mon 10:00 AM – 12:00 PM',
    location: 'Makmal AI, Level 3, FSKTM',
    prerequisiteCode: 'WIA2004',
    prerequisiteTitle: 'Operating Systems',
    prerequisitesNote: 'Strict Year 3 requirement and prior completion of WIA2004.',
    pressure: 'High',
    quotaSample: 35,
    projectedEnrolledSample: 52,
    pressureNote: 'High interest in AI track; strict workstation limit in specialized lab.',
  },
];

// Helper to test if two courses have overlapping time slots
export function checkTimeClash(c1: Course, c2: Course): { hasClash: boolean; overlapDetails?: string } {
  if (c1.id === c2.id) return { hasClash: false };
  if (c1.day !== c2.day) return { hasClash: false };

  // Parse time "HH:MM" to minutes from midnight
  const toMinutes = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  const start1 = toMinutes(c1.startTime);
  const end1 = toMinutes(c1.endTime);
  const start2 = toMinutes(c2.startTime);
  const end2 = toMinutes(c2.endTime);

  // Overlap condition: max(start1, start2) < min(end1, end2)
  const overlapStart = Math.max(start1, start2);
  const overlapEnd = Math.min(end1, end2);

  if (overlapStart < overlapEnd) {
    const formatMin = (min: number) => {
      const h = Math.floor(min / 60);
      const m = min % 60;
      const period = h >= 12 ? 'PM' : 'AM';
      const dispH = h > 12 ? h - 12 : h === 0 ? 12 : h;
      return `${dispH}:${m.toString().padStart(2, '0')} ${period}`;
    };

    return {
      hasClash: true,
      overlapDetails: `${c1.day} (${formatMin(overlapStart)} – ${formatMin(overlapEnd)})`,
    };
  }

  return { hasClash: false };
}
