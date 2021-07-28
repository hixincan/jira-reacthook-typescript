import { useEffect, useState } from "react";

export const useDebounceHook = <S>(value: S, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // TODO 关键是 返回
    return () => clearTimeout(timeout);
  }, [value]);
  return debouncedValue;
};
