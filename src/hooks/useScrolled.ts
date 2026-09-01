import { useEffect, useState } from 'react';

/** true depois que a página passa de `offset` pixels — usado no header sticky. */
export const useScrolled = (offset = 24): boolean => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);

  return scrolled;
};
