'use client';

import { useState, useEffect } from 'react';

// This is a DEBOUNCED HOOK, not a debounced function.
// It returns a debounced version of the value passed to it.
export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
        setDebouncedValue(value)
    }, delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
