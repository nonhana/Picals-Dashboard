import { useCallback, useEffect, useState } from 'react';

export const useHash = () => {
  const [hash, setHash] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash;
    }
    return '';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleHashChange = () => {
      setHash(window.location.hash);
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const updateHash = useCallback((newHash: string) => {
    if (typeof window !== 'undefined') {
      if (newHash.startsWith('#')) {
        window.location.hash = newHash;
      } else {
        window.location.hash = `#${newHash}`;
      }
    }
  }, []);

  const cleanHash = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.location.hash = '';
    }
  }, []);

  return [hash, updateHash, cleanHash] as const;
};
