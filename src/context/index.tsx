// 项目根节点
import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";
import { QueryClient, QueryClientProvider } from "react-query";
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
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>{children}</AuthProvider>;
    </QueryClientProvider>
  );
};
