export interface Sticker {
  id: string;
  type: 'star' | 'heart' | 'flower' | 'emoji' | 'tape' | 'rose' | 'lips' | 'letter' | 'arrow' | 'sparkle' | 'bow' | 'butterfly' | 'swirl' | 'ticket';
  content?: string; // for emoji
  x: number; // percentage
  y: number; // percentage
  rotation: number;
  scale: number;
}

export interface Photo {
  id: string;
  url: string;
  caption?: string;
  rotation: number;
  x?: number; // offset
  y?: number; // offset
  width?: string;
}

export interface PageData {
  id: string;
  pageNumber: number; // 0-based index
  layout: 'single-photo' | 'multi-photo' | 'collage' | 'text-focus' | 'cover';
  photos: Photo[];
  text?: string;
  subText?: string; // Added for cover subtitles
  stickers: Sticker[];
  bgColor?: string; // hex or tailwind class
  pattern?: 'dots' | 'grid' | 'hearts' | 'none';
}

export interface SheetData {
  front: PageData;
  back: PageData;
}