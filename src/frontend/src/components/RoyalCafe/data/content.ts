import type { HomePageContent } from '../../../backend';

// Highlights / Popular Picks
export const highlights = [
  {
    name: 'Special Chai',
    description: 'Our signature blend of aromatic spices and premium tea leaves, brewed to perfection',
    price: '20',
    badge: 'Popular'
  },
  {
    name: 'Filter Coffee',
    description: 'Rich, authentic South Indian filter coffee made fresh for every cup',
    price: '30',
    badge: 'Bestseller'
  },
  {
    name: 'Samosa',
    description: 'Crispy golden samosas filled with spiced potatoes and peas, served hot',
    price: '15'
  },
  {
    name: 'Veg Sandwich',
    description: 'Fresh vegetables with tangy chutney in toasted bread',
    price: '40'
  },
  {
    name: 'Pakora Plate',
    description: 'Assorted crispy fritters with mint chutney',
    price: '50'
  },
  {
    name: 'Cold Coffee',
    description: 'Refreshing iced coffee blended with milk and ice cream',
    price: '60',
    badge: 'Refreshing'
  }
];

// Menu Categories
export const menuCategories = [
  {
    name: 'Tea & Hot Beverages',
    items: [
      { name: 'Special Chai', price: '20', description: 'Our signature masala chai' },
      { name: 'Ginger Chai', price: '20', description: 'Tea with fresh ginger' },
      { name: 'Elaichi Chai', price: '20', description: 'Cardamom-flavored tea' },
      { name: 'Lemon Tea', price: '20', description: 'Refreshing tea with lemon' },
      { name: 'Green Tea', price: '25', description: 'Healthy green tea' }
    ]
  },
  {
    name: 'Coffee',
    items: [
      { name: 'Filter Coffee', price: '30', description: 'Authentic South Indian style' },
      { name: 'Black Coffee', price: '25', description: 'Strong and bold' },
      { name: 'Cold Coffee', price: '60', description: 'Iced coffee with ice cream' },
      { name: 'Cappuccino', price: '50', description: 'Espresso with steamed milk' }
    ]
  },
  {
    name: 'Snacks',
    items: [
      { name: 'Samosa (2 pcs)', price: '15', description: 'Crispy potato samosas' },
      { name: 'Pakora Plate', price: '50', description: 'Mixed vegetable fritters' },
      { name: 'Bread Pakora', price: '30', description: 'Stuffed bread fritters' },
      { name: 'Aloo Tikki', price: '25', description: 'Spiced potato patties' },
      { name: 'Spring Roll', price: '40', description: 'Crispy vegetable rolls' }
    ]
  },
  {
    name: 'Fast Food',
    items: [
      { name: 'Veg Sandwich', price: '40', description: 'Grilled vegetable sandwich' },
      { name: 'Cheese Sandwich', price: '50', description: 'Toasted cheese sandwich' },
      { name: 'Veg Burger', price: '60', description: 'Veggie patty burger' },
      { name: 'French Fries', price: '50', description: 'Crispy golden fries' },
      { name: 'Veg Momos (6 pcs)', price: '60', description: 'Steamed dumplings' }
    ]
  }
];

// Testimonials
export const testimonials = [
  {
    name: 'Rajesh Kumar',
    location: 'Varpur',
    quote: 'Best chai in Varpur! The taste is always consistent and the atmosphere is so welcoming. My daily morning stop.'
  },
  {
    name: 'Priya Singh',
    location: 'Mau',
    quote: 'Love the samosas here! Fresh, hot, and perfectly spiced. Great place to hang out with friends.'
  },
  {
    name: 'Amit Sharma',
    location: 'Varpur',
    quote: 'Royal Cafe has become my favorite spot. Good food, affordable prices, and friendly service. Highly recommend!'
  },
  {
    name: 'Neha Gupta',
    location: 'Mau',
    quote: 'The coffee is amazing and the snacks are always fresh. Perfect place for a quick break or meeting friends.'
  },
  {
    name: 'Vikram Yadav',
    location: 'Varpur',
    quote: 'Clean, comfortable, and great taste. The staff is very polite. This is the best cafe in our area.'
  },
  {
    name: 'Sunita Devi',
    location: 'Varpur',
    quote: 'I bring my family here often. The food quality is excellent and prices are very reasonable. A true gem in Varpur!'
  }
];

// Contact Information
export const contactInfo = {
  address: {
    street: 'Royal Cafe, Street 1, Varpur',
    city: 'Mau',
    state: 'Uttar Pradesh',
    country: 'India'
  },
  phone: '+91 94508 14050',
  email: 'info@royalcafe.com',
  hours: [
    'Monday - Sunday',
    '10:00 am to 10:00 pm',
    'Open all days'
  ],
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28826.84!2d83.56!3d25.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39914c1c1c1c1c1c%3A0x1c1c1c1c1c1c1c1c!2sVarpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1234567890',
  mapLink: 'https://maps.google.com/?q=Varpur,Mau,Uttar+Pradesh'
};

// Default content structure for fallback
export const defaultContent: HomePageContent = {
  highlights: highlights.map(h => 
    `${h.name}|${h.description}|${h.price}${h.badge ? `|${h.badge}` : ''}`
  ),
  menuCategories: menuCategories.map(cat => ({
    name: cat.name,
    items: cat.items.map(item => ({
      name: item.name,
      description: item.description,
      price: item.price
    }))
  })),
  testimonials: testimonials.map(t => 
    `${t.name}|${t.location}|${t.quote}`
  ),
  contactInfo: {
    address: 'Royal Cafe, Street 1, Varpur, Mau, Uttar Pradesh',
    phone: '+91 94508 14050',
    hours: contactInfo.hours.join('\n')
  }
};
