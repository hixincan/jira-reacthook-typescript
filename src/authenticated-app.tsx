import { ProjectList } from "./pages/project-list";
import { useAuthHook } from "./context/auth-context";

export const AuthenticatedApp = () => {
  const { logout } = useAuthHook();

  return (
    <div>
      <button onClick={logout}>登出</button>
      <ProjectList />
    </div>
  );
};
