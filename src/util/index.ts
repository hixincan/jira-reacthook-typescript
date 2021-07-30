export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

// 不要改变传入的对象
export const cleanObject = (obj: { [key: string]: unknown } = {}) => {
  const result = { ...obj };
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    // 如果用 isFalsy，{checked: false}也会被删除掉
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};
