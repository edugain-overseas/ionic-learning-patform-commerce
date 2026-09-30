import { useEffect } from 'react';

export const useDynamicFontSize = () => {
  useEffect(() => {
    const adjustFontSize = () => {
      const vw = window.innerWidth;
      const fontSize = vw >= 992 ? (vw / 1440) : (vw / 360);
      document.documentElement.style.fontSize = `${fontSize}px`;
    };

    window.addEventListener('resize', adjustFontSize);
    return () => window.removeEventListener('resize', adjustFontSize);
  }, []);
};
