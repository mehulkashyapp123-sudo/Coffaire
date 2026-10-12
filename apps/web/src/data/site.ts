export const address =
  'Shree Renuka Complex, Plot No. 95, Friends Colony Main Road, Katol Road, Nagpur, Maharashtra 440013, India';

export const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

// Café owner's business contact details
export const phone = '08208656229';
export const phoneUrl = 'tel:+918208656229';

// Replace this placeholder with the owner's actual business email
export const email = 'OWNER_EMAIL_HERE';
export const emailUrl = `mailto:${email}`;

// Café owner's WhatsApp contact
export const whatsappUrl = `https://wa.me/918208656229?text=${encodeURIComponent('Hi! I have a question about my order.')}`;

// Replace this placeholder with the owner's actual UPI ID
export const upiId = 'OWNER_UPI_ID_HERE';
export const images = {
  hero: 'https://images.hostinger.com/e583b084-6639-4665-b606-1b0161f30777.png',
  latte: 'https://images.hostinger.com/5763a701-5435-4f95-ad8c-69ed07d2e01e.png',
  cloud: 'https://images.hostinger.com/0cafec45-d52f-483e-b4e4-b9799795bdf9.png',
  pizza: 'https://images.hostinger.com/6cfa5571-e97d-4688-9759-9bc211cfb025.png',
  matcha: 'https://images.hostinger.com/15812a18-4bfa-4529-8a97-b2c06953f494.png',
  frappe: 'https://images.hostinger.com/2fc5cc95-39bb-4da9-89a6-a0e9b788dc40.png',
  brownie: 'https://images.hostinger.com/17f76556-268b-4882-9567-6f699eddcc13.png',
  cafe: 'https://images.hostinger.com/a28cbc96-103a-468b-95ab-0d6a95e04460.png',
  menuCoffee: 'https://horizons-cdn.hostinger.com/9eda10f3-68e6-4a2d-bc42-118a5e011e3d/a9fc2e866a2260e62dcb65fc401f7c02.png',
  menuPizza: 'https://horizons-cdn.hostinger.com/9eda10f3-68e6-4a2d-bc42-118a5e011e3d/50741dc805cec5f8a52c477578e9af4c.png',
};

export const featured = [
  { name: 'Café Latte', price: 160, image: images.latte, description: 'Espresso and silky steamed milk.', category: 'Coffee' },
  { name: 'Coconut Coffee Cloud', price: 220, image: images.cloud, description: 'Coffee with a light coconut cloud.', category: 'Specialty' },
  { name: 'Classic Margherita Pizza', price: 320, image: images.pizza, description: 'Fresh mozzarella, basil and olive oil.', category: 'Pizza' },
  { name: 'Matcha Latte', price: 170, image: images.matcha, description: 'A comforting matcha moment.', category: 'Matcha' },
  { name: 'Choco Brownie Frappe', price: 180, image: images.frappe, description: 'Chocolate, coffee and brownie notes.', category: 'Frappe' },
  { name: 'Choco Walnut Brownie', price: 180, image: images.brownie, description: 'A rich chocolate and walnut treat.', category: 'Dessert' },
];

export const gallery = [
  { image: images.latte, label: 'Coffee', alt: 'Café latte with latte art in a ceramic cup' },
  { image: images.pizza, label: 'Pizza', alt: 'Classic Margherita Neapolitan pizza with basil' },
  { image: images.cafe, label: 'Café', alt: 'Warm contemporary café interior' },
  { image: images.brownie, label: 'Desserts', alt: 'Chocolate walnut brownie on a plate' },
  { image: images.cloud, label: 'Drinks', alt: 'Iced coconut coffee cloud in a glass' },
  { image: images.menuCoffee, label: 'Menu', alt: 'Coffaire coffee menu photograph' },
  { image: images.matcha, label: 'Drinks', alt: 'Matcha latte in a ceramic cup' },
  { image: images.menuPizza, label: 'Menu', alt: 'Coffaire Neapolitan pizza menu photograph' },
];
