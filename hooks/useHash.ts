import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useHash = () => {
  const [hash, setHash] = useState('');
  const router = useRouter();
  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    router.events.on('routeChangeComplete', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      router.events.off('routeChangeComplete', handleHashChange);
    };
  }, [router.events]);
  return hash;
};
