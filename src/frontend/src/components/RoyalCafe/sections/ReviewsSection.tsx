import { Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import type { HomePageContent } from '../../../backend';

interface ReviewsSectionProps {
  content?: HomePageContent;
  isLoading?: boolean;
}

interface ParsedTestimonial {
  name: string;
  location: string;
  quote: string;
}

export function ReviewsSection({ content, isLoading }: ReviewsSectionProps) {
  const parseTestimonial = (str: string): ParsedTestimonial => {
    const parts = str.split('|');
    return {
      name: parts[0] || '',
      location: parts[1] || '',
      quote: parts[2] || ''
    };
  };

  const testimonials = content?.testimonials.map(parseTestimonial) || [];

  return (
    <section id="reviews" className="py-20 md:py-28 bg-royal-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-royal-maroon mb-4">
              What Our Customers Say
            </h2>
            <div className="w-24 h-1 bg-royal-gold mx-auto mb-6" />
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
              Real reviews from our valued customers in Varpur
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-5 w-5 rounded" />
                    ))}
                  </div>
                  <Skeleton className="h-20 w-full mb-4" />
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-royal-gold text-royal-gold"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-foreground/80 leading-relaxed mb-4 italic">
                    "{testimonial.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-royal-maroon/10 flex items-center justify-center">
                      <span className="font-bold text-royal-maroon">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {testimonial.name}
                      </p>
                      {testimonial.location && (
                        <p className="text-sm text-foreground/60">
                          {testimonial.location}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
