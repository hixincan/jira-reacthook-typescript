import { useState } from "react";
import { Register } from "./register";
import { Login } from "./login";

export const UnappenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);

  const handleClick = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div>
      {isRegister ? <Register /> : <Login />}
      <button onClick={handleClick}>
        切换到{isRegister ? "登录" : "注册"}
      </button>
    </div>
  );
};
