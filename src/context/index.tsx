// 项目根节点
import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";

/*
  形式1
  <div>
    <label></label>
    <input />
  </div>
  等价于形式2
  <div children={<>
    <label></label>
    <input />
  </>} />

  形式1的写法更具扩展性



*/
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
