import { HeroSection } from './components/RoyalCafe/sections/HeroSection';
import { AboutSection } from './components/RoyalCafe/sections/AboutSection';
import { HighlightsSection } from './components/RoyalCafe/sections/HighlightsSection';
import { MenuSection } from './components/RoyalCafe/sections/MenuSection';
import { GallerySection } from './components/RoyalCafe/sections/GallerySection';
import { ReviewsSection } from './components/RoyalCafe/sections/ReviewsSection';
import { ContactLocationSection } from './components/RoyalCafe/sections/ContactLocationSection';
import { NavBar } from './components/RoyalCafe/NavBar';
import { Footer } from './components/RoyalCafe/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main>
        <HeroSection />
        <AboutSection />
        <HighlightsSection />
        <MenuSection />
        <GallerySection />
        <ReviewsSection />
        <ContactLocationSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
