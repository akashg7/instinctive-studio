import { Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StudentActionsProps {
  onDelete: () => void;
  onEdit: () => void;
}

export function StudentActions({ onDelete, onEdit }: StudentActionsProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
        className="text-red-500 hover:text-red-700"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onEdit}
        className="text-blue-500 hover:text-blue-700"
      >
        <Edit className="h-4 w-4" />
      </Button>
    </div>
  );
}