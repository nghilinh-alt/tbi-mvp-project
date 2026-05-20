/**
 * Form Handling Hook - Accessible Form Management
 */

import { useState, useCallback } from 'react';

interface UseFormReturn<T> {
  value: T;
  error: string | null;
  touched: boolean;
  setValue: (newValue: T) => void;
  setError: (error: string | null) => void;
  markTouched: () => void;
  reset: () => void;
}

export function useForm<T>(defaultValue: T): UseFormReturn<T> {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const markTouched = useCallback(() => {
    setTouched(true);
  }, []);

  const reset = useCallback(() => {
    setValue(defaultValue);
    setError(null);
    setTouched(false);
  }, [defaultValue]);

  return {
    value,
    error,
    touched,
    setValue,
    setError,
    markTouched,
    reset
  };
}
