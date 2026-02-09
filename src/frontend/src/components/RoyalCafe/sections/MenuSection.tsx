import { menuCategories } from '../data/content';

export function MenuSection() {
  return (
    <section id="menu" className="py-20 md:py-28 bg-royal-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-royal-maroon mb-4">
              Our Menu
            </h2>
            <div className="w-24 h-1 bg-royal-gold mx-auto mb-6" />
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
              Explore our delicious selection of beverages and snacks
            </p>
          </div>

          {/* Menu Categories */}
          <div className="space-y-12">
            {menuCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
                <h3 className="font-display text-3xl font-bold text-royal-maroon mb-6 pb-3 border-b-2 border-royal-gold/30">
                  {category.name}
                </h3>
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex justify-between items-start gap-4 py-3 border-b border-royal-cream last:border-0"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg text-foreground mb-1">
                          {item.name}
                        </h4>
                        {item.description && (
                          <p className="text-sm text-foreground/60">
                            {item.description}
                          </p>
                        )}
                      </div>
                      {item.price && (
                        <span className="font-bold text-royal-maroon text-lg whitespace-nowrap">
                          ₹{item.price}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <p className="text-center text-sm text-foreground/60 mt-8">
            * Prices are indicative and subject to change
          </p>
        </div>
      </div>
    </section>
  );
}
