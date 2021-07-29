import { useEffect, useState } from "react";

/**
 * 自定义 hook ，没有用到 useEffect
 * @param value
 */
export const useArrayHook = <T>(initValue: T[]) => {
  const [value, setValue] = useState(initValue);

  return {
    value,
    setValue,
    add: (obj: T) => {
      setValue([...value, obj]);
    },
    clear: () => {
      setValue([]);
    },
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};
