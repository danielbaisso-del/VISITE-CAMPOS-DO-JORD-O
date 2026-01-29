
export interface TourItem {
  id: string;
  title: string;
  category: 'Cultura' | 'Natureza' | 'Lazer' | 'Gastronomia';
  description: string;
  address: string;
  phone?: string;
  imageUrl: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  status?: string;
  hours?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  actions?: Array<{
    label: string;
    url: string;
  }>;
}

export interface Accommodation {
  id: string;
  name: string;
  description: string;
  address?: string;
  phone?: string;
  website?: string;
  bookingLink?: string;
  images?: string[];
  priceRange?: string;
  stars?: number;
  tags?: string[];
}
