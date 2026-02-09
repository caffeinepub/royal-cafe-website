import { useState, useEffect } from 'react';
import { Menu, X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdminLoginDialog } from './admin/AdminLoginDialog';
import { useAdminAuth } from '../../hooks/useAdminAuth';

interface NavBarProps {
  onEnterEditor?: () => void;
}

export function NavBar({ onEnterEditor }: NavBarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAdminDialog, setShowAdminDialog] = useState(false);
  const { isAdmin, isLoading: adminLoading } = useAdminAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  const handleAdminClick = () => {
    if (isAdmin && onEnterEditor) {
      onEnterEditor();
    } else {
      setShowAdminDialog(true);
    }
    setIsMobileMenuOpen(false);
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

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'highlights', label: 'Popular' },
    { id: 'menu', label: 'Menu' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/95 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-3 group"
            >
              <img
                src="/assets/generated/royal-cafe-logo.dim_512x512.png"
                alt="Royal Cafe Logo"
                className="h-12 w-12 object-contain transition-transform group-hover:scale-110"
              />
              <span className="font-display text-2xl font-bold text-royal-maroon">
                Royal Cafe
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Button
                  key={link.id}
                  variant="ghost"
                  onClick={() => scrollToSection(link.id)}
                  className="text-foreground hover:text-royal-maroon hover:bg-royal-cream/50 transition-colors"
                >
                  {link.label}
                </Button>
              ))}
              <Button
                variant="ghost"
                onClick={handleAdminClick}
                disabled={adminLoading}
                className="text-foreground hover:text-royal-maroon hover:bg-royal-cream/50 transition-colors"
              >
                <Settings className="h-4 w-4 mr-2" />
                {isAdmin ? 'Editor' : 'Admin'}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4 animate-in slide-in-from-top-2">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Button
                    key={link.id}
                    variant="ghost"
                    onClick={() => scrollToSection(link.id)}
                    className="justify-start text-foreground hover:text-royal-maroon hover:bg-royal-cream/50"
                  >
                    {link.label}
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  onClick={handleAdminClick}
                  disabled={adminLoading}
                  className="justify-start text-foreground hover:text-royal-maroon hover:bg-royal-cream/50"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {isAdmin ? 'Editor' : 'Admin'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <AdminLoginDialog
        open={showAdminDialog}
        onOpenChange={setShowAdminDialog}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
}
