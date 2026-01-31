import { useState, useEffect, useCallback } from 'react';
import { PageType, NAV_MAP, EXTERNAL_LINKS } from '../config';

/**
 * Custom hook for managing navigation state and events
 */
export function useNavigation(initialPage: PageType = 'home') {
  const [page, setPage] = useState<PageType>(initialPage);

  // Handle external links (e.g., associe-se)
  useEffect(() => {
    if (page === 'associe') {
      window.open(EXTERNAL_LINKS.associe, '_blank');
      setPage('home');
    }
  }, [page]);

  // Listen to navigation events from other components
  useEffect(() => {
    function handleNavEvent(e: CustomEvent<{ target: string }>) {
      const target = e?.detail?.target;
      if (!target) return;

      const normalized = String(target).toLowerCase();
      const mappedPage = NAV_MAP[normalized];
      
      if (mappedPage) {
        setPage(mappedPage);
      }

      // Handle scroll to explore section
      if (normalized === 'explore' || normalized === 'home') {
        setPage('home');
        setTimeout(() => {
          const el = document.getElementById('explore');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    }

    window.addEventListener('site:navigate', handleNavEvent as EventListener);
    return () => window.removeEventListener('site:navigate', handleNavEvent as EventListener);
  }, []);

  const navigate = useCallback((newPage: PageType | string) => {
    setPage(newPage as PageType);
  }, []);

  return { page, setPage, navigate };
}
