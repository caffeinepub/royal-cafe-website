import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { contactInfo as defaultContactInfo } from '../data/content';
import type { HomePageContent } from '../../../backend';

interface ContactLocationSectionProps {
  content?: HomePageContent;
  isLoading?: boolean;
}

export function ContactLocationSection({ content, isLoading }: ContactLocationSectionProps) {
  const contactInfo = content?.contactInfo;
  const hours = contactInfo?.hours.split('\n') || defaultContactInfo.hours;

  return (
    <section id="contact" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-royal-maroon mb-4">
              Visit Us
            </h2>
            <div className="w-24 h-1 bg-royal-gold mx-auto mb-6" />
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
              Come experience the warmth of Royal Cafe in person
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              {/* Address */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-royal-maroon/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-royal-maroon" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold text-royal-maroon mb-2">
                      Location
                    </h3>
                    {isLoading ? (
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    ) : (
                      <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
                        {contactInfo?.address || `${defaultContactInfo.address.street}\n${defaultContactInfo.address.city}, ${defaultContactInfo.address.state}\n${defaultContactInfo.address.country}`}
                      </p>
                    )}
                    <Button
                      asChild
                      className="mt-4 bg-royal-maroon hover:bg-royal-maroon/90"
                    >
                      <a
                        href={defaultContactInfo.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open in Google Maps
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-royal-maroon/10 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-royal-maroon" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold text-royal-maroon mb-2">
                      Business Hours
                    </h3>
                    {isLoading ? (
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    ) : (
                      <div className="space-y-1 text-foreground/80">
                        {hours.map((hour, index) => (
                          <p key={index}>{hour}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-royal-maroon/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-royal-maroon" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold text-royal-maroon mb-2">
                      Contact
                    </h3>
                    {isLoading ? (
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-4 w-48" />
                      </div>
                    ) : (
                      <>
                        <p className="text-foreground/80">
                          Phone: {contactInfo?.phone || defaultContactInfo.phone}
                        </p>
                        <p className="text-foreground/80 flex items-center gap-2 mt-1">
                          <Mail className="h-4 w-4" />
                          {defaultContactInfo.email}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg h-[500px]">
              <iframe
                src={defaultContactInfo.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Royal Cafe Location Map"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
