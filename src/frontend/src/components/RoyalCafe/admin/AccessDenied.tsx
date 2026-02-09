import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';

interface AccessDeniedProps {
  onExit: () => void;
}

export function AccessDenied({ onExit }: AccessDeniedProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="bg-royal-maroon/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="h-10 w-10 text-royal-maroon" />
          </div>
          
          <h1 className="font-display text-3xl font-bold text-royal-maroon mb-4">
            Access Denied
          </h1>
          
          <p className="text-foreground/70 mb-8 leading-relaxed">
            You don't have permission to access the editor. Please log in with a valid admin code.
          </p>
          
          <Button
            onClick={onExit}
            className="bg-royal-maroon hover:bg-royal-maroon/90 w-full"
          >
            Return to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}
