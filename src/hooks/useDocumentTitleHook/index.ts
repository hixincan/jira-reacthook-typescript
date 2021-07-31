import { useEffect } from "react";

export const useDocumentTitleHook = (title: string) => {
  // const oldTitle = document.title;
  // console.log('渲染时的oldTitle', oldTitle)

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    // 返回一个函数，在组件销毁时调用
    return () => {
      // console.log('卸载时的oldTitle', oldTitle)
      document.title = "";
    };
  }, [title]);
};
