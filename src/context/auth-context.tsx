import React, { ReactNode, useState } from "react";
import * as auth from "auth-provider";
import { User } from "../pages/project-list/search-panel";
import { http } from "../util/http";
import { useMountHook } from "../hooks/useMountHook";
import { useAsyncHook } from "../hooks/useAsyncHook";
import { FullPageErrorFallback, FullPageLoading } from "../components/lib";

// 组件共享信息
// 给一个 undefined 会让 ts 认为就只能接收 undefined 类型，其实这知识初始值，
// 所以要显示声明类型，不要让 ts 主动推断类型
const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

interface AuthForm {
  username: string;
  password: string;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null);
  const {
    run,
    setData: setUser,
    data: user,
    isLoading,
    isIdle,
    isError,
    error,
  } = useAsyncHook<User | null>();

  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMountHook(async () => {
    // setUser(await run(bootstrapUser()));
    await run(bootstrapUser());
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }
  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  // isSuccess 会往下执行

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuthHook = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthHook必须在AuthProvider中使用");
  }
  return context;
};
