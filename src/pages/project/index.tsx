import { Link } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router";
import { TaskGroup } from "../TaskGroup";
import { TaskBoard } from "../TaskBoard";

export const Project = () => {
  return (
    <div>
      <Link to={"taskBoard"}>看板</Link>
      <Link to={"taskGroup"}>任务组</Link>
      <Routes>
        {/*对应路由 /projects/:projectId/task-board*/}
        <Route path={"task-board"} element={<TaskBoard />} />
        {/*对应路由 /projects/:projectId/task-group*/}
        <Route path={"task-group"} element={<TaskGroup />} />
        {/* 如果路由不匹配上述规则，给出一个默认规则 */}
        <Navigate to={window.location.pathname + "/task-board"}></Navigate>
      </Routes>
    </div>
  );
};
