import { useEffect } from "react";

export const useMountHook = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};
