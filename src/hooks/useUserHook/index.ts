import { User } from "../../pages/project-list/search-panel";
import { useHttpHook } from "../../util/http";
import { useAsyncHook } from "../useAsyncHook";
import { Project } from "../../pages/project-list/list";
import { useMountHook } from "../useMountHook";
import { useState } from "react";

export const useUserHook = (param?: Partial<User>) => {
  const http = useHttpHook();
  const { run, ...result } = useAsyncHook<Project[]>();
  const [users, setUsers] = useState([]);

  useMountHook(() => {
    http("users").then(setUsers);
    /*fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) {
        // 把数据保存下来
        setUsers(await res.json());
      }
    });*/
  });

  return {
    ...result,
    users,
  };
};
