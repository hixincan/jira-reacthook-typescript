import { useEffect } from "react";

export const useMountHook = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};
