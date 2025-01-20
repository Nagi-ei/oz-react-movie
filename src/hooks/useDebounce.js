import React from 'react';
import { useEffect } from 'react';

export default function useDebounce(callback, ms, deps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      callback();
    }, ms);
    return () => {
      clearTimeout(timer);
    };
  }, deps);
}
