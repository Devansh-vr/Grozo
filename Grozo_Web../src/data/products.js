export const categories = [
  { id: 'fruits-vegetables', name: 'Fruits & Vegetables', color: 'bg-green-100 text-green-700', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400' },
  { id: 'dairy', name: 'Dairy', color: 'bg-blue-100 text-blue-700', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400' },
  { id: 'snacks', name: 'Snacks', color: 'bg-yellow-100 text-yellow-700', image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400' },
  { id: 'beverages', name: 'Beverages', color: 'bg-orange-100 text-orange-700', image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400' },
  { id: 'bakery', name: 'Bakery', color: 'bg-amber-100 text-amber-700', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400' },
  { id: 'personal-care', name: 'Personal Care', color: 'bg-pink-100 text-pink-700', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' },
  { id: 'household', name: 'Household', color: 'bg-purple-100 text-purple-700', image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400' },
];

export const reviews = [
  { id: 1, user: 'Aarav Shah', avatar: 'AS', rating: 5, date: '2026-07-15', comment: 'Absolutely fresh! Delivered within 2 hours. Will order again.' },
  { id: 2, user: 'Priya Nair', avatar: 'PN', rating: 4, date: '2026-07-10', comment: 'Good quality, nicely packed. Slightly expensive but worth it.' },
  { id: 3, user: 'Rohit Verma', avatar: 'RV', rating: 5, date: '2026-07-08', comment: 'Best grocery app. Fresh produce every time!' },
  { id: 4, user: 'Sneha Patil', avatar: 'SP', rating: 3, date: '2026-07-05', comment: 'Decent quality. Packaging could be improved.' },
  { id: 5, user: 'Kiran Joshi', avatar: 'KJ', rating: 4, date: '2026-06-28', comment: 'Prompt delivery and good quality products overall.' },
  { id: 6, user: 'Meera Iyer', avatar: 'MI', rating: 5, date: '2026-06-20', comment: 'Love shopping here. Always fresh and great discounts!' },
];

export const products = [
  // Fruits & Vegetables
  {
    id: 1, name: 'Fresh Alphonso Mangoes', category: 'fruits-vegetables',
    description: 'Premium Devgad Alphonso mangoes, sweet and aromatic. Handpicked from certified farms in Ratnagiri, Maharashtra. Rich in Vitamin C and antioxidants.',
    images: [
      'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600',
      'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600',
    ],
    variants: [
      { id: 'v1a', label: '500g', price: 89, originalPrice: 110, stock: 45 },
      { id: 'v1b', label: '1kg', price: 169, originalPrice: 210, stock: 30 },
      { id: 'v1c', label: '2kg', price: 320, originalPrice: 400, stock: 15 },
    ],
    rating: 4.8, reviewCount: 234, discount: 19, isNew: false, isFeatured: true,
    tags: ['organic', 'fresh', 'seasonal'], reviews: [reviews[0], reviews[2], reviews[5]],
    addedDate: '2026-06-01',
  },
  {
    id: 2, name: 'Organic Spinach Bunch', category: 'fruits-vegetables',
    description: 'Farm-fresh organic spinach, rich in iron and vitamins. Sourced daily from local organic farms. Perfect for salads, smoothies, and curries.',
    images: [
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600',
      'https://images.unsplash.com/photo-1591005698399-c79bbf1c9fc0?w=600',
    ],
    variants: [
      { id: 'v2a', label: '250g', price: 29, originalPrice: 35, stock: 60 },
      { id: 'v2b', label: '500g', price: 55, originalPrice: 65, stock: 40 },
    ],
    rating: 4.5, reviewCount: 118, discount: 15, isNew: false, isFeatured: true,
    tags: ['organic', 'leafy'], reviews: [reviews[1], reviews[3]],
    addedDate: '2026-07-01',
  },
  {
    id: 3, name: 'Red Shimla Capsicum', category: 'fruits-vegetables',
    description: 'Bright red bell peppers imported from Himachal Pradesh. Crisp, sweet and perfect for salads and stir-fries. Rich in Vitamin C.',
    images: ['https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600'],
    variants: [
      { id: 'v3a', label: '3 pieces', price: 49, originalPrice: 60, stock: 25 },
      { id: 'v3b', label: '6 pieces', price: 90, originalPrice: 110, stock: 10 },
    ],
    rating: 4.3, reviewCount: 87, discount: 18, isNew: false, isFeatured: false,
    tags: ['fresh', 'imported'], reviews: [reviews[4]],
    addedDate: '2026-07-15',
  },
  {
    id: 4, name: 'Banana Robusta', category: 'fruits-vegetables',
    description: 'Sweet and ripe Robusta bananas from Tamil Nadu. High in potassium and perfect for breakfast or as a healthy snack.',
    images: ['https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600'],
    variants: [
      { id: 'v4a', label: '6 pcs (~500g)', price: 39, originalPrice: 45, stock: 80 },
      { id: 'v4b', label: '12 pcs (~1kg)', price: 72, originalPrice: 85, stock: 50 },
    ],
    rating: 4.6, reviewCount: 305, discount: 13, isNew: false, isFeatured: true,
    tags: ['fresh', 'everyday'], reviews: [reviews[0], reviews[2]],
    addedDate: '2026-05-15',
  },
  {
    id: 5, name: 'Cherry Tomatoes', category: 'fruits-vegetables',
    description: 'Plump, juicy cherry tomatoes grown in poly-houses. Perfect for salads, pastas and snacking. Low calorie and nutrient-dense.',
    images: ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600'],
    variants: [
      { id: 'v5a', label: '250g punnet', price: 45, originalPrice: 55, stock: 35 },
      { id: 'v5b', label: '500g punnet', price: 85, originalPrice: 100, stock: 20 },
    ],
    rating: 4.4, reviewCount: 156, discount: 15, isNew: true, isFeatured: false,
    tags: ['fresh', 'salad'], reviews: [reviews[1]],
    addedDate: '2026-08-01',
  },

  // Dairy
  {
    id: 6, name: 'Amul Gold Full Cream Milk', category: 'dairy',
    description: 'Amul Gold full cream standardised milk with 6% fat. Pasteurised and homogenised for rich taste and goodness. Best for tea, coffee and sweets.',
    images: [
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600',
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600',
    ],
    variants: [
      { id: 'v6a', label: '500ml', price: 29, originalPrice: 30, stock: 120 },
      { id: 'v6b', label: '1L', price: 56, originalPrice: 60, stock: 90 },
      { id: 'v6c', label: '2L', price: 108, originalPrice: 118, stock: 40 },
    ],
    rating: 4.7, reviewCount: 412, discount: 7, isNew: false, isFeatured: true,
    tags: ['dairy', 'everyday', 'amul'], reviews: [reviews[0], reviews[2], reviews[4]],
    addedDate: '2026-01-10',
  },
  {
    id: 7, name: 'Britannia Cheese Slices', category: 'dairy',
    description: 'Processed cheese slices from Britannia, perfect for sandwiches, burgers and grilled dishes. Made from fresh milk with a creamy texture.',
    images: ['https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600'],
    variants: [
      { id: 'v7a', label: '10 slices (200g)', price: 89, originalPrice: 99, stock: 55 },
      { id: 'v7b', label: '20 slices (400g)', price: 169, originalPrice: 189, stock: 30 },
    ],
    rating: 4.5, reviewCount: 189, discount: 10, isNew: false, isFeatured: false,
    tags: ['dairy', 'cheese', 'britannia'], reviews: [reviews[3], reviews[5]],
    addedDate: '2026-03-15',
  },
  {
    id: 8, name: 'Amul Butter Unsalted', category: 'dairy',
    description: 'Amul unsalted butter made from fresh cream. Perfect for baking, spreading on toast, and cooking. Contains no added salt.',
    images: ['https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600'],
    variants: [
      { id: 'v8a', label: '100g', price: 55, originalPrice: 60, stock: 70 },
      { id: 'v8b', label: '500g', price: 260, originalPrice: 290, stock: 35 },
    ],
    rating: 4.8, reviewCount: 278, discount: 10, isNew: false, isFeatured: true,
    tags: ['dairy', 'baking', 'amul'], reviews: [reviews[0], reviews[1]],
    addedDate: '2026-02-01',
  },
  {
    id: 9, name: 'Mother Dairy Greek Yogurt', category: 'dairy',
    description: 'Thick and creamy Greek yogurt from Mother Dairy. High in protein, probiotic-rich and perfect for smoothies, dips or as a snack.',
    images: ['https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600'],
    variants: [
      { id: 'v9a', label: '400g', price: 69, originalPrice: 80, stock: 45 },
      { id: 'v9b', label: '800g', price: 130, originalPrice: 150, stock: 25 },
    ],
    rating: 4.6, reviewCount: 145, discount: 13, isNew: true, isFeatured: false,
    tags: ['dairy', 'healthy', 'probiotic'], reviews: [reviews[2], reviews[4]],
    addedDate: '2026-07-20',
  },

  // Snacks
  {
    id: 10, name: "Lay's Classic Salted Chips", category: 'snacks',
    description: "Lay's classic potato chips with the perfect amount of salt. Made from fresh potatoes and sunflower oil. Crisp and light, loved by all ages.",
    images: ['https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600'],
    variants: [
      { id: 'v10a', label: '26g (small)', price: 20, originalPrice: 20, stock: 200 },
      { id: 'v10b', label: '52g (medium)', price: 35, originalPrice: 35, stock: 150 },
      { id: 'v10c', label: '90g (large)', price: 55, originalPrice: 60, stock: 80 },
    ],
    rating: 4.3, reviewCount: 521, discount: 0, isNew: false, isFeatured: false,
    tags: ['snacks', 'chips', 'lays'], reviews: [reviews[0], reviews[3]],
    addedDate: '2026-01-05',
  },
  {
    id: 11, name: 'Haldiram Aloo Bhujia', category: 'snacks',
    description: 'Crunchy and spicy aloo bhujia from Haldiram. Made with potato and gram flour, seasoned with traditional spices. A timeless Indian snack.',
    images: ['https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600'],
    variants: [
      { id: 'v11a', label: '150g', price: 49, originalPrice: 55, stock: 90 },
      { id: 'v11b', label: '400g', price: 115, originalPrice: 130, stock: 60 },
    ],
    rating: 4.7, reviewCount: 389, discount: 11, isNew: false, isFeatured: true,
    tags: ['snacks', 'indian', 'haldiram'], reviews: [reviews[2], reviews[5]],
    addedDate: '2026-01-15',
  },
  {
    id: 12, name: 'Britannia Good Day Biscuits', category: 'snacks',
    description: 'Butter-flavoured cashew biscuits from Britannia. Crispy and richly flavoured with real cashews. Perfect tea-time companion.',
    images: ['https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600'],
    variants: [
      { id: 'v12a', label: '87g', price: 30, originalPrice: 35, stock: 120 },
      { id: 'v12b', label: '175g', price: 55, originalPrice: 65, stock: 80 },
    ],
    rating: 4.5, reviewCount: 267, discount: 15, isNew: false, isFeatured: false,
    tags: ['snacks', 'biscuits', 'britannia'], reviews: [reviews[1], reviews[4]],
    addedDate: '2026-02-10',
  },

  // Beverages
  {
    id: 13, name: 'Tropicana Orange Juice', category: 'beverages',
    description: '100% pure squeezed orange juice with no added sugar or preservatives. Packed with Vitamin C. Start your day the healthy way!',
    images: ['https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600'],
    variants: [
      { id: 'v13a', label: '200ml', price: 30, originalPrice: 35, stock: 100 },
      { id: 'v13b', label: '1L', price: 99, originalPrice: 115, stock: 70 },
    ],
    rating: 4.4, reviewCount: 234, discount: 14, isNew: false, isFeatured: true,
    tags: ['beverages', 'juice', 'healthy'], reviews: [reviews[0], reviews[3]],
    addedDate: '2026-03-01',
  },
  {
    id: 14, name: 'Red Bull Energy Drink', category: 'beverages',
    description: 'Red Bull Energy Drink with caffeine, taurine, B vitamins and sugar. Vitalizes body and mind. Perfect for long study sessions or workouts.',
    images: ['https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600'],
    variants: [
      { id: 'v14a', label: '250ml (1 can)', price: 125, originalPrice: 140, stock: 85 },
      { id: 'v14b', label: '250ml x 4', price: 470, originalPrice: 540, stock: 40 },
    ],
    rating: 4.2, reviewCount: 178, discount: 13, isNew: false, isFeatured: false,
    tags: ['beverages', 'energy', 'redbull'], reviews: [reviews[2]],
    addedDate: '2026-04-01',
  },
  {
    id: 15, name: 'Tata Tea Gold', category: 'beverages',
    description: 'Premium CTC tea from Tata with a rich aroma and strong taste. Blend of upper Assam and Darjeeling teas. Perfect for a strong morning cup.',
    images: ['https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600'],
    variants: [
      { id: 'v15a', label: '250g', price: 115, originalPrice: 125, stock: 95 },
      { id: 'v15b', label: '500g', price: 220, originalPrice: 245, stock: 60 },
    ],
    rating: 4.6, reviewCount: 445, discount: 10, isNew: false, isFeatured: true,
    tags: ['beverages', 'tea', 'tata'], reviews: [reviews[4], reviews[5]],
    addedDate: '2026-01-20',
  },
  {
    id: 16, name: 'Bisleri Mineral Water', category: 'beverages',
    description: 'Pure and safe packaged drinking water from Bisleri. Sourced from natural springs and purified through a multi-stage process.',
    images: ['https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600'],
    variants: [
      { id: 'v16a', label: '500ml', price: 20, originalPrice: 20, stock: 300 },
      { id: 'v16b', label: '1L', price: 30, originalPrice: 30, stock: 200 },
      { id: 'v16c', label: '2L', price: 45, originalPrice: 45, stock: 150 },
    ],
    rating: 4.1, reviewCount: 312, discount: 0, isNew: false, isFeatured: false,
    tags: ['beverages', 'water'], reviews: [reviews[0]],
    addedDate: '2026-01-01',
  },

  // Bakery
  {
    id: 17, name: 'Britannia Brown Bread', category: 'bakery',
    description: 'Soft and nutritious brown bread from Britannia baked with whole wheat flour. A healthier alternative to white bread. Rich in dietary fibre.',
    images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600'],
    variants: [
      { id: 'v17a', label: '200g (small)', price: 35, originalPrice: 40, stock: 75 },
      { id: 'v17b', label: '400g (large)', price: 60, originalPrice: 70, stock: 50 },
    ],
    rating: 4.4, reviewCount: 198, discount: 14, isNew: false, isFeatured: false,
    tags: ['bakery', 'bread', 'britannia'], reviews: [reviews[1], reviews[3]],
    addedDate: '2026-03-10',
  },
  {
    id: 18, name: 'Fresh Croissants (Pack of 4)', category: 'bakery',
    description: 'Buttery and flaky fresh-baked croissants made in our central bakery every morning. Deliver to your door within hours of baking.',
    images: ['https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600'],
    variants: [
      { id: 'v18a', label: '4 pcs', price: 149, originalPrice: 180, stock: 30 },
      { id: 'v18b', label: '8 pcs', price: 289, originalPrice: 340, stock: 15 },
    ],
    rating: 4.9, reviewCount: 87, discount: 17, isNew: true, isFeatured: true,
    tags: ['bakery', 'fresh', 'croissant'], reviews: [reviews[0], reviews[5]],
    addedDate: '2026-08-05',
  },
  {
    id: 19, name: 'Khari Biscuits', category: 'bakery',
    description: 'Light and crispy puff pastry khari biscuits, freshly baked. A classic tea-time snack popular across India. Perfect with chai.',
    images: ['https://images.unsplash.com/photo-1587668178277-295251f900ce?w=600'],
    variants: [
      { id: 'v19a', label: '200g', price: 55, originalPrice: 65, stock: 40 },
    ],
    rating: 4.3, reviewCount: 134, discount: 15, isNew: false, isFeatured: false,
    tags: ['bakery', 'puff', 'chai'], reviews: [reviews[2]],
    addedDate: '2026-05-01',
  },

  // Personal Care
  {
    id: 20, name: 'Dove Moisturising Body Wash', category: 'personal-care',
    description: 'Dove nourishing body wash with 1/4 moisturising cream. Gently cleanses and leaves skin feeling soft and smooth. Dermatologist recommended.',
    images: ['https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600'],
    variants: [
      { id: 'v20a', label: '200ml', price: 189, originalPrice: 220, stock: 55 },
      { id: 'v20b', label: '500ml', price: 399, originalPrice: 460, stock: 30 },
    ],
    rating: 4.6, reviewCount: 223, discount: 14, isNew: false, isFeatured: true,
    tags: ['personal-care', 'skincare', 'dove'], reviews: [reviews[1], reviews[4]],
    addedDate: '2026-02-15',
  },
  {
    id: 21, name: 'Colgate Whitening Toothpaste', category: 'personal-care',
    description: 'Colgate Advanced Whitening toothpaste with micro-cleansing crystals. Removes surface stains and whitens teeth. Provides 12-hour protection.',
    images: ['https://images.unsplash.com/photo-1571819795937-af93c3fb2d23?w=600'],
    variants: [
      { id: 'v21a', label: '75ml', price: 65, originalPrice: 75, stock: 85 },
      { id: 'v21b', label: '150ml', price: 115, originalPrice: 130, stock: 65 },
    ],
    rating: 4.4, reviewCount: 312, discount: 12, isNew: false, isFeatured: false,
    tags: ['personal-care', 'oral', 'colgate'], reviews: [reviews[3], reviews[5]],
    addedDate: '2026-01-25',
  },
  {
    id: 22, name: 'Head & Shoulders Shampoo', category: 'personal-care',
    description: 'Anti-dandruff shampoo that gives you 100% dandruff-free hair. Clinically proven formula with ZPT technology. Leaves hair fresh and clean.',
    images: ['https://images.unsplash.com/photo-1597854710056-8e4c3c0a0c01?w=600'],
    variants: [
      { id: 'v22a', label: '180ml', price: 175, originalPrice: 200, stock: 70 },
      { id: 'v22b', label: '360ml', price: 320, originalPrice: 370, stock: 45 },
    ],
    rating: 4.5, reviewCount: 267, discount: 13, isNew: false, isFeatured: false,
    tags: ['personal-care', 'hair', 'h&s'], reviews: [reviews[0], reviews[2]],
    addedDate: '2026-03-20',
  },

  // Household
  {
    id: 23, name: 'Surf Excel Matic Detergent', category: 'household',
    description: 'Surf Excel Matic front load detergent specially formulated for front-load washing machines. Removes tough stains in just 1 wash. Low foam formula.',
    images: ['https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600'],
    variants: [
      { id: 'v23a', label: '1kg', price: 269, originalPrice: 310, stock: 50 },
      { id: 'v23b', label: '3kg', price: 749, originalPrice: 890, stock: 25 },
      { id: 'v23c', label: '6kg', price: 1399, originalPrice: 1700, stock: 10 },
    ],
    rating: 4.7, reviewCount: 398, discount: 18, isNew: false, isFeatured: true,
    tags: ['household', 'laundry', 'surf'], reviews: [reviews[1], reviews[3], reviews[5]],
    addedDate: '2026-02-20',
  },
  {
    id: 24, name: 'Vim Dishwash Bar', category: 'household',
    description: 'Vim dishwash bar with active salt technology. Cuts through grease and food residue quickly. Safe for hands. Extra long lasting.',
    images: ['https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600'],
    variants: [
      { id: 'v24a', label: '200g', price: 30, originalPrice: 35, stock: 100 },
      { id: 'v24b', label: '400g', price: 55, originalPrice: 65, stock: 70 },
    ],
    rating: 4.3, reviewCount: 189, discount: 15, isNew: false, isFeatured: false,
    tags: ['household', 'kitchen', 'vim'], reviews: [reviews[4]],
    addedDate: '2026-03-05',
  },
  {
    id: 25, name: 'Dettol Antiseptic Liquid', category: 'household',
    description: 'Dettol Original antiseptic liquid disinfectant for wound cleansing, bathing, laundry, surface cleaning and personal hygiene.',
    images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600'],
    variants: [
      { id: 'v25a', label: '250ml', price: 110, originalPrice: 125, stock: 80 },
      { id: 'v25b', label: '500ml', price: 199, originalPrice: 230, stock: 55 },
      { id: 'v25c', label: '1L', price: 369, originalPrice: 420, stock: 30 },
    ],
    rating: 4.8, reviewCount: 456, discount: 12, isNew: false, isFeatured: true,
    tags: ['household', 'hygiene', 'dettol'], reviews: [reviews[0], reviews[2], reviews[5]],
    addedDate: '2026-01-15',
  },
];

export const coupons = [
  { code: 'GROZO10', discount: 10, type: 'percentage', minOrder: 200, description: '10% off on orders above Rs.200' },
  { code: 'FRESH50', discount: 50, type: 'flat', minOrder: 500, description: 'Rs.50 off on orders above Rs.500' },
  { code: 'NEWUSER', discount: 15, type: 'percentage', minOrder: 0, description: '15% off for new users' },
  { code: 'SAVE100', discount: 100, type: 'flat', minOrder: 999, description: 'Rs.100 off on orders above Rs.999' },
  { code: 'DAIRY20', discount: 20, type: 'percentage', minOrder: 300, description: '20% off on dairy orders above Rs.300' },
];

export const deliveryOptions = [
  { id: 'express', label: 'Express Delivery', time: '2-3 hours', price: 49 },
  { id: 'standard', label: 'Standard Delivery', time: 'Next day by 10 AM', price: 29 },
  { id: 'scheduled', label: 'Scheduled Delivery', time: 'Pick a slot', price: 19 },
  { id: 'free', label: 'Free Delivery', time: '2-3 days', price: 0, minOrder: 599 },
];

export const sampleOrders = [
  {
    id: 'ORD-7821', date: '2026-08-15', status: 'delivered',
    items: [
      { productId: 1, name: 'Fresh Alphonso Mangoes', variant: '1kg', price: 169, qty: 2, image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=200' },
      { productId: 6, name: 'Amul Gold Full Cream Milk', variant: '1L', price: 56, qty: 3, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200' },
    ],
    subtotal: 506, discount: 50, delivery: 29, tax: 22, total: 507,
    address: { name: 'Aarav Shah', phone: '9876543210', line1: '12, Rose Apartments', line2: 'MG Road', city: 'Bengaluru', state: 'Karnataka', pin: '560001' },
    deliveryMethod: 'Standard Delivery', paymentMethod: 'UPI',
    timeline: [
      { status: 'placed', label: 'Order Placed', time: '2026-08-15 10:30 AM', done: true },
      { status: 'confirmed', label: 'Confirmed', time: '2026-08-15 10:45 AM', done: true },
      { status: 'preparing', label: 'Preparing', time: '2026-08-15 11:15 AM', done: true },
      { status: 'out', label: 'Out for Delivery', time: '2026-08-16 08:00 AM', done: true },
      { status: 'delivered', label: 'Delivered', time: '2026-08-16 09:45 AM', done: true },
    ],
  },
  {
    id: 'ORD-7756', date: '2026-08-10', status: 'out',
    items: [
      { productId: 11, name: 'Haldiram Aloo Bhujia', variant: '400g', price: 115, qty: 1, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200' },
      { productId: 23, name: 'Surf Excel Matic Detergent', variant: '3kg', price: 749, qty: 1, image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=200' },
    ],
    subtotal: 864, discount: 0, delivery: 29, tax: 38, total: 931,
    address: { name: 'Aarav Shah', phone: '9876543210', line1: '12, Rose Apartments', line2: 'MG Road', city: 'Bengaluru', state: 'Karnataka', pin: '560001' },
    deliveryMethod: 'Standard Delivery', paymentMethod: 'Card',
    timeline: [
      { status: 'placed', label: 'Order Placed', time: '2026-08-10 02:00 PM', done: true },
      { status: 'confirmed', label: 'Confirmed', time: '2026-08-10 02:20 PM', done: true },
      { status: 'preparing', label: 'Preparing', time: '2026-08-10 03:00 PM', done: true },
      { status: 'out', label: 'Out for Delivery', time: '2026-08-11 08:30 AM', done: true },
      { status: 'delivered', label: 'Delivered', time: '', done: false },
    ],
  },
];

export const adminStats = {
  totalUsers: 2540,
  totalProducts: 386,
  totalOrders: 1284,
  totalRevenue: 482500,
  dailySales: [
    { day: 'Mon', sales: 12400 },
    { day: 'Tue', sales: 18900 },
    { day: 'Wed', sales: 15600 },
    { day: 'Thu', sales: 22300 },
    { day: 'Fri', sales: 28900 },
    { day: 'Sat', sales: 35600 },
    { day: 'Sun', sales: 31200 },
  ],
  monthlySales: [
    { month: 'Jan', sales: 38000 },
    { month: 'Feb', sales: 42000 },
    { month: 'Mar', sales: 55000 },
    { month: 'Apr', sales: 48000 },
    { month: 'May', sales: 61000 },
    { month: 'Jun', sales: 72000 },
    { month: 'Jul', sales: 68000 },
    { month: 'Aug', sales: 48500 },
  ],
  ordersByStatus: [
    { name: 'Delivered', value: 840, color: '#16a34a' },
    { name: 'Out for Delivery', value: 180, color: '#3b82f6' },
    { name: 'Preparing', value: 124, color: '#f97316' },
    { name: 'Confirmed', value: 98, color: '#8b5cf6' },
    { name: 'Cancelled', value: 42, color: '#ef4444' },
  ],
  topProducts: [
    { name: 'Amul Gold Milk 1L', sales: 1240, revenue: 69440 },
    { name: 'Fresh Alphonso Mangoes', sales: 980, revenue: 165620 },
    { name: 'Surf Excel Detergent 3kg', sales: 720, revenue: 539280 },
    { name: 'Haldiram Aloo Bhujia', sales: 690, revenue: 79350 },
    { name: 'Dettol Antiseptic 500ml', sales: 654, revenue: 130146 },
  ],
};

export const adminUsers = [
  { id: 'u1', name: 'Aarav Shah', email: 'aarav@email.com', phone: '9876543210', orders: 12, spent: 4820, joined: '2026-01-10', status: 'active', role: 'user' },
  { id: 'u2', name: 'Priya Nair', email: 'priya@email.com', phone: '9765432109', orders: 8, spent: 3210, joined: '2026-02-15', status: 'active', role: 'user' },
  { id: 'u3', name: 'Rohit Verma', email: 'rohit@email.com', phone: '9654321098', orders: 23, spent: 9870, joined: '2025-12-01', status: 'active', role: 'user' },
  { id: 'u4', name: 'Sneha Patil', email: 'sneha@email.com', phone: '9543210987', orders: 5, spent: 1540, joined: '2026-04-20', status: 'inactive', role: 'user' },
  { id: 'u5', name: 'Admin User', email: 'admin@grozo.com', phone: '9999999999', orders: 0, spent: 0, joined: '2025-11-01', status: 'active', role: 'admin' },
];

export const adminOrders = [
  { id: 'ORD-7821', user: 'Aarav Shah', date: '2026-08-15', items: 2, total: 507, status: 'delivered', payment: 'UPI' },
  { id: 'ORD-7756', user: 'Aarav Shah', date: '2026-08-10', items: 2, total: 931, status: 'out', payment: 'Card' },
  { id: 'ORD-7698', user: 'Priya Nair', date: '2026-08-08', items: 4, total: 1245, status: 'delivered', payment: 'COD' },
  { id: 'ORD-7645', user: 'Rohit Verma', date: '2026-08-05', items: 1, total: 169, status: 'delivered', payment: 'UPI' },
  { id: 'ORD-7590', user: 'Sneha Patil', date: '2026-08-01', items: 3, total: 678, status: 'cancelled', payment: 'Card' },
  { id: 'ORD-7534', user: 'Rohit Verma', date: '2026-07-28', items: 5, total: 1890, status: 'delivered', payment: 'UPI' },
  { id: 'ORD-7489', user: 'Priya Nair', date: '2026-07-25', items: 2, total: 450, status: 'delivered', payment: 'COD' },
  { id: 'ORD-7423', user: 'Aarav Shah', date: '2026-07-20', items: 6, total: 2345, status: 'delivered', payment: 'Card' },
];
