import { useEffect } from "react";

export const useMountHook = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint 认为用到了 callback 但依赖项没有传入，可能是个错误
    // 如下方式禁止eslint报错
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
