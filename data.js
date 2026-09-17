/**
 * ServiceHub - Mock Data Store and Backend Simulation Architecture
 */

// BACKEND: Provider database
// In a production app, this data would be fetched from a REST/GraphQL API with spatial indexing (e.g. PostGIS).
export const mockCategories = [
  { id: 'electrician', name: 'Electricians', icon: 'zap', count: '142 Pros', popular: true, color: 'bg-amber-500/10 text-amber-600 border-amber-200' },
  { id: 'plumber', name: 'Plumbers', icon: 'droplet', count: '188 Pros', popular: true, color: 'bg-blue-500/10 text-blue-600 border-blue-200' },
  { id: 'cleaner', name: 'Cleaners', icon: 'sparkles', count: '310 Pros', popular: true, color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200' },
  { id: 'mechanic', name: 'Mechanics', icon: 'wrench', count: '95 Pros', popular: true, color: 'bg-red-500/10 text-red-600 border-red-200' },
  { id: 'tutor', name: 'Tutors', icon: 'book-open', count: '220 Pros', popular: true, color: 'bg-indigo-500/10 text-indigo-600 border-indigo-200' },
  { id: 'designer', name: 'Graphic Designers', icon: 'palette', count: '175 Pros', popular: false, color: 'bg-purple-500/10 text-purple-600 border-purple-200' },
  { id: 'photographer', name: 'Photographers', icon: 'camera', count: '130 Pros', popular: true, color: 'bg-rose-500/10 text-rose-600 border-rose-200' },
  { id: 'repair', name: 'Repair Technicians', icon: 'cpu', count: '115 Pros', popular: true, color: 'bg-cyan-500/10 text-cyan-600 border-cyan-200' },
  { id: 'caterer', name: 'Caterers', icon: 'utensils', count: '80 Pros', popular: false, color: 'bg-orange-500/10 text-orange-600 border-orange-200' },
  { id: 'mover', name: 'Moving Services', icon: 'truck', count: '145 Pros', popular: true, color: 'bg-teal-500/10 text-teal-600 border-teal-200' },
  { id: 'beauty', name: 'Beauty Professionals', icon: 'scissors', count: '260 Pros', popular: true, color: 'bg-pink-500/10 text-pink-600 border-pink-200' }
];

export const mockPromotions = [
  { id: 'p1', title: 'Spring Home Deep Clean', discount: '20% OFF', category: 'cleaner', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80', tag: 'Limited Time' },
  { id: 'p2', title: 'AC & HVAC Maintenance Check', discount: 'Save $45', category: 'repair', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80', tag: 'Seasonal Special' },
  { id: 'p3', title: 'Emergency Plumbing Response', discount: '24/7 Available', category: 'plumber', image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=600&q=80', tag: 'Fast Arrival' }
];

// BACKEND: Geolocation/search API & Provider database
export const mockProviders = [
  {
    id: 'pro-1',
    name: 'Marcus Vance',
    title: 'Master Electrician & Smart Home Specialist',
    profession: 'Electricians',
    categoryId: 'electrician',
    rating: 4.9,
    reviewsCount: 148,
    startingPrice: 65,
    unit: 'hr',
    lat: 37.7749,
    lng: -122.4194,
    distanceKm: 1.2,
    location: 'Downtown, San Francisco, CA',
    verified: true,
    instantBooking: true,
    emergency: true,
    badge: 'Top Rated 2025',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80',
    bio: 'Licensed Master Electrician with 12+ years of experience in commercial and residential electrical installations, breaker panel upgrades, EV charger setups, and smart home automation.',
    responseRate: '98%',
    responseTime: '< 15 mins',
    completedJobs: 320,
    services: [
      { id: 's1', name: 'Breaker Panel Repair & Upgrade', price: 120, duration: '2 hours', description: 'Inspection, troubleshooting, and replacing damaged circuit breakers or upgrading main panel.' },
      { id: 's2', name: 'EV Charger Installation', price: 180, duration: '3 hours', description: 'Level 2 EV charger installation with dedicated circuit setup.' },
      { id: 's3', name: 'Outlet & Light Fixture Replacement', price: 65, duration: '1 hour', description: 'Installation of modern smart switches, dimmers, or lighting fixtures.' },
      { id: 's4', name: 'Emergency Electrical Diagnostics', price: 95, duration: '1 hour', description: 'Immediate 24/7 fault finding and emergency safety isolation.' }
    ],
    portfolio: [
      { image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500&q=80', title: 'Smart Lighting System' },
      { image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=500&q=80', title: 'Main Panel Overhaul' },
      { image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=80', title: 'Tesla Wall Connector' }
    ],
    reviews: [
      { id: 'r1', author: 'Elena Rostova', rating: 5, date: '2 days ago', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80', comment: 'Marcus arrived within 20 minutes when our main breaker tripped during a storm. Extremely professional and courteous!' },
      { id: 'r2', author: 'David Chen', rating: 5, date: '1 week ago', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', comment: 'Installed our EV charger flawlessly. Clean wiring and gave detailed instructions on how to use it.' }
    ]
  },
  {
    id: 'pro-2',
    name: 'Sarah Jenkins',
    title: 'Certified Master Plumber',
    profession: 'Plumbers',
    categoryId: 'plumber',
    rating: 4.95,
    reviewsCount: 210,
    startingPrice: 75,
    unit: 'hr',
    lat: 37.7833,
    lng: -122.4167,
    distanceKm: 2.1,
    location: 'SoMa, San Francisco, CA',
    verified: true,
    instantBooking: true,
    emergency: true,
    badge: 'Pro of the Month',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1000&q=80',
    bio: 'Family-owned plumbing service specializing in leak detection, water heater replacement, pipe repairs, and full bathroom remodels.',
    responseRate: '99%',
    responseTime: '< 10 mins',
    completedJobs: 480,
    services: [
      { id: 's201', name: 'Drain Unclogging & Hydro Jetting', price: 85, duration: '1 hour', description: 'Clearing persistent drain blockages using advanced video camera diagnostic and jetting.' },
      { id: 's202', name: 'Tankless Water Heater Installation', price: 250, duration: '4 hours', description: 'Complete installation or replacement of tankless hot water units.' },
      { id: 's203', name: 'Emergency Leak Repair', price: 95, duration: '1 hour', description: 'Fast pipe leak sealing and pressure restoration.' }
    ],
    portfolio: [
      { image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=500&q=80', title: 'Luxury Bathroom Plumbing' },
      { image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=500&q=80', title: 'Tankless System' }
    ],
    reviews: [
      { id: 'r201', author: 'Michael Scott', rating: 5, date: 'Yesterday', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', comment: 'Sarah saved our weekend! Fixed a severe sink backup in under an hour.' }
    ]
  },
  {
    id: 'pro-3',
    name: 'SparklePro Eco Cleaning',
    title: 'Eco-Friendly Residential & Deep Cleaning',
    profession: 'Cleaners',
    categoryId: 'cleaner',
    rating: 4.88,
    reviewsCount: 320,
    startingPrice: 45,
    unit: 'hr',
    lat: 37.7651,
    lng: -122.4242,
    distanceKm: 3.5,
    location: 'Mission District, San Francisco, CA',
    verified: true,
    instantBooking: true,
    emergency: false,
    badge: 'Eco Certified',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80',
    bio: 'Premium 100% non-toxic eco cleaning service for apartments, family homes, and post-construction spaces. All staff background checked and insured.',
    responseRate: '95%',
    responseTime: '< 30 mins',
    completedJobs: 650,
    services: [
      { id: 's301', name: 'Standard Home Cleaning (2 Beds / 2 Baths)', price: 120, duration: '2.5 hours', description: 'Dusting, vacuuming, floor mopping, kitchen sanitize, and bathroom scrub.' },
      { id: 's302', name: 'Deep Moving In/Out Cleaning', price: 210, duration: '4 hours', description: 'Comprehensive detailed cleaning inside appliances, cabinets, baseboards, and window sills.' }
    ],
    portfolio: [
      { image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=500&q=80', title: 'Modern Living Room Deep Clean' }
    ],
    reviews: [
      { id: 'r301', author: 'Jessica Alba', rating: 5, date: '3 days ago', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80', comment: 'House smells fresh without harsh chemicals. SparklePro is our go-to now.' }
    ]
  },
  {
    id: 'pro-4',
    name: 'Carlos Mendez',
    title: 'Mobile Automotive Technician & Diagnostics',
    profession: 'Mechanics',
    categoryId: 'mechanic',
    rating: 4.82,
    reviewsCount: 94,
    startingPrice: 70,
    unit: 'hr',
    lat: 37.7510,
    lng: -122.4180,
    distanceKm: 4.8,
    location: 'Potrero Hill, San Francisco, CA',
    verified: true,
    instantBooking: false,
    emergency: true,
    badge: 'Mobile Service',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1000&q=80',
    bio: 'ASE-certified mechanic who comes straight to your home or office driveway. Brake replacements, battery jumps, oil service, OBD diagnostics.',
    responseRate: '92%',
    responseTime: '< 20 mins',
    completedJobs: 180,
    services: [
      { id: 's401', name: 'Full Synthetic Oil & Filter Change', price: 75, duration: '45 mins', description: 'On-site mobile oil change including fluid top-ups and tire pressure check.' },
      { id: 's402', name: 'Brake Pad & Rotor Replacement', price: 160, duration: '2 hours', description: 'Front or rear brake pad set installation with safety check.' }
    ],
    portfolio: [
      { image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=500&q=80', title: 'Driveway Repair Service' }
    ],
    reviews: [
      { id: 'r401', author: 'Tom Hardy', rating: 5, date: '1 week ago', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80', comment: 'Fixed my brakes right in my driveway while I worked from home. Super convenient!' }
    ]
  },
  {
    id: 'pro-5',
    name: 'Dr. Emily Watson',
    title: 'STEM & Test Prep Specialist (Math, Physics, SAT)',
    profession: 'Tutors',
    categoryId: 'tutor',
    rating: 4.98,
    reviewsCount: 165,
    startingPrice: 55,
    unit: 'hr',
    lat: 37.7892,
    lng: -122.4014,
    distanceKm: 0.8,
    location: 'Financial District, San Francisco, CA',
    verified: true,
    instantBooking: true,
    emergency: false,
    badge: 'Stanford PhD',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=80',
    bio: 'PhD graduate with 8+ years tutoring high school and college students in Calculus, Physics, Coding (Python/JS), and standardized test preparation.',
    responseRate: '100%',
    responseTime: '< 10 mins',
    completedJobs: 410,
    services: [
      { id: 's501', name: '1-on-1 High School Math / AP Calculus', price: 55, duration: '1 hour', description: 'Customized lesson, homework aid, and exam review.' },
      { id: 's502', name: 'SAT / ACT Intensive Coaching', price: 70, duration: '1.5 hours', description: 'Targeted practice strategies and test section analysis.' }
    ],
    portfolio: [
      { image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=500&q=80', title: 'Interactive Online & In-Person Sessions' }
    ],
    reviews: [
      { id: 'r501', author: 'Karen Gillan', rating: 5, date: '5 days ago', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80', comment: 'Emily raised my daughter’s SAT Math score by 140 points in just 6 weeks!' }
    ]
  },
  {
    id: 'pro-6',
    name: 'Alex Rivera',
    title: 'Brand Designer & UI/UX Specialist',
    profession: 'Graphic Designers',
    categoryId: 'designer',
    rating: 4.92,
    reviewsCount: 88,
    startingPrice: 60,
    unit: 'hr',
    lat: 37.7711,
    lng: -122.4340,
    distanceKm: 2.8,
    location: 'Hayes Valley, San Francisco, CA',
    verified: true,
    instantBooking: true,
    emergency: false,
    badge: 'Design Awardee',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
    bio: 'Crafting memorable visual identities, logos, pitch decks, and digital products for startups and local businesses.',
    responseRate: '96%',
    responseTime: '< 30 mins',
    completedJobs: 135,
    services: [
      { id: 's601', name: 'Brand Identity Package (Logo, Colors, Fonts)', price: 450, duration: '3 days', description: 'Complete brand guide, vector logo assets, and social media kit.' },
      { id: 's602', name: 'Website Landing Page Design (Figma)', price: 300, duration: '2 days', description: 'High-fidelity responsive web layout design in Figma.' }
    ],
    portfolio: [
      { image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=500&q=80', title: 'Brand Guidelines Work' }
    ],
    reviews: [
      { id: 'r601', author: 'Liam Hemsworth', rating: 5, date: '2 weeks ago', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', comment: 'Alex turned around our corporate pitch deck in 48 hours. Clean, sharp, modern.' }
    ]
  },
  {
    id: 'pro-7',
    name: 'Maya Lin Photography',
    title: 'Portrait, Event & Commercial Photographer',
    profession: 'Photographers',
    categoryId: 'photographer',
    rating: 4.96,
    reviewsCount: 112,
    startingPrice: 120,
    unit: 'hr',
    lat: 37.8024,
    lng: -122.4058,
    distanceKm: 3.1,
    location: 'North Beach, San Francisco, CA',
    verified: true,
    instantBooking: false,
    emergency: false,
    badge: 'Pro Photographer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1000&q=80',
    bio: 'Professional photographer capturing corporate headshots, weddings, real estate properties, and high-energy private events.',
    responseRate: '97%',
    responseTime: '< 20 mins',
    completedJobs: 210,
    services: [
      { id: 's701', name: 'Executive Portrait / Headshot Session', price: 150, duration: '1 hour', description: 'Studio or outdoor shoot with 5 retouched high-res images.' },
      { id: 's702', name: 'Event Coverage (Corporate/Private)', price: 350, duration: '3 hours', description: 'Full event photography with online gallery delivery within 48 hours.' }
    ],
    portfolio: [
      { image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=500&q=80', title: 'Wedding Reception' },
      { image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=500&q=80', title: 'Studio Headshot' }
    ],
    reviews: [
      { id: 'r701', author: 'Sophia Turner', rating: 5, date: '4 days ago', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80', comment: 'Maya took our company headshots. Everyone loved how relaxed and natural she made them look.' }
    ]
  },
  {
    id: 'pro-8',
    name: 'Haul & Move Express',
    title: 'Full-Service Local Moving & Furniture Transport',
    profession: 'Moving Services',
    categoryId: 'mover',
    rating: 4.85,
    reviewsCount: 175,
    startingPrice: 90,
    unit: 'hr',
    lat: 37.7600,
    lng: -122.4100,
    distanceKm: 3.8,
    location: 'Dogpatch, San Francisco, CA',
    verified: true,
    instantBooking: true,
    emergency: true,
    badge: 'Insured & Bonded',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    bio: 'Reliable moving crew equipped with 16ft and 24ft box trucks, dollies, protective pads, and insurance. Apartment, home, and single item moves.',
    responseRate: '94%',
    responseTime: '< 15 mins',
    completedJobs: 390,
    services: [
      { id: 's801', name: '2 Movers + 16ft Truck Package', price: 110, duration: 'Hourly (Min 2 hrs)', description: 'Loading, transport, unloading, and furniture wrapping included.' },
      { id: 's802', name: 'Heavy Appliance / Furniture Single Pick-Up', price: 90, duration: '1 hour', description: 'Pick up and delivery of single bulky items (sofa, fridge, piano).' }
    ],
    portfolio: [
      { image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80', title: 'Moving Truck & Crew' }
    ],
    reviews: [
      { id: 'r801', author: 'Brian Cox', rating: 5, date: '1 week ago', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', comment: 'Moved my 2-bedroom apartment with no scratches or dents. Efficient and hard working guys.' }
    ]
  }
];

// BACKEND: Customer Bookings API
export const initialBookings = [
  {
    id: 'BK-1002',
    providerId: 'pro-1',
    providerName: 'Marcus Vance',
    providerProfession: 'Electrician',
    providerAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    serviceName: 'Breaker Panel Repair & Upgrade',
    date: '2025-05-20',
    time: '10:00 AM',
    status: 'Confirmed',
    totalPrice: 135,
    address: '742 Market Street, Apt 4B, San Francisco, CA',
    notes: 'Main panel keeps buzzing when air conditioner starts up.',
    createdAt: '2025-05-15'
  },
  {
    id: 'BK-0988',
    providerId: 'pro-3',
    providerName: 'SparklePro Eco Cleaning',
    providerProfession: 'Cleaner',
    providerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    serviceName: 'Standard Home Cleaning (2 Beds / 2 Baths)',
    date: '2025-04-28',
    time: '02:00 PM',
    status: 'Completed',
    totalPrice: 132,
    address: '742 Market Street, Apt 4B, San Francisco, CA',
    notes: 'Key left under door mat. Please pay special attention to master bath.',
    createdAt: '2025-04-25'
  }
];

// BACKEND: Provider-side incoming requests & schedule
export const initialProviderRequests = [
  {
    id: 'REQ-301',
    customerName: 'Rachel Green',
    customerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
    serviceName: 'EV Charger Installation',
    date: '2025-05-22',
    time: '09:00 AM',
    address: '120 Post St, San Francisco, CA',
    price: 180,
    status: 'Pending',
    notes: 'Tesla Wall Connector already unboxed in garage.'
  },
  {
    id: 'REQ-302',
    customerName: 'Ethan Hunt',
    customerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80',
    serviceName: 'Outlet & Light Fixture Replacement',
    date: '2025-05-23',
    time: '01:30 PM',
    address: '450 Geary St, San Francisco, CA',
    price: 65,
    status: 'Pending',
    notes: 'Need dimmers installed in 3 bedrooms.'
  }
];

// BACKEND: Real-time messaging
export const initialMessages = [
  {
    id: 'msg-1',
    contactId: 'pro-1',
    contactName: 'Marcus Vance',
    contactAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80',
    unread: false,
    history: [
      { sender: 'pro', text: 'Hi! I received your booking for May 20th. Do you know the brand of your electrical panel?', time: '10:15 AM' },
      { sender: 'user', text: 'Hi Marcus! Yes, it’s a Square D panel installed around 2012.', time: '10:18 AM' },
      { sender: 'pro', text: 'Great, thanks! I will bring matching breakers with me.', time: '10:20 AM' }
    ]
  },
  {
    id: 'msg-2',
    contactId: 'pro-2',
    contactName: 'Sarah Jenkins',
    contactAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
    unread: true,
    history: [
      { sender: 'pro', text: 'Hello! Let me know if you need any advice on tankless heater models.', time: 'Yesterday' }
    ]
  }
];

// BACKEND: Notifications API
export const initialNotifications = [
  { id: 'n1', title: 'Booking Confirmed', text: 'Marcus Vance accepted your electrical inspection for May 20th.', time: '10 mins ago', read: false },
  { id: 'n2', title: 'Special Promo Claimed', text: 'You unlocked 20% off your next eco deep cleaning!', time: '2 hours ago', read: false },
  { id: 'n3', title: 'Review Request', text: 'How was your experience with SparklePro Eco Cleaning?', time: '1 day ago', read: true }
];
