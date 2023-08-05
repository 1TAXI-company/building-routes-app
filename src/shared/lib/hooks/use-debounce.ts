import { useEffect, useState } from 'react';

function useDebounce(value, delay = 0) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const updateTimeout = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(updateTimeout);
  }, [value, delay]);

  return debouncedValue;
}

export { useDebounce };
