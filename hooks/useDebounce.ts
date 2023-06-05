import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay?: number) {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value)
    }, delay || 5000)

    return () => {
      clearTimeout(timer);
    }
  }, [value, delay])
  return debounceValue;
}

export default useDebounce