import { Coffee, Users, IndianRupee, Armchair } from 'lucide-react';

export function AboutSection() {
  const features = [
    {
      icon: Coffee,
      title: 'Quality Taste',
      description: 'Fresh ingredients and authentic recipes for the perfect cup every time'
    },
    {
      icon: Users,
      title: 'Friendly Atmosphere',
      description: 'Warm hospitality and a welcoming environment for everyone'
    },
    {
      icon: IndianRupee,
      title: 'Affordable Pricing',
      description: 'Great value for money without compromising on quality'
    },
    {
      icon: Armchair,
      title: 'Comfortable Seating',
      description: 'Relax and enjoy your time with friends and family'
    }
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-royal-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-royal-maroon mb-4">
              Welcome to Royal Cafe
            </h2>
            <div className="w-24 h-1 bg-royal-gold mx-auto mb-6" />
            <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Your favorite neighborhood spot in Varpur for delicious tea, coffee, and snacks. 
              We're proud to serve our community with quality and care.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="bg-royal-maroon/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="h-8 w-8 text-royal-maroon" />
                </div>
                <h3 className="font-display text-xl font-bold text-royal-maroon mb-2">
                  {feature.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
