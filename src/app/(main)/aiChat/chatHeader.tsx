import { Button } from '@/components/ui/button';
import { RotateCcwIcon } from 'lucide-react';
interface ChatHeaderProps {
  onReset: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onReset }) => {
  return (
    <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-3">
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-green-500" />
        <span className="font-medium text-sm">AI Assistant</span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onReset}>
          <RotateCcwIcon className="size-4" />
          <span className="ml-1">Đặt lại</span>
        </Button>
      </div>
    </div>
  );
};
