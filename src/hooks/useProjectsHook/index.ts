import { useEffect } from "react";
import { cleanObject } from "../../util";
import { useHttpHook } from "../../util/http";
import { useAsyncHook } from "../useAsyncHook";
import { Project } from "../../pages/project-list/list";

export const useProjectsHook = (param?: Partial<Project>) => {
  const http = useHttpHook();
  const { run, ...result } = useAsyncHook<Project[]>();

  useEffect(() => {
    run(http("projects", { data: cleanObject(param) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
