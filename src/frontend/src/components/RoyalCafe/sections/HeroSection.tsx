import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin } from 'lucide-react';

export function HeroSection() {
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
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/royal-cafe-hero.dim_1920x1080.png"
          alt="Royal Cafe - Fresh tea and snacks"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <img
              src="/assets/generated/royal-cafe-logo.dim_512x512.png"
              alt="Royal Cafe Logo"
              className="h-24 w-24 md:h-32 md:w-32 object-contain drop-shadow-2xl animate-in fade-in zoom-in duration-700"
            />
          </div>

          {/* Title */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            Royal Cafe
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-3xl text-royal-cream font-medium mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            Fresh Tea, Great Taste, Everyday Moments
          </p>

          {/* Location */}
          <div className="flex items-center justify-center gap-2 text-royal-cream/90 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <MapPin className="h-5 w-5" />
            <span className="text-lg">Varpur, Mau, Uttar Pradesh</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700">
            <Button
              size="lg"
              onClick={() => scrollToSection('menu')}
              className="bg-royal-maroon hover:bg-royal-maroon/90 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              View Menu
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('contact')}
              className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-royal-maroon px-8 py-6 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              Visit Us Today
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
