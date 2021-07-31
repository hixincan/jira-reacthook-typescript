import React, { ReactNode } from "react";

export type ErrorType = Error | null;
type FallbackRender = (props: { error: ErrorType }) => React.ReactElement;

// Component<P, S>， P 是props，S 是 state
// {children:ReactNode, fallbackRender: FallbackRender}
// 等价于
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: ErrorType }
> {
  /*constructor(props) {
    super(props);
  }*/

  // state 要与参数中定义的一致
  state = { error: null };

  // 当子组件抛出异常，这里会接收到并且调用；
  // 返回值会赋值给 state
  static getDerivedStateFromError(error: Error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { error };
  }

  componentDidCatch(error: Error) {
    // 你同样可以将错误日志上报给服务器
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    // 正常渲染
    return children;
  }
}
