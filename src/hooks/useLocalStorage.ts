import { useState } from "react";
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  function load() {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        setState(parsed);
        return parsed;
      }
    } catch (e) {
      console.error("Error loading from localStorage", e);
    }
  }

  function save(pattern: T) {
    try {
      localStorage.setItem(key, JSON.stringify(pattern));
      setState(pattern);
    } catch (e) {
      console.error("Error saving to localStorage", e);
    }
  }

  function clear() {
    try {
      localStorage.removeItem(key);
      setState(initialValue);
    } catch (e) {
      console.error("Error clearing localStorage", e);
    }
  }

  return { state, clear, save, load };
}
