import { useCallback, useEffect, useState } from 'react';

export const useHash = () => {
  const [hash, setHash] = useState<string>(() => window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    handleHashChange(); // Set the initial hash value

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const updateHash = useCallback((newHash: string) => {
    if (newHash.startsWith('#')) {
      window.location.hash = newHash;
    } else {
      window.location.hash = `#${newHash}`;
    }
  }, []);

  const cleanHash = useCallback(() => {
    window.location.hash = '';
  }, []);

  return [hash, updateHash, cleanHash] as const;
};
