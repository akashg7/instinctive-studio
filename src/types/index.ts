export interface Student {
  id: string;
  name: string;
  cohort: string;
  courses: Course[];
  dateJoined: string;
  lastLogin: string;
  status: 'active' | 'inactive';
}

export interface Course {
  id: string;
  name: string;
  icon: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}