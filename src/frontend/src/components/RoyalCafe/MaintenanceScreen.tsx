import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Settings } from 'lucide-react';
import { useState } from 'react';
import { AdminLoginDialog } from './admin/AdminLoginDialog';

interface MaintenanceScreenProps {
  onEnterEditor: () => void;
}

export function MaintenanceScreen({ onEnterEditor }: MaintenanceScreenProps) {
  const [showAdminDialog, setShowAdminDialog] = useState(false);

  const handleLoginSuccess = () => {
    onEnterEditor();
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-royal-cream/30 via-background to-royal-cream/20 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full shadow-xl border-royal-cream">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="mx-auto w-20 h-20 bg-royal-maroon/10 rounded-full flex items-center justify-center">
              <AlertCircle className="h-10 w-10 text-royal-maroon" />
            </div>
            <div>
              <CardTitle className="text-3xl font-display text-royal-maroon mb-2">
                Site Temporarily Unavailable
              </CardTitle>
              <CardDescription className="text-lg">
                We're currently performing maintenance on our website
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="space-y-3">
              <p className="text-foreground/80">
                Royal Cafe is temporarily offline while we make some improvements.
              </p>
              <p className="text-foreground/80">
                We'll be back soon! Thank you for your patience.
              </p>
            </div>
            
            <div className="pt-4 border-t border-royal-cream/50">
              <p className="text-sm text-foreground/60 mb-3">
                Are you an administrator?
              </p>
              <Button
                onClick={() => setShowAdminDialog(true)}
                variant="outline"
                className="border-royal-maroon text-royal-maroon hover:bg-royal-maroon hover:text-white"
              >
                <Settings className="h-4 w-4 mr-2" />
                Admin Access
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <AdminLoginDialog
        open={showAdminDialog}
        onOpenChange={setShowAdminDialog}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
}
