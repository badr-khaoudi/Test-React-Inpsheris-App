import { useRef, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useCloseEffect = callback => {
  const location = useLocation();
  const pathname = useRef(null);
  useLayoutEffect(() => {
    if (pathname.current === null) {
      pathname.current = location.pathname;
      return;
    }
    if (pathname.current !== location.pathname) {
      callback();
    }
  }, [location]);
};

export { useCloseEffect };
