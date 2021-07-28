export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

// 不要改变传入的对象
export const cleanObject = (obj: object = {}) => {
  const result = { ...obj };
  Object.keys(obj).forEach((key) => {
    // @ts-ignore
    const value = obj[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};
