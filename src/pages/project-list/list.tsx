import { User } from "./search-panel";
import { Table } from "antd";

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
    <Table
      pagination={false}
      dataSource={list}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          dataIndex: "personId",
          render: (text, record) => {
            return (
              users.find((user) => user.id === record.personId)?.name || "未知"
            );
          },
        },
      ]}
    />
  );

  /*return (
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
  );*/
};
