import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { cleanObject } from "./index";

/**
 * 返回页面 url中，指定键的参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  // 读取和改变 url 参数值
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    useMemo(() => {
      return keys.reduce((prev, key) => {
        return { ...prev, [key]: searchParams.get(key) || "" };
      }, {} as { [key in K]: string });
    }, [searchParams]),

    // 限制传入的key，必须是 keys 中指定的
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      setSearchParam(o);
    },
  ] as const;
};
