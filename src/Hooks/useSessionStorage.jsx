import { useState, useEffect } from 'react';

const useSessionStorage = (key, fallback) => {
  const [value, setValue] = useState(() => {
    try {
      const item = sessionStorage.getItem(key);
      if (item) {
        try {
          return JSON.parse(item);
        } catch (error) {
          return item;
        }
      }

      return fallback;
    } catch (error) {
      console.error('Error fetching and parsing from sessionStorage', error);
      return fallback;
    }
  });

  useEffect(() => {
    try {
      const valueToStore = typeof value === 'string' ? value : JSON.stringify(value);
      sessionStorage.setItem(key, valueToStore);
    } catch (error) {
      console.error('Error storing data to sessionStorage', error);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useSessionStorage;
