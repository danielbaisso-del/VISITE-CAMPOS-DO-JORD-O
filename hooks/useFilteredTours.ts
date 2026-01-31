import { useMemo } from 'react';
import { TOURS } from '../constants';
import SITE_CONTENT from '../data/siteContent';
import { ACCOMMODATIONS } from '../components/accommodationsData';
import { FilterCategory } from '../config';

interface TourItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
  address?: string;
  phone?: string;
  website?: string;
  status?: string;
  tags?: string[];
}

/**
 * Custom hook for filtering tours based on category and search query
 */
export function useFilteredTours(filter: FilterCategory, searchQuery: string): TourItem[] {
  return useMemo(() => {
    const searchLower = (searchQuery || '').trim().toLowerCase();

    // Base tours filtered by category
    const base = TOURS.filter(tour => {
      const matchesFilter = filter === 'Todos' || tour.category === filter;
      const matchesSearch = !searchLower || 
        (tour.title && tour.title.toLowerCase().includes(searchLower)) || 
        (tour.description && tour.description.toLowerCase().includes(searchLower));
      return matchesFilter && matchesSearch;
    });

    // Add restaurants for Gastronomia filter
    if (filter === 'Gastronomia') {
      const restaurants = mapRestaurants();
      const existingIds = new Set(base.map(b => b.id));
      return [...base, ...restaurants.filter(r => !existingIds.has(r.id))];
    }

    // Combine all sources for "Todos" filter
    if (filter === 'Todos') {
      const fromAttractions = mapAttractions();
      const fromHotels = mapHotels();
      const fromRestaurants = mapRestaurants();
      
      const combined = [...base, ...fromAttractions, ...fromHotels, ...fromRestaurants];
      
      // Deduplicate and filter by search
      const seen = new Set<string>();
      return combined.filter(item => {
        if (!item || !item.id) return false;
        if (seen.has(item.id)) return false;
        
        const matchesSearch = !searchLower || 
          (item.title && item.title.toLowerCase().includes(searchLower)) || 
          (item.description && item.description.toLowerCase().includes(searchLower));
        
        if (!matchesSearch) return false;
        seen.add(item.id);
        return true;
      });
    }

    return base;
  }, [filter, searchQuery]);
}

// Helper functions to map data sources to common format
function mapRestaurants(): TourItem[] {
  return (SITE_CONTENT.restaurants || []).map(r => ({
    id: r.id || (r.name || '').replace(/\s+/g, '-').toLowerCase(),
    title: r.name,
    category: 'Gastronomia',
    description: r.specialty || '',
    address: r.address || '',
    phone: r.phone || '',
    imageUrl: r.image || `/images/gastronomia/${r.id}.jpg`,
    website: r.website || undefined
  }));
}

function mapAttractions(): TourItem[] {
  return (SITE_CONTENT.attractions || []).map(a => ({
    id: a.id || a.title,
    title: a.title,
    category: a.category || 'Attraction',
    description: a.description || '',
    imageUrl: ''
  }));
}

function mapHotels(): TourItem[] {
  return ACCOMMODATIONS.map(acc => ({
    id: acc.id || acc.name,
    title: acc.name,
    category: 'Hospedagem',
    description: acc.description || '',
    imageUrl: acc.images?.[0] || `/images/hospedagens/${acc.id}.jpg`,
    address: acc.address || '',
    phone: acc.phone || '',
    website: acc.website || '',
    status: '',
    tags: acc.tags || []
  }));
}
