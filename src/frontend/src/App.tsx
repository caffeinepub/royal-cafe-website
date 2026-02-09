import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HeroSection } from './components/RoyalCafe/sections/HeroSection';
import { AboutSection } from './components/RoyalCafe/sections/AboutSection';
import { HighlightsSection } from './components/RoyalCafe/sections/HighlightsSection';
import { MenuSection } from './components/RoyalCafe/sections/MenuSection';
import { ReviewsSection } from './components/RoyalCafe/sections/ReviewsSection';
import { ContactLocationSection } from './components/RoyalCafe/sections/ContactLocationSection';
import { NavBar } from './components/RoyalCafe/NavBar';
import { Footer } from './components/RoyalCafe/Footer';
import { EditorPage } from './components/RoyalCafe/admin/EditorPage';
import { AccessDenied } from './components/RoyalCafe/admin/AccessDenied';
import { useHomePageContent } from './hooks/useHomePageContent';
import { useAdminAuth } from './hooks/useAdminAuth';

const queryClient = new QueryClient();

function AppContent() {
  const [viewMode, setViewMode] = useState<'public' | 'editor'>('public');
  const { content, isLoading: contentLoading } = useHomePageContent();
  const { isAdmin, isLoading: authLoading } = useAdminAuth();

  const handleEnterEditor = () => {
    setViewMode('editor');
  };

  const handleExitEditor = () => {
    setViewMode('public');
  };

  // When entering editor mode, wait for auth to be confirmed
  useEffect(() => {
    if (viewMode === 'editor' && !authLoading && !isAdmin) {
      // If we're in editor mode but not admin after loading completes,
      // the AccessDenied component will show
    }
  }, [viewMode, authLoading, isAdmin]);

  if (viewMode === 'editor') {
    if (authLoading) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal-maroon mx-auto mb-4"></div>
            <p className="text-foreground/60">Checking authorization...</p>
          </div>
        </div>
      );
    }

    if (!isAdmin) {
      return <AccessDenied onExit={handleExitEditor} />;
    }

    return <EditorPage onExit={handleExitEditor} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar onEnterEditor={handleEnterEditor} />
      <main>
        <HeroSection />
        <AboutSection />
        <HighlightsSection content={content} isLoading={contentLoading} />
        <MenuSection content={content} isLoading={contentLoading} />
        <ReviewsSection content={content} isLoading={contentLoading} />
        <ContactLocationSection content={content} isLoading={contentLoading} />
      </main>
      <Footer onEnterEditor={handleEnterEditor} />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
