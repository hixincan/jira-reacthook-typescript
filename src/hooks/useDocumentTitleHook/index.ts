import { useEffect, useRef } from "react";

export const useDocumentTitleHook = (title: string, keepOnUnmount = false) => {
  const initTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
    return () => {
      if (!keepOnUnmount) {
        document.title = initTitle;
      }
      /*else {
        document.title = "";
      }*/
    };
  }, [title]);
};
