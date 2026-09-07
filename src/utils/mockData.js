// Placeholder data used until the Django REST Framework backend is wired up.
// Swap out via src/services/menuService.js and src/services/orderService.js.

export const mockCategories = [
  { id: 'all', name: 'All', image: null },
  {
    id: 'coffee',
    name: 'Coffee',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&q=80&auto=format&fit=crop',
  },
  {
    id: 'breakfast',
    name: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=200&q=80&auto=format&fit=crop',
  },
  {
    id: 'burgers',
    name: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80&auto=format&fit=crop',
  },
  {
    id: 'pizza',
    name: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&q=80&auto=format&fit=crop',
  },
  {
    id: 'desserts',
    name: 'Desserts',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&q=80&auto=format&fit=crop',
  },
  {
    id: 'drinks',
    name: 'Drinks',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&q=80&auto=format&fit=crop',
  },
]

export const mockMenuItems = [
  {
    id: 1,
    name: 'Cappuccino',
    description: 'Double espresso, steamed milk, a finger of foam.',
    price: 149,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80&auto=format&fit=crop',
    isVeg: true,
  },
  {
    id: 2,
    name: 'Iced Caramel Latte',
    description: 'Cold espresso, milk, house caramel, over ice.',
    price: 179,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=80&auto=format&fit=crop',
    isVeg: true,
  },
  {
    id: 3,
    name: 'Pour Over',
    description: 'Single origin, brewed fresh to order, tasting notes of stone fruit.',
    price: 199,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80&auto=format&fit=crop',
    isVeg: true,
  },
  {
    id: 4,
    name: 'Avocado Toast',
    description: 'Sourdough, smashed avocado, chili flake, soft egg.',
    price: 229,
    category: 'breakfast',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=600&q=80&auto=format&fit=crop',
    isVeg: true,
  },
  {
    id: 5,
    name: 'Buttermilk Pancakes',
    description: 'Stacked three high, maple syrup, whipped butter.',
    price: 199,
    category: 'breakfast',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80&auto=format&fit=crop',
    isVeg: true,
  },
  {
    id: 6,
    name: 'Classic Cheeseburger',
    description: 'Beef patty, cheddar, house pickles, brioche bun.',
    price: 259,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80&auto=format&fit=crop',
    isVeg: false,
  },
  {
    id: 7,
    name: 'Grilled Chicken Sandwich',
    description: 'Buttermilk chicken, slaw, chipotle mayo, toasted bun.',
    price: 219,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=600&q=80&auto=format&fit=crop',
    isVeg: false,
  },
  {
    id: 8,
    name: 'Margherita Pizza',
    description: 'San Marzano tomato, fior di latte, torn basil.',
    price: 299,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80&auto=format&fit=crop',
    isVeg: true,
  },
  {
    id: 9,
    name: 'Wild Mushroom Pizza',
    description: 'Roasted mushroom medley, taleggio, thyme.',
    price: 329,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=600&q=80&auto=format&fit=crop',
    isVeg: true,
  },
  {
    id: 10,
    name: 'Basque Cheesecake',
    description: 'Burnt top, molten center, single slice.',
    price: 189,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80&auto=format&fit=crop',
    isVeg: true,
  },
  {
    id: 11,
    name: 'Almond Croissant',
    description: 'Laminated dough, almond cream, toasted flakes.',
    price: 139,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80&auto=format&fit=crop',
    isVeg: true,
  },
  {
    id: 12,
    name: 'Fresh Lemonade',
    description: 'Hand-pressed lemon, mint, soda top.',
    price: 129,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80&auto=format&fit=crop',
    isVeg: true,
  },
  {
    id: 13,
    name: 'Mango Smoothie',
    description: 'Alphonso mango, yogurt, a little honey.',
    price: 169,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=600&q=80&auto=format&fit=crop',
    isVeg: true,
  },
  {
    id: 14,
    name: 'Masala Chai',
    description: 'Slow-steeped black tea, whole spice, milk.',
    price: 99,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80&auto=format&fit=crop',
    isVeg: true,
  },
]

export const mockPromos = [
  {
    id: 'p1',
    title: 'Weekend Combo',
    subtitle: 'Coffee + Sandwich',
    price: '₹199',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80&auto=format&fit=crop',
  },
  {
    id: 'p2',
    title: 'Happy Hour, 4–6pm',
    subtitle: '20% off all cold brews',
    price: '',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=80&auto=format&fit=crop',
  },
  {
    id: 'p3',
    title: 'New: Wild Mushroom Pizza',
    subtitle: 'Taleggio, thyme, wood-fired',
    price: '₹329',
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=400&q=80&auto=format&fit=crop',
  },
  {
    id: 'p4',
    title: 'Sunday Brunch Set',
    subtitle: 'Pancakes + juice + coffee',
    price: '₹349',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80&auto=format&fit=crop',
  },
]

export const mockOrders = [
  {
    id: 'ORD1024',
    items: [
      { name: 'Cappuccino', qty: 2 },
      { name: 'Grilled Chicken Sandwich', qty: 1 },
    ],
    total: 547,
    status: 'Preparing',
    placedAt: '2026-08-31T09:12:00',
  },
  {
    id: 'ORD1023',
    items: [
      { name: 'Margherita Pizza', qty: 1 },
      { name: 'Fresh Lemonade', qty: 2 },
    ],
    total: 557,
    status: 'Ready',
    placedAt: '2026-08-30T18:40:00',
  },
  {
    id: 'ORD1019',
    items: [
      { name: 'Basque Cheesecake', qty: 1 },
      { name: 'Pour Over', qty: 1 },
    ],
    total: 388,
    status: 'Completed',
    placedAt: '2026-08-28T11:05:00',
  },
  {
    id: 'ORD1011',
    items: [{ name: 'Classic Cheeseburger', qty: 2 }],
    total: 518,
    status: 'Cancelled',
    placedAt: '2026-08-24T20:15:00',
  },
]

export const orderStatuses = ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Completed', 'Cancelled']
