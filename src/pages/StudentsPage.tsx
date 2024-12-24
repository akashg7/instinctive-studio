import { PageHeader } from '@/components/common/PageHeader';
import { StudentsTable } from '@/components/students/StudentsTable';
import { AddStudentDialog } from '@/components/students/AddStudentDialog';

export function StudentsPage() {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <PageHeader 
          title="Students" 
          description="Manage your students and their course enrollments" 
        />
        <AddStudentDialog />
      </div>
      <div className="overflow-auto">
        <StudentsTable />
      </div>
    </>
  );
}