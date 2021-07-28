import { User } from "./search-panel";

interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
}

interface ListProps {
  list: Project[];
  users: User[];
}

export const List = ({ list, users }: ListProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((proj) => (
          <tr key={proj.id}>
            <td>{proj.name}</td>
            <td>
              {users.find((user) => user.id === proj.personId)?.name || "未知"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
