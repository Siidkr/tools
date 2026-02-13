import { SheetData } from './types';

// URL Foto User dengan parameter perbaikan format otomatis (f_auto) dan kualitas otomatis (q_auto)
// Ini memperbaiki masalah gambar putih/blank pada browser.
const USER_PHOTO_URL = "https://res.cloudinary.com/dpuwu7fna/image/upload/w_1000,c_limit,f_auto,q_auto/IMG_3313_pt4ezx.jpg";

export const INITIAL_SHEETS: SheetData[] = [
  // --- SHEET 1: FRONT COVER (CLASSIC BOOK STYLE) & INTRO ---
  {
    front: {
      id: 'cover-front',
      pageNumber: 0,
      layout: 'cover',
      bgColor: 'bg-[#881337]', // Deep Rose-900 (Leather Book Color)
      photos: [], // REMOVED PHOTO for classic book look
      text: "Our Love Story",
      subText: "Valentine's Edition • 2025",
      stickers: [] // Minimal stickers for clean elegant cover
    },
    back: {
      id: 'p1',
      pageNumber: 1,
      layout: 'text-focus',
      bgColor: 'bg-[#fff1f2]', // Rose-50
      pattern: 'hearts',
      photos: [],
      text: "Welcome to our love story. This is a collection of the moments that make my heart smile. You are my greatest adventure.",
      stickers: [
         { id: 's3', type: 'tape', x: 50, y: 5, rotation: 0, scale: 1 },
         { id: 's_intro', type: 'letter', x: 45, y: 75, rotation: 5, scale: 1.3 },
         { id: 's_kiss', type: 'lips', content: '', x: 80, y: 20, rotation: 15, scale: 1.2 },
         // Added Cupid Arrow
         { id: 's_arrow_intro', type: 'arrow', x: 10, y: 30, rotation: 45, scale: 0.9 }
      ]
    }
  },

  // --- SHEET 2: FIRST DATES ---
  {
    front: {
      id: 'p2',
      pageNumber: 2,
      layout: 'collage',
      pattern: 'hearts',
      bgColor: 'bg-[#fff0f5]', // Lavender Blush
      photos: [
        // Menggunakan foto user di halaman pertama juga
        { id: 'p2_1', url: USER_PHOTO_URL, rotation: 4, caption: "Our First Meet" },
        { id: 'p2_2', url: 'https://res.cloudinary.com/dpuwu7fna/image/upload/w_1000,c_limit,f_auto,q_auto/IMG_3301_rblv1k.jpg', rotation: -3, caption: "Nervous" }
      ],
      stickers: [
        { id: 's5', type: 'rose', content: '', x: 8, y: 12, rotation: -25, scale: 1.1 },
        { id: 's_ticket', type: 'ticket', x: 20, y: 85, rotation: 10, scale: 1.2 },
        // Added Cupid Arrow pointing to photos
        { id: 's_cupid_1', type: 'arrow', x: 88, y: 40, rotation: -20, scale: 0.8 }
      ]
    },
    back: {
      id: 'p3',
      pageNumber: 3,
      layout: 'single-photo',
      bgColor: 'bg-white',
      pattern: 'dots',
      photos: [
         { id: 'p3_1', url: 'https://res.cloudinary.com/dpuwu7fna/image/upload/w_1000,c_limit,f_auto,q_auto/IMG_4795_i8go0y.jpg', rotation: 2, caption: "Your smile <3" }
      ],
      text: "I knew you were special the moment I saw you laugh. My heart still skips a beat.",
      stickers: [
        { id: 's_heart_p3', type: 'heart', x: 85, y: 15, rotation: 15, scale: 1.1 },
        // Added small heart cluster
        { id: 's_mini_h_p3', type: 'heart', x: 10, y: 80, rotation: -10, scale: 0.6 }
      ]
    }
  },

  // --- SHEET 3: FOOD & COFFEE DATES ---
  {
    front: {
      id: 'p4',
      pageNumber: 4,
      layout: 'multi-photo',
      bgColor: 'bg-[#ffe4e6]', // Rose-100
      pattern: 'dots',
      photos: [
        { id: 'p4_1', url: 'https://res.cloudinary.com/dpuwu7fna/image/upload/w_1000,c_limit,f_auto,q_auto/IMG_3324_ax9on7.jpg', rotation: -2, caption: "Our first meal together" },
        { id: 'p4_2', url: 'https://res.cloudinary.com/dpuwu7fna/image/upload/w_1000,c_limit,f_auto,q_auto/IMG_4645_mufugg.jpg', rotation: 3, caption: "Sushi Date" }
      ],
      stickers: [
        { id: 's_lips_coffee', type: 'lips', x: 85, y: 10, rotation: 15, scale: 1 },
        { id: 's_swirl_new', type: 'swirl', x: 10, y: 80, rotation: 0, scale: 1.2 },
        // Added Love Letter
        { id: 's_letter_4', type: 'letter', x: 8, y: 25, rotation: 10, scale: 1.0 }
      ]
    },
    back: {
      id: 'p5',
      pageNumber: 5,
      layout: 'text-focus',
      bgColor: 'bg-white',
      pattern: 'none',
      photos: [],
      text: "Somehow, every meal turns into a beautiful memory when I’m with you.",
      stickers: [
        { id: 's_sparkle_food', type: 'sparkle', x: 50, y: 80, rotation: 0, scale: 1.5 },
        { id: 's_tape_food', type: 'tape', x: 50, y: 5, rotation: -2, scale: 1 },
        // Added extra kiss mark
        { id: 's_kiss_p5', type: 'lips', x: 80, y: 20, rotation: -15, scale: 0.9 }
      ]
    }
  },

  // --- SHEET 4: ADVENTURES & TRAVEL ---
  {
    front: {
      id: 'p6',
      pageNumber: 6,
      layout: 'single-photo',
      bgColor: 'bg-[#fce7f3]', // Pink-100
      pattern: 'grid',
      photos: [
        { id: 'p6_1', url: 'https://res.cloudinary.com/dpuwu7fna/image/upload/w_1000,c_limit,f_auto,q_auto/IMG_4834_owmjol.jpg', rotation: -4, caption: "Movie Date" }
      ],
      text: "Two tickets, one story, and my favorite person by my side.",
      stickers: [
        { id: 's_heart_travel', type: 'heart', x: 80, y: 15, rotation: -15, scale: 1.2 },
        { id: 's_arrow_adv', type: 'arrow', x: 15, y: 70, rotation: 45, scale: 1 },
        // Added Balloon
        { id: 's_balloon_p6', type: 'bow', x: 85, y: 60, rotation: 10, scale: 1.1 }
      ]
    },
    back: {
      id: 'p7',
      pageNumber: 7,
      layout: 'collage',
      bgColor: 'bg-white',
      pattern: 'hearts',
      photos: [
        { id: 'p7_1', url: 'https://res.cloudinary.com/dpuwu7fna/image/upload/w_1000,c_limit,f_auto,q_auto/IMG_3325_apudw6.jpg', rotation: 5, caption: "Our First Photobooth" },
        { id: 'p7_2', url: 'https://res.cloudinary.com/dpuwu7fna/image/upload/w_1000,c_limit,f_auto,q_auto/IMG_3314_zxsbty.jpg', rotation: -3, caption: "Mirror Selfie" }
      ],
      stickers: [
        { id: 's_sun', type: 'sparkle', x: 10, y: 10, rotation: 0, scale: 1.2 },
        { id: 's_ticket_travel', type: 'ticket', x: 80, y: 85, rotation: -10, scale: 1 },
        // Added extra heart
        { id: 's_heart_p7', type: 'heart', x: 45, y: 50, rotation: 0, scale: 0.8 }
      ]
    }
  },

  // --- SHEET 5: SILLY MOMENTS ---
  {
    front: {
      id: 'p8',
      pageNumber: 8,
      layout: 'multi-photo',
      bgColor: 'bg-[#fdf2f8]', // Pink-50
      pattern: 'hearts',
      photos: [
        { id: 'p8_1', url: 'https://res.cloudinary.com/dpuwu7fna/image/upload/w_1000,c_limit,f_auto,q_auto/IMG_4879_dtlgm3.jpg', rotation: 2, caption: "So serious? wkwk" },
        { id: 'p8_2', url: 'https://res.cloudinary.com/dpuwu7fna/image/upload/w_1000,c_limit,f_auto,q_auto/IMG_4863_xxhdty.jpg', rotation: -5, caption: "Our tired little date." }
      ],
      stickers: [
        { id: 's_bow_silly', type: 'bow', x: 85, y: 50, rotation: 10, scale: 1.3 },
        { id: 's_arrow_funny', type: 'arrow', x: 10, y: 20, rotation: 180, scale: 0.8 },
        // Added small heart
        { id: 's_tiny_heart_8', type: 'heart', x: 50, y: 5, rotation: 0, scale: 0.6 }
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
        { id: 's_star1', type: 'heart', x: 20, y: 80, rotation: 0, scale: 1 },
        { id: 's_star2', type: 'sparkle', x: 80, y: 20, rotation: 45, scale: 1.2 },
        // Added kiss
        { id: 's_kiss_p9', type: 'lips', x: 10, y: 40, rotation: -30, scale: 1 }
      ]
    }
  },

  // --- SHEET 6: SPECIAL OCCASIONS ---
  {
    front: {
      id: 'p10',
      pageNumber: 10,
      layout: 'single-photo',
      bgColor: 'bg-[#ffe4e6]',
      pattern: 'none',
      photos: [
        { id: 'p10_1', url: 'https://res.cloudinary.com/dpuwu7fna/image/upload/w_1000,c_limit,f_auto,q_auto/IMG_4781_ebvmfk.jpg', rotation: 3, caption: "First Flower" }
      ],
      text: "The first time I gave you flowers, and my heart was blooming too",
      stickers: [
        { id: 's_rose_party', type: 'rose', x: 10, y: 10, rotation: -10, scale: 1.2 },
        { id: 's_tulip_party', type: 'heart', x: 85, y: 60, rotation: 10, scale: 1.2 },
        // Added Letter
        { id: 's_letter_p10', type: 'letter', x: 15, y: 80, rotation: -5, scale: 1 }
      ]
    },
    back: {
      id: 'p11',
      pageNumber: 11,
      layout: 'collage',
      bgColor: 'bg-[#fff1f2]', // Rose-50
      pattern: 'dots',
      photos: [
        { id: 'p11_1', url: 'https://res.cloudinary.com/dpuwu7fna/image/upload/w_1000,c_limit,f_auto,q_auto/IMG_3312_oyj29r.jpg', rotation: -3, caption: "Cheers!" },
        { id: 'p11_2', url: 'https://res.cloudinary.com/dpuwu7fna/image/upload/w_1000,c_limit,f_auto,q_auto/IMG_3303_mkg3lj.jpg', rotation: 4, caption: "Gramedia" }
      ],
      stickers: [
        { id: 's_sparkle_party', type: 'sparkle', x: 50, y: 50, rotation: 0, scale: 1.5 },
        { id: 's_bow_party', type: 'bow', x: 15, y: 85, rotation: 0, scale: 1 },
        // Added Arrow
        { id: 's_arrow_p11', type: 'arrow', x: 80, y: 10, rotation: 135, scale: 0.8 }
      ]
    }
  },

  // --- SHEET 7: NATURE & PEACE ---
  {
    front: {
      id: 'p12',
      pageNumber: 12,
      layout: 'multi-photo',
      bgColor: 'bg-[#fce7f3]', // Pink-100
      pattern: 'grid',
      photos: [
        { id: 'p12_1', url: 'https://res.cloudinary.com/dpuwu7fna/image/upload/w_1000,c_limit,f_auto,q_auto/IMG_5632_wkp2v5.jpg', rotation: 2, caption: "2nd Flowers" },
        { id: 'p12_2', url: 'https://res.cloudinary.com/dpuwu7fna/image/upload/w_1000,c_limit,f_auto,q_auto/IMG_5626_a9top5.jpg', rotation: -2, caption: "Cute" }
      ],
      stickers: [
        { id: 's_flower', type: 'flower', x: 10, y: 80, rotation: 0, scale: 1.2 },
        { id: 's_rose_nature', type: 'rose', x: 80, y: 10, rotation: 15, scale: 1.1 }
      ]
    },
    back: {
      id: 'p13',
      pageNumber: 13,
      layout: 'single-photo',
      bgColor: 'bg-white',
      pattern: 'hearts',
      photos: [
        { id: 'p13_1', url: 'https://res.cloudinary.com/dpuwu7fna/image/upload/w_1000,c_limit,f_auto,q_auto/IMG_4808_iuuei1.jpg', rotation: 0, caption: "Holding hands" }
      ],
      text: "Quiet moments holding your hand are my favorite kind of moments.",
      stickers: [
        { id: 's_heart_nature', type: 'heart', x: 85, y: 85, rotation: 10, scale: 1 },
        // Added Love Letter
        { id: 's_letter_p13', type: 'letter', x: 10, y: 15, rotation: -10, scale: 1 }
      ]
    }
  },

  // --- SHEET 8: FUTURE DREAMS ---
  {
    front: {
      id: 'p14',
      pageNumber: 14,
      layout: 'text-focus',
      bgColor: 'bg-[#fbcfe8]', // Pink-200
      pattern: 'dots',
      photos: [],
      text: "I can't wait to see what the future holds for us. May our future be gentle, our love be steady, and our dreams grow stronger together.",
      stickers: [
        { id: 's_rose_future', type: 'rose', x: 15, y: 15, rotation: -5, scale: 1.3 },
        { id: 's_heart_future', type: 'heart', x: 80, y: 80, rotation: 5, scale: 1.2 },
        // Added Cupid Arrow pointing to text
        { id: 's_arrow_future', type: 'arrow', x: 85, y: 25, rotation: 120, scale: 1 }
      ]
    },
    back: {
      id: 'p15',
      pageNumber: 15,
      layout: 'collage',
      bgColor: 'bg-[#fff0f5]',
      pattern: 'grid',
      photos: [
        { id: 'p15_1', url: 'https://res.cloudinary.com/dpuwu7fna/image/upload/w_1000,c_limit,f_auto,q_auto/IMG_4753_2_c7nsvk.jpg', rotation: 5, caption: "Us" },
        { id: 'p15_2', url: 'https://res.cloudinary.com/dpuwu7fna/image/upload/w_1000,c_limit,f_auto,q_auto/IMG_4673_2_vuzhp6.jpg', rotation: -5, caption: "Always" }
      ],
      stickers: [
        { id: 's_star_future', type: 'sparkle', x: 50, y: 10, rotation: 0, scale: 1.5 },
        { id: 's_swirl_future', type: 'swirl', x: 50, y: 90, rotation: 0, scale: 1 },
        // Added Heart
        { id: 's_heart_p15', type: 'heart', x: 10, y: 50, rotation: -20, scale: 0.9 }
      ]
    }
  },

  // --- SHEET 9: REASONS I LOVE YOU ---
  {
    front: {
      id: 'p16',
      pageNumber: 16,
      layout: 'multi-photo',
      bgColor: 'bg-[#f43f5e]', // Rose-500 (Bold)
      pattern: 'hearts',
      photos: [
        { id: 'p16_1', url: 'https://res.cloudinary.com/dpuwu7fna/image/upload/w_1000,c_limit,f_auto,q_auto/IMG_3405_2_d24ujn.jpg', rotation: 2, caption: "Love" },
        { id: 'p16_2', url: 'https://res.cloudinary.com/dpuwu7fna/image/upload/w_1000,c_limit,f_auto,q_auto/IMG_3406_2_zmvbpq.jpg', rotation: -2, caption: "Together" }
      ],
      stickers: [
        { id: 's_love_letter_9', type: 'letter', x: 10, y: 50, rotation: -15, scale: 1.2 },
        { id: 's_heart_9', type: 'heart', x: 90, y: 10, rotation: 15, scale: 1 },
        // Added extra rose
        { id: 's_rose_p16', type: 'rose', x: 50, y: 85, rotation: 90, scale: 1 }
      ]
    },
    back: {
      id: 'p17',
      pageNumber: 17,
      layout: 'text-focus',
      bgColor: 'bg-white',
      pattern: 'none',
      photos: [],
      text: "1. Your laugh\n2. How you support me\n3. Your kindness\n4. Everything about you.",
      stickers: [
        { id: 's_rose_9', type: 'rose', x: 80, y: 80, rotation: -20, scale: 1.4 },
        { id: 's_kiss_9', type: 'lips', x: 20, y: 10, rotation: 10, scale: 1 },
        // Added Cupid Arrow
        { id: 's_arrow_p17', type: 'arrow', x: 10, y: 90, rotation: -45, scale: 0.8 }
      ]
    }
  },

  // --- SHEET 10: CONCLUSION & BACK COVER ---
  {
    front: {
      id: 'p18',
      pageNumber: 18,
      layout: 'single-photo',
      bgColor: 'bg-[#fce7f3]',
      pattern: 'hearts',
      photos: [
        { id: 'p18_1', url: 'https://res.cloudinary.com/dpuwu7fna/image/upload/IMG_4817_2_jdkogj.jpg', rotation: 3, caption: "Forever" }
      ],
      text: "You are my Valentine, today and always.",
      stickers: [
         { id: 's_bow_end', type: 'bow', x: 50, y: 85, rotation: 0, scale: 1.2 },
         { id: 's_sparkle_end', type: 'sparkle', x: 80, y: 20, rotation: 0, scale: 1 },
         // Added Heart
         { id: 's_heart_end', type: 'heart', x: 15, y: 15, rotation: -15, scale: 1 }
      ]
    },
    back: {
      id: 'cover-back',
      pageNumber: 19,
      layout: 'cover',
      bgColor: 'bg-[#881337]', // Deep Rose-900 (Matching Front Cover)
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