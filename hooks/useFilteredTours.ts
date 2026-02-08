import { useMemo } from 'react';
import { TOURS } from '../constants';
import SITE_CONTENT from '../data/siteContent';
import { ACCOMMODATIONS } from '../components/accommodationsData';
import { RESTAURANTS } from '../components/Gastronomia';
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
  instagram?: string;
  facebook?: string;
}

/**
 * Custom hook for filtering tours based on category and search query
 */
export function useFilteredTours(filter: FilterCategory, searchQuery: string, neighborhoodFilter: string = 'all'): TourItem[] {
  return useMemo(() => {
    const searchLower = (searchQuery || '').trim().toLowerCase();
    
    // Helper function to detect neighborhood from address
    const getNeighborhood = (address: string): string => {
      const addr = (address || '').toLowerCase();
      if (addr.includes('capivari')) return 'capivari';
      if (addr.includes('vila inglesa')) return 'vilainglesa';
      if (addr.includes('alto da boa vista') || addr.includes('alto boa vista')) return 'altodaboavista';
      if (addr.includes('jaguaribe')) return 'jaguaribe';
      if (addr.includes('descansópolis') || addr.includes('descansopolis')) return 'descansopolis';
      if (addr.includes('horto florestal')) return 'hortoflorestal';
      return 'outras';
    };

    // Base tours filtered by category, search, and neighborhood
    const base = TOURS.filter(tour => {
      const matchesFilter = filter === 'Todos' || tour.category === filter;
      const matchesSearch = !searchLower || 
        (tour.title && tour.title.toLowerCase().includes(searchLower)) || 
        (tour.description && tour.description.toLowerCase().includes(searchLower));
      const matchesNeighborhood = neighborhoodFilter === 'all' || getNeighborhood(tour.address || '') === neighborhoodFilter;
      return matchesFilter && matchesSearch && matchesNeighborhood;
    });

    // Add restaurants for Gastronomia filter
    if (filter === 'Gastronomia') {
      const restaurants = mapRestaurants().filter(r => {
        const matchesNeighborhood = neighborhoodFilter === 'all' || getNeighborhood(r.address || '') === neighborhoodFilter;
        return matchesNeighborhood;
      });
      const existingIds = new Set(base.map(b => b.id));
      return [...base, ...restaurants.filter(r => !existingIds.has(r.id))];
    }

    // Combine all sources for "Todos" filter
    if (filter === 'Todos') {
      const fromAttractions = mapAttractions().filter(a => {
        const matchesNeighborhood = neighborhoodFilter === 'all' || getNeighborhood(a.address || '') === neighborhoodFilter;
        return matchesNeighborhood;
      });
      const fromHotels = mapHotels().filter(h => {
        const matchesNeighborhood = neighborhoodFilter === 'all' || getNeighborhood(h.address || '') === neighborhoodFilter;
        return matchesNeighborhood;
      });
      const fromRestaurants = mapRestaurants().filter(r => {
        const matchesNeighborhood = neighborhoodFilter === 'all' || getNeighborhood(r.address || '') === neighborhoodFilter;
        return matchesNeighborhood;
      });
      
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
  }, [filter, searchQuery, neighborhoodFilter]);
}

// Helper functions to map data sources to common format
function mapRestaurants(): TourItem[] {
  return RESTAURANTS.map(r => ({
    id: r.id || (r.name || '').replace(/\s+/g, '-').toLowerCase(),
    title: r.name,
    category: 'Gastronomia',
    description: r.description || '',
    address: r.address || '',
    phone: r.phone || '',
    imageUrl: r.image || `/images/gastronomia/${r.id}.jpg`,
    website: r.website || undefined,
    instagram: r.instagram || '',
    facebook: r.facebook || ''
  }));
}

function mapAttractions(): TourItem[] {
  return (SITE_CONTENT.attractions || []).map(a => ({
    id: a.id || a.title,
    title: a.title,
    category: a.category || 'Attraction',
    description: a.description || '',
    address: a.address || '',
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
    tags: acc.tags || [],
    instagram: acc.instagram || '',
    facebook: acc.facebook || ''
  }));
}
