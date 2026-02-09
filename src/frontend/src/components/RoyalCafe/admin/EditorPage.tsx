import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save, Loader2, CheckCircle, AlertCircle, Plus, Trash2, Globe, GlobeLock } from 'lucide-react';
import { useHomePageContent } from '../../../hooks/useHomePageContent';
import { useGetPublishState, useSetPublishState } from '../../../hooks/useQueries';
import type { HomePageContent, MenuItem, MenuCategory } from '../../../backend';

interface EditorPageProps {
  onExit: () => void;
}

interface ParsedTestimonial {
  name: string;
  location: string;
  quote: string;
}

export function EditorPage({ onExit }: EditorPageProps) {
  const { content, isLoading, saveContent, isSaving, saveError } = useHomePageContent();
  const { data: isPublished, isLoading: publishStateLoading } = useGetPublishState();
  const { mutate: setPublishState, isPending: isSettingPublishState } = useSetPublishState();
  const [editedContent, setEditedContent] = useState<HomePageContent | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  useEffect(() => {
    if (content && !editedContent) {
      setEditedContent(content);
    }
  }, [content, editedContent]);

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

  const handlePublishStateChange = (newState: boolean) => {
    setPublishState(newState, {
      onSuccess: () => {
        setPublishSuccess(true);
        setTimeout(() => setPublishSuccess(false), 3000);
      },
      onError: (error) => {
        console.error('Error updating publish state:', error);
      }
    });
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
              Changes saved successfully!
            </AlertDescription>
          </Alert>
        )}

        {publishSuccess && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Publish state updated successfully!
            </AlertDescription>
          </Alert>
        )}

        {saveError && (
          <Alert className="mb-6 bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              Failed to save changes. Please try again.
            </AlertDescription>
          </Alert>
        )}

        {/* Publish State Control */}
        <Card className="mb-6 border-royal-maroon/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isPublished ? (
                <Globe className="h-5 w-5 text-green-600" />
              ) : (
                <GlobeLock className="h-5 w-5 text-orange-600" />
              )}
              Site Status
            </CardTitle>
            <CardDescription>
              Control whether the site is visible to the public
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-royal-cream/20 rounded-lg">
              <div className="space-y-1">
                <p className="font-medium text-foreground">
                  {isPublished ? 'Site is Published' : 'Site is Unpublished'}
                </p>
                <p className="text-sm text-foreground/60">
                  {isPublished 
                    ? 'Your site is live and visible to all visitors'
                    : 'Your site is in maintenance mode. Only admins can access it.'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Label htmlFor="publish-toggle" className="text-sm font-medium">
                  {isPublished ? 'Published' : 'Unpublished'}
                </Label>
                <Switch
                  id="publish-toggle"
                  checked={isPublished ?? true}
                  onCheckedChange={handlePublishStateChange}
                  disabled={publishStateLoading || isSettingPublishState}
                  className="data-[state=checked]:bg-green-600"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="menu" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="contact">Contact Info</TabsTrigger>
          </TabsList>

          {/* Menu Tab */}
          <TabsContent value="menu" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Menu Categories</CardTitle>
                <CardDescription>
                  Manage your menu categories and items
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {editedContent.menuCategories.map((category, catIndex) => (
                  <div key={catIndex} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <Input
                        value={category.name}
                        onChange={(e) => {
                          const newCategories = [...editedContent.menuCategories];
                          newCategories[catIndex].name = e.target.value;
                          setEditedContent({ ...editedContent, menuCategories: newCategories });
                        }}
                        className="font-semibold text-lg"
                        placeholder="Category name"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newCategories = editedContent.menuCategories.filter((_, i) => i !== catIndex);
                          setEditedContent({ ...editedContent, menuCategories: newCategories });
                        }}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="grid grid-cols-12 gap-2 items-start">
                          <Input
                            value={item.name}
                            onChange={(e) => {
                              const newCategories = [...editedContent.menuCategories];
                              newCategories[catIndex].items[itemIndex].name = e.target.value;
                              setEditedContent({ ...editedContent, menuCategories: newCategories });
                            }}
                            placeholder="Item name"
                            className="col-span-4"
                          />
                          <Input
                            value={item.description}
                            onChange={(e) => {
                              const newCategories = [...editedContent.menuCategories];
                              newCategories[catIndex].items[itemIndex].description = e.target.value;
                              setEditedContent({ ...editedContent, menuCategories: newCategories });
                            }}
                            placeholder="Description"
                            className="col-span-5"
                          />
                          <Input
                            value={item.price}
                            onChange={(e) => {
                              const newCategories = [...editedContent.menuCategories];
                              newCategories[catIndex].items[itemIndex].price = e.target.value;
                              setEditedContent({ ...editedContent, menuCategories: newCategories });
                            }}
                            placeholder="Price"
                            className="col-span-2"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newCategories = [...editedContent.menuCategories];
                              newCategories[catIndex].items = newCategories[catIndex].items.filter((_, i) => i !== itemIndex);
                              setEditedContent({ ...editedContent, menuCategories: newCategories });
                            }}
                            className="col-span-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newCategories = [...editedContent.menuCategories];
                        newCategories[catIndex].items.push({ name: '', description: '', price: '' });
                        setEditedContent({ ...editedContent, menuCategories: newCategories });
                      }}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </div>
                ))}

                <Button
                  variant="outline"
                  onClick={() => {
                    const newCategories = [...editedContent.menuCategories, { name: '', items: [] }];
                    setEditedContent({ ...editedContent, menuCategories: newCategories });
                  }}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Testimonials</CardTitle>
                <CardDescription>
                  Manage customer reviews and feedback
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm text-foreground/60">Testimonial {index + 1}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newTestimonials = editedContent.testimonials.filter((_, i) => i !== index);
                          setEditedContent({ ...editedContent, testimonials: newTestimonials });
                        }}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor={`testimonial-name-${index}`}>Name</Label>
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
                          placeholder="Customer name"
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
                          placeholder="Location"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor={`testimonial-quote-${index}`}>Quote</Label>
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
                        placeholder="Customer testimonial"
                        rows={3}
                      />
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  onClick={() => {
                    const newTestimonials = [...testimonials, { name: '', location: '', quote: '' }];
                    setEditedContent({
                      ...editedContent,
                      testimonials: newTestimonials.map(serializeTestimonial)
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

          {/* Contact Info Tab */}
          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Update your cafe's contact details
                </CardDescription>
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
                    placeholder="Full address"
                  />
                  <p className="text-xs text-foreground/60 mt-1">
                    Enter the complete address (e.g., Royal Cafe, Street 1, Varpur, Mau, Uttar Pradesh)
                  </p>
                </div>

                <div>
                  <Label htmlFor="contact-phone">Phone Number</Label>
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
                    placeholder="Phone number"
                  />
                  <p className="text-xs text-foreground/60 mt-1">
                    Include country code (e.g., +91 94508 14050)
                  </p>
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
                    placeholder="Business hours"
                    rows={4}
                  />
                  <p className="text-xs text-foreground/60 mt-1">
                    Enter each line separately. Example:<br />
                    Monday - Sunday<br />
                    10:00 am to 10:00 pm<br />
                    Open all days
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
