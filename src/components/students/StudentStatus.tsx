import { Badge } from '@/components/ui/badge';

interface StudentStatusProps {
  status: 'active' | 'inactive';
}

export function StudentStatus({ status }: StudentStatusProps) {
  return (
    <Badge variant={status === 'active' ? 'success' : 'destructive'}>
      {status}
    </Badge>
  );
}