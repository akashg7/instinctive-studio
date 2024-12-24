import { Badge } from '@/components/ui/badge';
import { Course } from '@/types';

interface StudentCoursesProps {
  courses: Course[];
}

export function StudentCourses({ courses = [] }: StudentCoursesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {courses.map((course) => (
        <Badge key={course.id} variant="secondary">
          {course.name}
        </Badge>
      ))}
    </div>
  );
}