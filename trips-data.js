const tripsData = {

  "dal-lake": {
    name: "Dal Lake, Srinagar",
    title: "DAL LAKE",
    price: "₹18,900",
    heroImage: "public/dal lake.png",
    images: ["public/dal lake.png", "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=600&q=80", "https://images.unsplash.com/photo-1531761535209-180857e963b9?w=400&q=80"],
    description: "Experience the magic of Kashmir's crown jewel — Dal Lake. Float on a traditional shikara through lotus gardens and floating vegetable markets, stay in a heritage houseboat, and wake up to the Himalayas reflected in still waters. This curated Srinagar getaway blends the romance of the lake with the warmth of Kashmiri hospitality, covering houseboat stays, shikara rides, Mughal garden visits, and guided city tours.",
    duration: "4 NIGHTS, 5 DAYS",
    type: "Group / FIT",
    location: "Srinagar, Kashmir",
    category: "North Indian Destinations",
    groupSize: "Unlimited",
    minAge: "All Ages",
    destinations: "SRINAGAR · DAL LAKE · MUGHAL GARDENS",
    days: [
      { day: "Day 1: ARRIVAL IN SRINAGAR", detail: "Pickup from Srinagar Airport, check-in to houseboat on Dal Lake. Evening shikara ride on the lake. Welcome Kashmiri dinner on board." },
      { day: "Day 2: DAL LAKE & MUGHAL GARDENS", detail: "Morning shikara ride through floating markets. Visit Nishat Bagh, Shalimar Bagh, and Chashme Shahi gardens. Evening free on the lake." },
      { day: "Day 3: SRINAGAR CITY TOUR", detail: "Visit Shankaracharya Temple, Hazratbal Shrine, and the old city bazaars. Explore Lal Chowk and local handicraft shops." },
      { day: "Day 4: LEISURE & LOCAL EXPERIENCES", detail: "Optional cooking class, carpet weaving demonstration, or a relaxed morning on the houseboat. Afternoon at leisure." },
      { day: "Day 5: DEPARTURE", detail: "Breakfast on the houseboat. Transfer to Srinagar Airport for your onward journey. Tour ends with warm memories." }
    ],
    included: ["Houseboat accommodation (3 nights) + hotel (1 night)", "Daily breakfast & dinner", "Shikara ride on Dal Lake", "All Mughal garden entry tickets", "Airport transfers", "Local sightseeing as per itinerary", "All applicable taxes"],
    excluded: ["Flight tickets", "Personal expenses", "Lunch", "Camera charges at monuments", "Any services not listed above"]
  },

  "gulmarg": {
    name: "Gulmarg",
    title: "GULMARG",
    price: "₹16,900",
    heroImage: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&q=80",
    images: ["https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=400&q=80"],
    description: "Nestled at 2,650 metres in the Pir Panjal range, Gulmarg — the 'Meadow of Flowers' — is Kashmir's premier hill resort. Famous for Asia's highest gondola ride, world-class skiing in winter, and lush green meadows in summer, this package takes you through breathtaking alpine scenery, snow-capped peaks, and the serene Alpather Lake. Perfect for adventure seekers and nature lovers alike.",
    duration: "3 NIGHTS, 4 DAYS",
    type: "Group / FIT",
    location: "Gulmarg, Kashmir",
    category: "North Indian Destinations",
    groupSize: "Unlimited",
    minAge: "All Ages",
    destinations: "SRINAGAR · GULMARG · ALPATHER LAKE",
    days: [
      { day: "Day 1: SRINAGAR TO GULMARG", detail: "Pickup from Srinagar, drive to Gulmarg (56 km). Check-in to hotel. Evening walk in the meadows. Overnight stay." },
      { day: "Day 2: GONDOLA RIDE & ALPATHER LAKE", detail: "Morning Gondola ride to Kongdori (Phase 1 & 2). Trek to Alpather Lake. Enjoy snow activities (seasonal). Return to hotel." },
      { day: "Day 3: GULMARG MEADOWS & BIOSPHERE", detail: "Explore the Gulmarg Biosphere Reserve. Horse riding in the meadows. Visit St. Mary's Church and the golf course area." },
      { day: "Day 4: RETURN TO SRINAGAR & DEPARTURE", detail: "Breakfast at hotel. Drive back to Srinagar. Airport/railway station drop. Tour ends." }
    ],
    included: ["Hotel accommodation (3 nights)", "Daily breakfast & dinner", "Gondola ride (Phase 1)", "Srinagar–Gulmarg–Srinagar transfers", "Local sightseeing", "All applicable taxes"],
    excluded: ["Gondola Phase 2 ticket", "Horse riding charges", "Flight tickets", "Personal expenses", "Lunch", "Any services not listed above"]
  },

  "pahalgam": {
    name: "Pahalgam",
    title: "PAHALGAM",
    price: "₹14,900",
    heroImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80", "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80"],
    description: "Known as the 'Valley of Shepherds', Pahalgam sits at the confluence of the Lidder River and streams from Sheshnag Lake. This enchanting destination offers pine forests, alpine meadows, and the famous Betaab Valley and Aru Valley. Whether you're trekking to Baisaran, rafting on the Lidder, or simply breathing in the crisp mountain air, Pahalgam promises a deeply refreshing escape.",
    duration: "3 NIGHTS, 4 DAYS",
    type: "Group / FIT",
    location: "Pahalgam, Kashmir",
    category: "North Indian Destinations",
    groupSize: "Unlimited",
    minAge: "All Ages",
    destinations: "SRINAGAR · PAHALGAM · BETAAB VALLEY · ARU VALLEY",
    days: [
      { day: "Day 1: SRINAGAR TO PAHALGAM", detail: "Pickup from Srinagar, scenic drive to Pahalgam (95 km) via Awantipora ruins. Check-in to hotel on the Lidder River bank." },
      { day: "Day 2: BETAAB VALLEY & ARU VALLEY", detail: "Visit Betaab Valley, Chandanwari, and Aru Valley. Enjoy the meadows and river views." },
      { day: "Day 3: BAISARAN & LIDDER RIVER", detail: "Pony ride or trek to Baisaran (mini Switzerland of Kashmir). Afternoon river rafting on the Lidder (optional). Evening at leisure." },
      { day: "Day 4: RETURN & DEPARTURE", detail: "Breakfast at hotel. Drive back to Srinagar. Airport/station drop. Tour ends." }
    ],
    included: ["Hotel accommodation (3 nights)", "Daily breakfast & dinner", "Srinagar–Pahalgam–Srinagar transfers", "Betaab Valley & Aru Valley sightseeing", "All applicable taxes"],
    excluded: ["Pony/horse riding charges", "River rafting charges", "Flight tickets", "Personal expenses", "Lunch", "Any services not listed above"]
  },

  "sonamarg": {
    name: "Sonamarg",
    title: "SONAMARG",
    price: "₹12,900",
    heroImage: "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=1200&q=80",
    images: ["https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=600&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", "https://images.unsplash.com/photo-1531761535209-180857e963b9?w=400&q=80"],
    description: "Sonamarg, the 'Meadow of Gold', is a high-altitude paradise at 2,800 metres on the Srinagar–Leh highway. Surrounded by glaciers, alpine lakes, and snow-capped peaks, it is the gateway to the famous Thajiwas Glacier. This short but spectacular trip is perfect for those seeking raw Himalayan beauty, glacier walks, and the thrill of high-altitude meadows.",
    duration: "2 NIGHTS, 3 DAYS",
    type: "Group / FIT",
    location: "Sonamarg, Kashmir",
    category: "North Indian Destinations",
    groupSize: "Unlimited",
    minAge: "All Ages",
    destinations: "SRINAGAR · SONAMARG · THAJIWAS GLACIER",
    days: [
      { day: "Day 1: SRINAGAR TO SONAMARG", detail: "Pickup from Srinagar, drive to Sonamarg (87 km) through the scenic Sindh Valley. Check-in to hotel. Evening walk in the meadows." },
      { day: "Day 2: THAJIWAS GLACIER", detail: "Morning pony ride or trek to Thajiwas Glacier. Snow activities on the glacier. Optional trek towards Vishansar Lake. Return to hotel." },
      { day: "Day 3: RETURN & DEPARTURE", detail: "Breakfast at hotel. Scenic drive back to Srinagar. Airport/station drop. Tour ends." }
    ],
    included: ["Hotel accommodation (2 nights)", "Daily breakfast & dinner", "Srinagar–Sonamarg–Srinagar transfers", "Local sightseeing", "All applicable taxes"],
    excluded: ["Pony/horse riding charges", "Snow activity charges", "Flight tickets", "Personal expenses", "Lunch", "Any services not listed above"]
  },

  "betaab-valley": {
    name: "Betaab Valley",
    title: "BETAAB VALLEY",
    price: "₹11,900",
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80",
    images: ["https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80"],
    description: "Named after the 1983 Bollywood blockbuster filmed here, Betaab Valley is one of Kashmir's most picturesque destinations. Located just 15 km from Pahalgam, this lush green valley is framed by snow-capped mountains, dense pine forests, and the crystal-clear Lidder River. A perfect short escape for nature lovers, couples, and families looking for scenic beauty without the crowds.",
    duration: "2 NIGHTS, 3 DAYS",
    type: "Group / FIT",
    location: "Betaab Valley, Pahalgam, Kashmir",
    category: "North Indian Destinations",
    groupSize: "Unlimited",
    minAge: "All Ages",
    destinations: "SRINAGAR · PAHALGAM · BETAAB VALLEY · CHANDANWARI",
    days: [
      { day: "Day 1: SRINAGAR TO PAHALGAM", detail: "Pickup from Srinagar, drive to Pahalgam. Check-in to hotel. Evening walk along the Lidder River." },
      { day: "Day 2: BETAAB VALLEY & CHANDANWARI", detail: "Full day excursion to Betaab Valley and Chandanwari. Enjoy the meadows, river, and mountain views. Photography stops en route." },
      { day: "Day 3: RETURN & DEPARTURE", detail: "Breakfast at hotel. Drive back to Srinagar. Airport/station drop. Tour ends." }
    ],
    included: ["Hotel accommodation (2 nights)", "Daily breakfast & dinner", "Srinagar–Pahalgam–Srinagar transfers", "Betaab Valley entry & sightseeing", "All applicable taxes"],
    excluded: ["Pony/horse riding charges", "Flight tickets", "Personal expenses", "Lunch", "Any services not listed above"]
  },

  "tulip-garden": {
    name: "Tulip Garden, Srinagar",
    title: "TULIP GARDEN",
    price: "₹17,900",
    heroImage: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=1200&q=80",
    images: ["https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=600&q=80", "public/dal lake.png", "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=400&q=80"],
    description: "Asia's largest tulip garden, spread across 30 hectares on the foothills of the Zabarwan Range overlooking Dal Lake, bursts into a riot of colour every spring (March–April). This special package is timed for the annual Tulip Festival, combining the garden's million blooms with Srinagar's iconic houseboats, Mughal gardens, and shikara rides for an unforgettable floral Kashmir experience.",
    duration: "4 NIGHTS, 5 DAYS",
    type: "Group / FIT",
    location: "Srinagar, Kashmir",
    category: "North Indian Destinations",
    groupSize: "Unlimited",
    minAge: "All Ages",
    destinations: "SRINAGAR · TULIP GARDEN · DAL LAKE · MUGHAL GARDENS",
    days: [
      { day: "Day 1: ARRIVAL IN SRINAGAR", detail: "Pickup from airport. Check-in to houseboat on Dal Lake. Evening shikara ride. Welcome dinner." },
      { day: "Day 2: TULIP GARDEN & NISHAT BAGH", detail: "Morning visit to the Indira Gandhi Memorial Tulip Garden. Afternoon at Nishat Bagh and Shalimar Bagh. Photography session." },
      { day: "Day 3: SRINAGAR CITY TOUR", detail: "Visit Shankaracharya Temple, Hazratbal Shrine, and Lal Chowk bazaars. Explore Kashmiri handicrafts and papier-mâché shops." },
      { day: "Day 4: CHASHME SHAHI & PARI MAHAL", detail: "Visit Chashme Shahi (Royal Spring) and Pari Mahal (Palace of Fairies) with panoramic Dal Lake views. Leisure evening on the lake." },
      { day: "Day 5: DEPARTURE", detail: "Breakfast on houseboat. Transfer to Srinagar Airport. Tour ends." }
    ],
    included: ["Houseboat accommodation (3 nights) + hotel (1 night)", "Daily breakfast & dinner", "Tulip Garden entry tickets", "All Mughal garden entries", "Shikara ride", "Airport transfers", "All applicable taxes"],
    excluded: ["Flight tickets", "Personal expenses", "Lunch", "Camera charges", "Any services not listed above"]
  },

  "yusmarg": {
    name: "Yusmarg",
    title: "YUSMARG",
    price: "₹10,900",
    heroImage: "https://images.unsplash.com/photo-1531761535209-180857e963b9?w=1200&q=80",
    images: ["https://images.unsplash.com/photo-1531761535209-180857e963b9?w=600&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=400&q=80"],
    description: "Yusmarg, meaning 'Meadow of Jesus', is an unspoiled alpine meadow 47 km from Srinagar, far from the tourist crowds. Surrounded by dense pine and fir forests, wildflower meadows, and the Doodhganga River, it offers a peaceful retreat into nature. This off-the-beaten-path package is ideal for those seeking solitude, gentle treks, and authentic Kashmiri village life.",
    duration: "2 NIGHTS, 3 DAYS",
    type: "Group / FIT",
    location: "Yusmarg, Kashmir",
    category: "North Indian Destinations",
    groupSize: "Unlimited",
    minAge: "All Ages",
    destinations: "SRINAGAR · YUSMARG · DOODHGANGA RIVER",
    days: [
      { day: "Day 1: SRINAGAR TO YUSMARG", detail: "Pickup from Srinagar, drive to Yusmarg (47 km) through pine forests. Check-in to guesthouse. Evening walk in the meadows." },
      { day: "Day 2: MEADOWS & NILNAG LAKE TREK", detail: "Morning trek to Nilnag Lake through alpine meadows. Picnic lunch in the meadows. Afternoon horse riding. Evening bonfire." },
      { day: "Day 3: RETURN & DEPARTURE", detail: "Breakfast at guesthouse. Drive back to Srinagar. Airport/station drop. Tour ends." }
    ],
    included: ["Guesthouse accommodation (2 nights)", "Daily breakfast & dinner", "Srinagar–Yusmarg–Srinagar transfers", "Local guide", "All applicable taxes"],
    excluded: ["Horse riding charges", "Flight tickets", "Personal expenses", "Lunch", "Any services not listed above"]
  },

  "wular-lake": {
    name: "Wular Lake",
    title: "WULAR LAKE",
    price: "₹13,900",
    heroImage: "https://images.unsplash.com/photo-1519922639192-e73293ca430e?w=1200&q=80",
    images: ["https://images.unsplash.com/photo-1519922639192-e73293ca430e?w=600&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80"],
    description: "Wular Lake, Asia's largest freshwater lake, stretches across 200 sq km in the Bandipora district of Kashmir. Surrounded by the Himalayas and fed by the Jhelum River, it is a haven for migratory birds, local fishermen, and nature lovers. This unique package combines the tranquility of Wular with visits to the historic Zaina Lanka island, local fishing villages, and the scenic Manasbal Lake.",
    duration: "3 NIGHTS, 4 DAYS",
    type: "Group / FIT",
    location: "Bandipora, Kashmir",
    category: "North Indian Destinations",
    groupSize: "Unlimited",
    minAge: "All Ages",
    destinations: "SRINAGAR · WULAR LAKE · MANASBAL LAKE · BANDIPORA",
    days: [
      { day: "Day 1: SRINAGAR TO WULAR LAKE", detail: "Pickup from Srinagar, drive to Bandipora (60 km). Check-in to lakeside guesthouse. Evening boat ride on Wular Lake." },
      { day: "Day 2: WULAR LAKE EXPLORATION", detail: "Morning boat trip to Zaina Lanka island. Visit local fishing villages. Birdwatching (migratory birds in season). Afternoon at leisure." },
      { day: "Day 3: MANASBAL LAKE & SHADIPUR", detail: "Day trip to Manasbal Lake (Kashmir's deepest lake). Visit Shadipur confluence of Jhelum and Sindh rivers. Return to guesthouse." },
      { day: "Day 4: RETURN & DEPARTURE", detail: "Breakfast at guesthouse. Drive back to Srinagar. Airport/station drop. Tour ends." }
    ],
    included: ["Guesthouse accommodation (3 nights)", "Daily breakfast & dinner", "Boat rides on Wular & Manasbal lakes", "Srinagar–Bandipora–Srinagar transfers", "Local guide", "All applicable taxes"],
    excluded: ["Flight tickets", "Personal expenses", "Lunch", "Camera charges", "Any services not listed above"]
  }

};
