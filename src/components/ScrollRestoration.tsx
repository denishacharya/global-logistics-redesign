import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Ensures pages always load from the top
 * Disables browser scroll restoration and scrolls to top on navigation
 */
export const ScrollRestoration = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
