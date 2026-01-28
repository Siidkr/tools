import { SheetData } from './types';

export const INITIAL_SHEETS: SheetData[] = [
  // --- SHEET 1: FRONT COVER & INTRO ---
  {
    front: {
      id: 'cover-front',
      pageNumber: 0,
      layout: 'cover',
      bgColor: 'bg-[#9f1239]', 
      photos: [
        { id: 'c1', url: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?q=80&w=1000&auto=format&fit=crop', rotation: 0 }
      ],
      text: "Our Story",
      subText: "Volume I: The Beginning",
      stickers: []
    },
    back: {
      id: 'p1',
      pageNumber: 1,
      layout: 'text-focus',
      bgColor: 'bg-[#fff1f2]', // Rose-50
      pattern: 'hearts',
      photos: [],
      text: "Welcome to our memory lane. This is a collection of the moments that make my heart smile. Every page is a chapter of us.",
      stickers: [
         { id: 's3', type: 'tape', x: 50, y: 5, rotation: 0, scale: 1 },
         { id: 's_intro', type: 'letter', x: 45, y: 75, rotation: 5, scale: 1.3 },
         { id: 's_kiss', type: 'lips', content: '', x: 80, y: 20, rotation: 15, scale: 1.2 }
      ]
    }
  },

  // --- SHEET 2: FIRST DATES ---
  {
    front: {
      id: 'p2',
      pageNumber: 2,
      layout: 'collage',
      pattern: 'dots',
      bgColor: 'bg-white',
      photos: [
        { id: 'p2_1', url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=800&auto=format&fit=crop', rotation: 4, caption: "First Date" },
        { id: 'p2_2', url: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=800&auto=format&fit=crop', rotation: -3, caption: "Nervous!" }
      ],
      stickers: [
        { id: 's5', type: 'rose', content: '', x: 8, y: 12, rotation: -25, scale: 1.1 },
        { id: 's_ticket', type: 'ticket', x: 20, y: 85, rotation: 10, scale: 1.2 }
      ]
    },
    back: {
      id: 'p3',
      pageNumber: 3,
      layout: 'single-photo',
      bgColor: 'bg-[#fff0f5]',
      pattern: 'grid',
      photos: [
         { id: 'p3_1', url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800&auto=format&fit=crop', rotation: 2, caption: "Your smile <3" }
      ],
      text: "I knew you were special the moment I saw you laugh.",
      stickers: [
        // Replaced butterfly with Lily (bow)
        { id: 's_lily1', type: 'bow', x: 85, y: 15, rotation: 15, scale: 1.1 }
      ]
    }
  },

  // --- SHEET 3: FOOD & COFFEE DATES ---
  {
    front: {
      id: 'p4',
      pageNumber: 4,
      layout: 'multi-photo',
      bgColor: 'bg-[#fffbeb]', // Amber-50
      pattern: 'dots',
      photos: [
        { id: 'p4_1', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop', rotation: -2, caption: "Brunch!" },
        { id: 'p4_2', url: 'https://images.unsplash.com/photo-1595928607842-46c5753f8eb9?q=80&w=800&auto=format&fit=crop', rotation: 3, caption: "Latte Art" }
      ],
      stickers: [
        // Replaced Coffee emoji with Sunflower
        { id: 's_sunflower_coffee', type: 'flower', x: 85, y: 10, rotation: 15, scale: 1 },
        { id: 's_swirl_new', type: 'swirl', x: 10, y: 80, rotation: 0, scale: 1.2 }
      ]
    },
    back: {
      id: 'p5',
      pageNumber: 5,
      layout: 'text-focus',
      bgColor: 'bg-white',
      pattern: 'none',
      photos: [],
      text: "We might have spent too much money on coffee, but every sip and every conversation was worth it.",
      stickers: [
        // Replaced Donut emoji with Daisy (star)
        { id: 's_daisy_food', type: 'star', x: 50, y: 80, rotation: 0, scale: 1.5 },
        { id: 's_tape_food', type: 'tape', x: 50, y: 5, rotation: -2, scale: 1 }
      ]
    }
  },

  // --- SHEET 4: ADVENTURES & TRAVEL ---
  {
    front: {
      id: 'p6',
      pageNumber: 6,
      layout: 'single-photo',
      bgColor: 'bg-[#eff6ff]', // Blue-50
      pattern: 'grid',
      photos: [
        { id: 'p6_1', url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop', rotation: -4, caption: "Let's Go!" }
      ],
      text: "Adventure awaits! Packing our bags and getting lost together.",
      stickers: [
        // Replaced Plane emoji with Lavender (swirl)
        { id: 's_lavender_travel', type: 'swirl', x: 80, y: 15, rotation: -15, scale: 1.2 },
        { id: 's_arrow_adv', type: 'arrow', x: 15, y: 70, rotation: 45, scale: 1 }
      ]
    },
    back: {
      id: 'p7',
      pageNumber: 7,
      layout: 'collage',
      bgColor: 'bg-[#f0f9ff]', // Sky-50
      pattern: 'dots',
      photos: [
        { id: 'p7_1', url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop', rotation: 5, caption: "Scenic View" },
        { id: 'p7_2', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop', rotation: -3, caption: "Beach Day" }
      ],
      stickers: [
        { id: 's_sun', type: 'sparkle', x: 10, y: 10, rotation: 0, scale: 1.2 },
        { id: 's_ticket_travel', type: 'ticket', x: 80, y: 85, rotation: -10, scale: 1 }
      ]
    }
  },

  // --- SHEET 5: SILLY MOMENTS ---
  {
    front: {
      id: 'p8',
      pageNumber: 8,
      layout: 'multi-photo',
      bgColor: 'bg-[#fdf4ff]', // Fuchsia-50
      pattern: 'hearts',
      photos: [
        { id: 'p8_1', url: 'https://images.unsplash.com/photo-1531747056595-07f6cbbe10bd?q=80&w=800&auto=format&fit=crop', rotation: 2, caption: "So serious?" },
        { id: 'p8_2', url: 'https://images.unsplash.com/photo-1594750853509-c60317e33719?q=80&w=800&auto=format&fit=crop', rotation: -5, caption: "Blurry but happy" }
      ],
      stickers: [
        // Replaced Funny Face emoji with Lily (bow)
        { id: 's_lily_silly', type: 'bow', x: 85, y: 50, rotation: 10, scale: 1.3 },
        { id: 's_arrow_funny', type: 'arrow', x: 10, y: 20, rotation: 180, scale: 0.8 }
      ]
    },
    back: {
      id: 'p9',
      pageNumber: 9,
      layout: 'text-focus',
      bgColor: 'bg-white',
      pattern: 'grid',
      photos: [],
      text: "I love that we can be weird together. Life is never boring with you around.",
      stickers: [
        { id: 's_star1', type: 'star', x: 20, y: 80, rotation: 0, scale: 1 },
        { id: 's_star2', type: 'star', x: 80, y: 20, rotation: 45, scale: 1.2 }
      ]
    }
  },

  // --- SHEET 6: SPECIAL OCCASIONS ---
  {
    front: {
      id: 'p10',
      pageNumber: 10,
      layout: 'single-photo',
      bgColor: 'bg-[#fff1f2]',
      pattern: 'none',
      photos: [
        { id: 'p10_1', url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800&auto=format&fit=crop', rotation: 3, caption: "Party time!" }
      ],
      text: "Celebrations are better with you.",
      stickers: [
        // Replaced Cake with Rose
        { id: 's_rose_party', type: 'rose', x: 10, y: 10, rotation: -10, scale: 1.2 },
        // Replaced Balloon with Tulip (heart)
        { id: 's_tulip_party', type: 'heart', x: 85, y: 60, rotation: 10, scale: 1.2 }
      ]
    },
    back: {
      id: 'p11',
      pageNumber: 11,
      layout: 'collage',
      bgColor: 'bg-[#fefce8]', // Yellow-50
      pattern: 'dots',
      photos: [
        { id: 'p11_1', url: 'https://images.unsplash.com/photo-1530103862676-de3c9a59af57?q=80&w=800&auto=format&fit=crop', rotation: -3, caption: "Cheers!" },
        { id: 'p11_2', url: 'https://images.unsplash.com/photo-1482355347028-ff6de365e628?q=80&w=800&auto=format&fit=crop', rotation: 4, caption: "Gifts" }
      ],
      stickers: [
        { id: 's_sparkle_party', type: 'sparkle', x: 50, y: 50, rotation: 0, scale: 1.5 },
        { id: 's_bow_party', type: 'bow', x: 15, y: 85, rotation: 0, scale: 1 }
      ]
    }
  },

  // --- SHEET 7: NATURE & PEACE ---
  {
    front: {
      id: 'p12',
      pageNumber: 12,
      layout: 'multi-photo',
      bgColor: 'bg-[#f0fdf4]', // Green-50
      pattern: 'grid',
      photos: [
        { id: 'p12_1', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop', rotation: 2, caption: "Fresh air" },
        { id: 'p12_2', url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800&auto=format&fit=crop', rotation: -2, caption: "Walks" }
      ],
      stickers: [
        // Replaced Leaf emoji with Fern (swirl)
        { id: 's_fern_nature', type: 'swirl', x: 80, y: 10, rotation: 45, scale: 1 },
        { id: 's_flower', type: 'flower', x: 10, y: 80, rotation: 0, scale: 1.2 }
      ]
    },
    back: {
      id: 'p13',
      pageNumber: 13,
      layout: 'single-photo',
      bgColor: 'bg-white',
      pattern: 'hearts',
      photos: [
        { id: 'p13_1', url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=800&auto=format&fit=crop', rotation: 0, caption: "Sunset" }
      ],
      text: "Quiet moments with you are my favorite kind of moments.",
      stickers: [
        { id: 's_heart_nature', type: 'heart', x: 85, y: 85, rotation: 10, scale: 1 }
      ]
    }
  },

  // --- SHEET 8: FUTURE DREAMS ---
  {
    front: {
      id: 'p14',
      pageNumber: 14,
      layout: 'text-focus',
      bgColor: 'bg-[#e0e7ff]', // Indigo-50
      pattern: 'dots',
      photos: [],
      text: "I can't wait to see what the future holds for us. More travel, more laughter, and building our dream life.",
      stickers: [
        // Replaced House with Sunflower
        { id: 's_sunflower_future', type: 'flower', x: 15, y: 15, rotation: -5, scale: 1.3 },
        // Replaced Dog with Daisy (star)
        { id: 's_daisy_future', type: 'star', x: 80, y: 80, rotation: 5, scale: 1.2 }
      ]
    },
    back: {
      id: 'p15',
      pageNumber: 15,
      layout: 'collage',
      bgColor: 'bg-[#faf5ff]', // Purple-50
      pattern: 'grid',
      photos: [
        { id: 'p15_1', url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop', rotation: 5, caption: "Goals" },
        { id: 'p15_2', url: 'https://images.unsplash.com/photo-1524678606372-987d7e66c454?q=80&w=800&auto=format&fit=crop', rotation: -5, caption: "Someday" }
      ],
      stickers: [
        { id: 's_star_future', type: 'star', x: 50, y: 10, rotation: 0, scale: 1.5 },
        { id: 's_swirl_future', type: 'swirl', x: 50, y: 90, rotation: 0, scale: 1 }
      ]
    }
  },

  // --- SHEET 9: REASONS I LOVE YOU ---
  {
    front: {
      id: 'p16',
      pageNumber: 16,
      layout: 'multi-photo',
      bgColor: 'bg-[#ffe4e6]', // Rose-100
      pattern: 'hearts',
      photos: [
        { id: 'p16_1', url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop', rotation: 2, caption: "Kindness" },
        { id: 'p16_2', url: 'https://images.unsplash.com/photo-1522543558187-768b6df7c25c?q=80&w=800&auto=format&fit=crop', rotation: -2, caption: "Warmth" }
      ],
      stickers: [
        { id: 's_love_letter_9', type: 'letter', x: 10, y: 50, rotation: -15, scale: 1.2 },
        { id: 's_heart_9', type: 'heart', x: 90, y: 10, rotation: 15, scale: 1 }
      ]
    },
    back: {
      id: 'p17',
      pageNumber: 17,
      layout: 'text-focus',
      bgColor: 'bg-white',
      pattern: 'none',
      photos: [],
      text: "1. Your laugh\n2. How you support me\n3. Your kindness to strangers\n4. Everything about you.",
      stickers: [
        { id: 's_rose_9', type: 'rose', x: 80, y: 80, rotation: -20, scale: 1.4 },
        { id: 's_kiss_9', type: 'lips', x: 20, y: 10, rotation: 10, scale: 1 }
      ]
    }
  },

  // --- SHEET 10: CONCLUSION & BACK COVER ---
  {
    front: {
      id: 'p18',
      pageNumber: 18,
      layout: 'single-photo',
      bgColor: 'bg-[#fdf2f8]', // Pink-50
      pattern: 'hearts',
      photos: [
        { id: 'p18_1', url: 'https://images.unsplash.com/photo-1511253247232-258d9299b486?q=80&w=800&auto=format&fit=crop', rotation: 3, caption: "Always" }
      ],
      text: "To be continued...",
      stickers: [
         { id: 's_bow_end', type: 'bow', x: 50, y: 85, rotation: 0, scale: 1.2 },
         { id: 's_sparkle_end', type: 'sparkle', x: 80, y: 20, rotation: 0, scale: 1 }
      ]
    },
    back: {
      id: 'cover-back',
      pageNumber: 19,
      layout: 'cover',
      bgColor: 'bg-[#9f1239]', 
      photos: [],
      text: "", 
      subText: "Created with Love",
      stickers: [
        { id: 's_end_heart', type: 'heart', x: 50, y: 40, rotation: 0, scale: 1.5 },
        { id: 's_end_rose', type: 'rose', x: 50, y: 65, rotation: 90, scale: 1 }
      ]
    }
  }
];