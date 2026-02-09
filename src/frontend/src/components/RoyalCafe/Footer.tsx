import { SiInstagram } from 'react-icons/si';
import { Heart, Settings } from 'lucide-react';
import { useState } from 'react';
import { AdminLoginDialog } from './admin/AdminLoginDialog';
import { useAdminAuth } from '../../hooks/useAdminAuth';

interface FooterProps {
  onEnterEditor?: () => void;
}

export function Footer({ onEnterEditor }: FooterProps) {
  const [showAdminDialog, setShowAdminDialog] = useState(false);
  const { isAdmin, isLoading: adminLoading } = useAdminAuth();

  const handleAdminClick = () => {
    if (isAdmin && onEnterEditor) {
      onEnterEditor();
    } else {
      setShowAdminDialog(true);
    }
  };

  const handleLoginSuccess = () => {
    // Dialog will close itself after successful login
    // Wait a moment for the admin state to update, then enter editor
    setTimeout(() => {
      if (onEnterEditor) {
        onEnterEditor();
      }
    }, 200);
  };

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

            {/* Contact */}
            <div>
              <h3 className="font-display text-xl font-bold mb-4 text-royal-gold">Visit Us</h3>
              <p className="text-royal-cream/80 text-sm leading-relaxed mb-4">
                Varpur, Mau<br />
                Uttar Pradesh
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/royal_cafe_mau/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-royal-cream/80 hover:text-royal-gold transition-colors"
                  aria-label="Instagram"
                >
                  <SiInstagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-royal-cream/20 pt-8 text-center">
            <p className="text-royal-cream/60 text-sm flex items-center justify-center gap-2 flex-wrap">
              © 2026. Built with <Heart className="h-4 w-4 text-royal-gold fill-royal-gold" /> using{' '}
              <a
                href="https://caffeine.ai"
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
