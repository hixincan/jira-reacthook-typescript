import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  error: null,
  data: null,
  stat: "idle",
};

export const useAsyncHook = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

  const setData = (data: D) => {
    setState({
      data,
      error: null,
      stat: "success",
    });
  };

  const setError = (error: Error) => {
    setState({
      data: null,
      error,
      stat: "error",
    });
  };

  // run 用来触发异步请求
  const run = (promise: Promise<D>) => {
    // ts 不会在静态阶段报错吗？
    if (!promise || !promise.then) {
      throw new Error("请传入Promise类型数据");
    }
    setState({ ...state, stat: "loading" });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((err) => {
        setError(err);
        return err;
      });
  };

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
