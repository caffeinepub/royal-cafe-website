import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { storeSessionParameter } from '../../../utils/urlParams';
import { normalizeAdminCode, EXPECTED_ADMIN_CODE } from '../../../utils/adminCode';
import { useActor } from '../../../hooks/useActor';
import { useInternetIdentity } from '../../../hooks/useInternetIdentity';
import { ADMIN_STATUS_QUERY_KEY } from '../../../hooks/queryKeys';

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
  const { actor } = useActor();
  const { identity } = useInternetIdentity();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Normalize the admin code (trim whitespace, convert to uppercase)
      const normalizedCode = normalizeAdminCode(code);

      if (!normalizedCode) {
        setError('Please enter an admin code.');
        setIsLoading(false);
        return;
      }

      // Validate against expected admin code
      if (normalizedCode !== EXPECTED_ADMIN_CODE) {
        setError('Invalid admin code. Please check your code and try again.');
        setIsLoading(false);
        return;
      }

      // Store the normalized admin token in sessionStorage
      storeSessionParameter('caffeineAdminToken', normalizedCode);

      // Invalidate the actor query to force re-initialization with the admin token
      // Use predicate to match the actual query key structure
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'actor'
      });

      // Wait for actor to be available and re-initialized
      let attempts = 0;
      const maxAttempts = 20;
      while (attempts < maxAttempts) {
        const currentActor = queryClient.getQueryData(
          ['actor', identity?.getPrincipal().toString()]
        ) as any;
        
        if (currentActor) {
          // Actor is ready, now verify admin status
          try {
            const isAdminNow = await currentActor.isCallerAdmin();
            
            if (isAdminNow) {
              // Success! Refetch admin status query to update UI
              await queryClient.refetchQueries({ queryKey: ADMIN_STATUS_QUERY_KEY });
              
              // Clear form and close dialog
              setCode('');
              setError('');
              setIsLoading(false);
              onOpenChange(false);
              onSuccess();
              return;
            } else {
              // Admin check failed - backend didn't recognize the code
              setError('Invalid admin code. Please check your code and try again.');
              setIsLoading(false);
              return;
            }
          } catch (err) {
            console.error('Error checking admin status:', err);
            setError('An error occurred while verifying the code. Please try again.');
            setIsLoading(false);
            return;
          }
        }
        
        // Wait a bit before checking again
        await new Promise(resolve => setTimeout(resolve, 50));
        attempts++;
      }

      // If we get here, actor didn't reinitialize in time
      setError('Unable to connect to the backend. Please try again.');
      setIsLoading(false);
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
