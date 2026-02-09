import { Heart, Settings } from 'lucide-react';
import { useState } from 'react';
import { AdminLoginDialog } from './admin/AdminLoginDialog';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { useHomePageContent } from '../../hooks/useHomePageContent';

interface FooterProps {
  onEnterEditor?: () => void;
}

export function Footer({ onEnterEditor }: FooterProps) {
  const [showAdminDialog, setShowAdminDialog] = useState(false);
  const { isAdmin, isLoading: adminLoading } = useAdminAuth();
  const { content } = useHomePageContent();

  const handleAdminClick = () => {
    if (isAdmin && onEnterEditor) {
      onEnterEditor();
    } else {
      setShowAdminDialog(true);
    }
  };

  const handleLoginSuccess = () => {
    // Dialog handles verification and only calls onSuccess when admin status is confirmed
    if (onEnterEditor) {
      onEnterEditor();
    }
  };

  // Get contact info with fallbacks
  const address = content?.contactInfo?.address || 'Royal Cafe, Street 1, Varpur, Mau, Uttar Pradesh';
  const phone = content?.contactInfo?.phone || '+91 94508 14050';
  const hours = content?.contactInfo?.hours || 'Monday - Sunday\n10:00 am to 10:00 pm\nOpen all days';
  const hoursLines = hours.split('\n');

  return (
    <>
      <footer className="bg-royal-maroon text-royal-cream py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* About */}
            <div>
              <h3 className="font-display text-xl font-bold mb-4 text-royal-gold">Royal Cafe</h3>
              <p className="text-royal-cream/80 text-sm leading-relaxed">
                Your favorite spot in Varpur for fresh tea, great coffee, and delicious snacks. 
                Come enjoy quality taste in a friendly atmosphere.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-display text-xl font-bold mb-4 text-royal-gold">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#menu" className="text-royal-cream/80 hover:text-royal-gold transition-colors">
                    Menu
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-royal-cream/80 hover:text-royal-gold transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleAdminClick}
                    disabled={adminLoading}
                    className="text-royal-cream/80 hover:text-royal-gold transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    <Settings className="h-3 w-3" />
                    Admin
                  </button>
                </li>
              </ul>
            </div>

            {/* Visit Us */}
            <div>
              <h3 className="font-display text-xl font-bold mb-4 text-royal-gold">Visit Us</h3>
              <div className="space-y-3 text-sm">
                <p className="text-royal-cream/80 leading-relaxed">
                  {address}
                </p>
                <p className="text-royal-cream/80">
                  {phone}
                </p>
                <div className="text-royal-cream/80">
                  {hoursLines.map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-royal-cream/20 pt-8 text-center">
            <p className="text-royal-cream/60 text-sm flex items-center justify-center gap-2 flex-wrap">
              © {new Date().getFullYear()}. Built with <Heart className="h-4 w-4 text-royal-gold fill-royal-gold" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-royal-gold hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      <AdminLoginDialog
        open={showAdminDialog}
        onOpenChange={setShowAdminDialog}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
}
