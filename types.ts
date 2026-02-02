/**
 * Core application types
 * Centralized type definitions for the entire application
 */

// ============================================
// Tour & Attraction Types
// ============================================

export type TourCategory = 'Cultura' | 'Natureza' | 'Lazer' | 'Gastronomia' | 'Hospedagem' | 'Attraction';

export interface TourItem {
  id: string;
  title: string;
  category: TourCategory | string;
  description: string;
  address?: string;
  phone?: string;
  imageUrl?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  status?: string;
  hours?: string;
  tags?: string[];
}

// ============================================
// Chat & AI Types
// ============================================

export interface ChatAction {
  label?: string;
  url?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  actions?: ChatAction[];
}

export interface AIResponse {
  text: string;
  actions?: ChatAction[];
}

// ============================================
// Accommodation Types
// ============================================

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
  instagram?: string;
  facebook?: string;
}

// ============================================
// Restaurant Types
// ============================================

export interface Restaurant {
  id: string;
  name: string;
  specialty?: string;
  address?: string;
  phone?: string;
  website?: string;
  image?: string;
  instagram?: string;
  facebook?: string;
}

// ============================================
// Site Content Types
// ============================================

export interface Attraction {
  id: string;
  title: string;
  category?: string;
  description?: string;
  address?: string;
  phone?: string | null;
  website?: string | null;
  hours?: string;
  tips?: string;
}

export interface Hotel {
  id: string;
  name: string;
  category?: string;
  phone?: string | null;
  website?: string | null;
}
