import { highlights } from '../data/content';
import { Badge } from '@/components/ui/badge';

export function HighlightsSection() {
  return (
    <section id="highlights" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-royal-maroon mb-4">
              Popular Picks
            </h2>
            <div className="w-24 h-1 bg-royal-gold mx-auto mb-6" />
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
              Discover our most loved items that keep our customers coming back
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-royal-cream"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display text-2xl font-bold text-royal-maroon">
                      {item.name}
                    </h3>
                    {item.badge && (
                      <Badge className="bg-royal-gold text-royal-maroon font-semibold">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-foreground/70 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  {item.price && (
                    <p className="text-royal-maroon font-bold text-xl">
                      ₹{item.price}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
