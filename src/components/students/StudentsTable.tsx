import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchStudents, deleteStudent } from '@/store/features/studentsSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function StudentsTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: students, status } = useSelector((state: RootState) => state.students);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchStudents());
    }
  }, [status, dispatch]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      await dispatch(deleteStudent(id));
    }
  };

  if (status === 'loading') {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center py-4 text-red-500">Failed to load students</div>;
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Cohort</TableHead>
              <TableHead className="hidden md:table-cell">Courses</TableHead>
              <TableHead className="hidden lg:table-cell">Date Joined</TableHead>
              <TableHead className="hidden lg:table-cell">Last Login</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.cohort}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-wrap gap-2">
                    {student.courses?.map((course) => (
                      <Badge key={course.id} variant="secondary">
                        {course.name}
                      </Badge>
                    )) || []}
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {new Date(student.dateJoined).toLocaleDateString()}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {new Date(student.lastLogin).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={student.status === 'active' ? 'success' : 'destructive'}
                  >
                    {student.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(student.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}