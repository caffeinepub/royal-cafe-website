import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Save, Loader2, CheckCircle, AlertCircle, Plus, Trash2 } from 'lucide-react';
import { useHomePageContent } from '../../../hooks/useHomePageContent';
import type { HomePageContent, MenuItem, MenuCategory } from '../../../backend';

interface EditorPageProps {
  onExit: () => void;
}

interface ParsedHighlight {
  name: string;
  description: string;
  price: string;
  badge?: string;
}

interface ParsedTestimonial {
  name: string;
  location: string;
  quote: string;
}

export function EditorPage({ onExit }: EditorPageProps) {
  const { content, isLoading, saveContent, isSaving, saveError } = useHomePageContent();
  const [editedContent, setEditedContent] = useState<HomePageContent | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (content && !editedContent) {
      setEditedContent(content);
    }
  }, [content, editedContent]);

  const parseHighlight = (str: string): ParsedHighlight => {
    const parts = str.split('|');
    return {
      name: parts[0] || '',
      description: parts[1] || '',
      price: parts[2] || '',
      badge: parts[3] || undefined
    };
  };

  const serializeHighlight = (h: ParsedHighlight): string => {
    return `${h.name}|${h.description}|${h.price}${h.badge ? `|${h.badge}` : ''}`;
  };

  const parseTestimonial = (str: string): ParsedTestimonial => {
    const parts = str.split('|');
    return {
      name: parts[0] || '',
      location: parts[1] || '',
      quote: parts[2] || ''
    };
  };

  const serializeTestimonial = (t: ParsedTestimonial): string => {
    return `${t.name}|${t.location}|${t.quote}`;
  };

  const handleSave = async () => {
    if (!editedContent) return;

    try {
      await saveContent(editedContent);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Save error:', error);
    }
  };

  if (isLoading || !editedContent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-royal-maroon mx-auto mb-4" />
          <p className="text-foreground/60">Loading editor...</p>
        </div>
      </div>
    );
  }

  const highlights = editedContent.highlights.map(parseHighlight);
  const testimonials = editedContent.testimonials.map(parseTestimonial);

  return (
    <div className="min-h-screen bg-royal-cream/30">
      {/* Header */}
      <div className="bg-white border-b border-royal-cream sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={onExit}
                className="text-foreground hover:text-royal-maroon"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Exit Editor
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <h1 className="font-display text-2xl font-bold text-royal-maroon">
                Content Editor
              </h1>
            </div>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-royal-maroon hover:bg-royal-maroon/90"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {saveSuccess && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Changes saved successfully! The public site will reflect these updates.
            </AlertDescription>
          </Alert>
        )}

        {saveError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to save changes. Please try again.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="highlights" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white">
            <TabsTrigger value="highlights">Highlights</TabsTrigger>
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          {/* Highlights Tab */}
          <TabsContent value="highlights" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-royal-maroon">Popular Picks</CardTitle>
                <CardDescription>Edit the featured items displayed on the homepage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {highlights.map((highlight, index) => (
                  <div key={index} className="space-y-3 p-4 bg-royal-cream/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-semibold">Item {index + 1}</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newHighlights = highlights.filter((_, i) => i !== index);
                          setEditedContent({
                            ...editedContent,
                            highlights: newHighlights.map(serializeHighlight)
                          });
                        }}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor={`highlight-name-${index}`}>Name</Label>
                        <Input
                          id={`highlight-name-${index}`}
                          value={highlight.name}
                          onChange={(e) => {
                            const newHighlights = [...highlights];
                            newHighlights[index].name = e.target.value;
                            setEditedContent({
                              ...editedContent,
                              highlights: newHighlights.map(serializeHighlight)
                            });
                          }}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`highlight-price-${index}`}>Price (₹)</Label>
                        <Input
                          id={`highlight-price-${index}`}
                          value={highlight.price}
                          onChange={(e) => {
                            const newHighlights = [...highlights];
                            newHighlights[index].price = e.target.value;
                            setEditedContent({
                              ...editedContent,
                              highlights: newHighlights.map(serializeHighlight)
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor={`highlight-desc-${index}`}>Description</Label>
                      <Textarea
                        id={`highlight-desc-${index}`}
                        value={highlight.description}
                        onChange={(e) => {
                          const newHighlights = [...highlights];
                          newHighlights[index].description = e.target.value;
                          setEditedContent({
                            ...editedContent,
                            highlights: newHighlights.map(serializeHighlight)
                          });
                        }}
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`highlight-badge-${index}`}>Badge (optional)</Label>
                      <Input
                        id={`highlight-badge-${index}`}
                        value={highlight.badge || ''}
                        onChange={(e) => {
                          const newHighlights = [...highlights];
                          newHighlights[index].badge = e.target.value || undefined;
                          setEditedContent({
                            ...editedContent,
                            highlights: newHighlights.map(serializeHighlight)
                          });
                        }}
                        placeholder="e.g., Popular, Bestseller"
                      />
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => {
                    const newHighlight: ParsedHighlight = {
                      name: 'New Item',
                      description: 'Description',
                      price: '0'
                    };
                    setEditedContent({
                      ...editedContent,
                      highlights: [...highlights, newHighlight].map(serializeHighlight)
                    });
                  }}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Highlight
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Menu Tab */}
          <TabsContent value="menu" className="space-y-4">
            {editedContent.menuCategories.map((category, catIndex) => (
              <Card key={catIndex}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label htmlFor={`category-name-${catIndex}`}>Category Name</Label>
                      <Input
                        id={`category-name-${catIndex}`}
                        value={category.name}
                        onChange={(e) => {
                          const newCategories = [...editedContent.menuCategories];
                          newCategories[catIndex].name = e.target.value;
                          setEditedContent({
                            ...editedContent,
                            menuCategories: newCategories
                          });
                        }}
                        className="font-display text-lg font-semibold"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newCategories = editedContent.menuCategories.filter((_, i) => i !== catIndex);
                        setEditedContent({
                          ...editedContent,
                          menuCategories: newCategories
                        });
                      }}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-4"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="space-y-2 p-3 bg-royal-cream/20 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-sm font-semibold">Item {itemIndex + 1}</Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newCategories = [...editedContent.menuCategories];
                            newCategories[catIndex].items = category.items.filter((_, i) => i !== itemIndex);
                            setEditedContent({
                              ...editedContent,
                              menuCategories: newCategories
                            });
                          }}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor={`item-name-${catIndex}-${itemIndex}`}>Name</Label>
                          <Input
                            id={`item-name-${catIndex}-${itemIndex}`}
                            value={item.name}
                            onChange={(e) => {
                              const newCategories = [...editedContent.menuCategories];
                              newCategories[catIndex].items[itemIndex].name = e.target.value;
                              setEditedContent({
                                ...editedContent,
                                menuCategories: newCategories
                              });
                            }}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`item-price-${catIndex}-${itemIndex}`}>Price (₹)</Label>
                          <Input
                            id={`item-price-${catIndex}-${itemIndex}`}
                            value={item.price}
                            onChange={(e) => {
                              const newCategories = [...editedContent.menuCategories];
                              newCategories[catIndex].items[itemIndex].price = e.target.value;
                              setEditedContent({
                                ...editedContent,
                                menuCategories: newCategories
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor={`item-desc-${catIndex}-${itemIndex}`}>Description</Label>
                        <Input
                          id={`item-desc-${catIndex}-${itemIndex}`}
                          value={item.description}
                          onChange={(e) => {
                            const newCategories = [...editedContent.menuCategories];
                            newCategories[catIndex].items[itemIndex].description = e.target.value;
                            setEditedContent({
                              ...editedContent,
                              menuCategories: newCategories
                            });
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newCategories = [...editedContent.menuCategories];
                      newCategories[catIndex].items.push({
                        name: 'New Item',
                        description: 'Description',
                        price: '0'
                      });
                      setEditedContent({
                        ...editedContent,
                        menuCategories: newCategories
                      });
                    }}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </CardContent>
              </Card>
            ))}
            <Button
              variant="outline"
              onClick={() => {
                const newCategory: MenuCategory = {
                  name: 'New Category',
                  items: []
                };
                setEditedContent({
                  ...editedContent,
                  menuCategories: [...editedContent.menuCategories, newCategory]
                });
              }}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-royal-maroon">Customer Reviews</CardTitle>
                <CardDescription>Edit customer testimonials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="space-y-3 p-4 bg-royal-cream/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-semibold">Review {index + 1}</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newTestimonials = testimonials.filter((_, i) => i !== index);
                          setEditedContent({
                            ...editedContent,
                            testimonials: newTestimonials.map(serializeTestimonial)
                          });
                        }}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor={`testimonial-name-${index}`}>Customer Name</Label>
                        <Input
                          id={`testimonial-name-${index}`}
                          value={testimonial.name}
                          onChange={(e) => {
                            const newTestimonials = [...testimonials];
                            newTestimonials[index].name = e.target.value;
                            setEditedContent({
                              ...editedContent,
                              testimonials: newTestimonials.map(serializeTestimonial)
                            });
                          }}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`testimonial-location-${index}`}>Location</Label>
                        <Input
                          id={`testimonial-location-${index}`}
                          value={testimonial.location}
                          onChange={(e) => {
                            const newTestimonials = [...testimonials];
                            newTestimonials[index].location = e.target.value;
                            setEditedContent({
                              ...editedContent,
                              testimonials: newTestimonials.map(serializeTestimonial)
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor={`testimonial-quote-${index}`}>Review</Label>
                      <Textarea
                        id={`testimonial-quote-${index}`}
                        value={testimonial.quote}
                        onChange={(e) => {
                          const newTestimonials = [...testimonials];
                          newTestimonials[index].quote = e.target.value;
                          setEditedContent({
                            ...editedContent,
                            testimonials: newTestimonials.map(serializeTestimonial)
                          });
                        }}
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => {
                    const newTestimonial: ParsedTestimonial = {
                      name: 'Customer Name',
                      location: 'Location',
                      quote: 'Review text here'
                    };
                    setEditedContent({
                      ...editedContent,
                      testimonials: [...testimonials, newTestimonial].map(serializeTestimonial)
                    });
                  }}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Testimonial
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-royal-maroon">Contact Information</CardTitle>
                <CardDescription>Edit address, phone, and hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="contact-address">Address</Label>
                  <Input
                    id="contact-address"
                    value={editedContent.contactInfo.address}
                    onChange={(e) => {
                      setEditedContent({
                        ...editedContent,
                        contactInfo: {
                          ...editedContent.contactInfo,
                          address: e.target.value
                        }
                      });
                    }}
                    placeholder="Street, City, State, Country"
                  />
                </div>
                <div>
                  <Label htmlFor="contact-phone">Phone</Label>
                  <Input
                    id="contact-phone"
                    value={editedContent.contactInfo.phone}
                    onChange={(e) => {
                      setEditedContent({
                        ...editedContent,
                        contactInfo: {
                          ...editedContent.contactInfo,
                          phone: e.target.value
                        }
                      });
                    }}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <Label htmlFor="contact-hours">Business Hours</Label>
                  <Textarea
                    id="contact-hours"
                    value={editedContent.contactInfo.hours}
                    onChange={(e) => {
                      setEditedContent({
                        ...editedContent,
                        contactInfo: {
                          ...editedContent.contactInfo,
                          hours: e.target.value
                        }
                      });
                    }}
                    rows={4}
                    placeholder="Monday - Sunday&#10;7:00 AM - 10:00 PM&#10;Open all days"
                  />
                  <p className="text-sm text-foreground/60 mt-1">
                    Each line will be displayed separately
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
