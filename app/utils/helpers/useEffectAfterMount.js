import { useRef, useEffect } from 'react';

const useEffectAfterMount = (callback, dependencies) => {
  const justMounted = useRef(true);
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!justMounted.current) {
      return callback();
    }
    justMounted.current = false;
  }, dependencies);
};

export { useEffectAfterMount };
