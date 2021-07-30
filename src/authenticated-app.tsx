import { ProjectList } from "./pages/project-list";
import { useAuthHook } from "./context/auth-context";
import { Button } from "antd";

export const AuthenticatedApp = () => {
  const { logout } = useAuthHook();

  return (
    <div>
      <Button onClick={logout}>登出</Button>
      <ProjectList />
    </div>
  );
};
