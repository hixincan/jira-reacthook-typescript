import qs from "qs";
import * as auth from "auth-provider";
import { useAuthHook } from "../context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

/**
 *
 * @param endpoint  url path
 * 因为有解构，不能直接加?，通过默认值让参数变得可选
 */
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
      ...headers,
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  //axios和fetch的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async (res) => {
    if (res.status === 401) {
      // 表示token失效，客户端需要配合服务端退出登录
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: "请重新登录" });
    }
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      // 主动抛出异常；fetch api 不会抛出异常
      return Promise.reject(data);
    }
  });
};

/**
 * hook 只能在 hook 中使用
 * 返回一个函数！！！TODO 为什么要返回函数，而不是直接调用？
 */
export const useHttpHook = () => {
  const { user } = useAuthHook();
  // [string, Config] 类型与http的参数类型是一致的，可以引用 http 的类型，方式如下
  // tuple 类型 TODO
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
