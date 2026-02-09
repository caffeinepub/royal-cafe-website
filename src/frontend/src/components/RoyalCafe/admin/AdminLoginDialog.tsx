import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { storeSessionParameter } from '../../../utils/urlParams';

const ADMIN_CODE = '275101MAU';

interface AdminLoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function AdminLoginDialog({ open, onOpenChange, onSuccess }: AdminLoginDialogProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate the code
      if (code.trim() !== ADMIN_CODE) {
        setError('Invalid admin code. Please try again.');
        setIsLoading(false);
        return;
      }

      // Store the admin token in sessionStorage
      storeSessionParameter('caffeineAdminToken', code.trim());

      // Invalidate the actor query to force re-initialization with the admin token
      await queryClient.invalidateQueries({ queryKey: ['actor'] });
      
      // Wait a bit for the actor to reinitialize
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Invalidate and refetch the isAdmin query
      await queryClient.invalidateQueries({ queryKey: ['isAdmin'] });
      await queryClient.refetchQueries({ queryKey: ['isAdmin'] });

      // Wait a bit more to ensure the query has updated
      await new Promise(resolve => setTimeout(resolve, 100));

      // Verify that admin status is now true
      const isAdminData = queryClient.getQueryData<boolean>(['isAdmin']);
      
      if (isAdminData !== true) {
        setError('Login failed. Unable to verify admin access. Please try again.');
        setIsLoading(false);
        return;
      }

      // Success - clear form and close dialog
      setCode('');
      setError('');
      setIsLoading(false);
      onOpenChange(false);
      onSuccess();
    } catch (err) {
      console.error('Admin login error:', err);
      setError('An error occurred during login. Please try again.');
      setIsLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    // Only allow closing if not loading
    if (!isLoading) {
      if (!newOpen) {
        // Reset form when closing
        setCode('');
        setError('');
      }
      onOpenChange(newOpen);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-royal-maroon">Admin Login</DialogTitle>
          <DialogDescription>
            Enter the admin code to access the editor
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-code">Admin Code</Label>
            <Input
              id="admin-code"
              type="text"
              placeholder="Enter admin code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={isLoading}
              className="font-mono"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !code.trim()}
              className="bg-royal-maroon hover:bg-royal-maroon/90"
            >
              {isLoading ? 'Verifying...' : 'Login'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
