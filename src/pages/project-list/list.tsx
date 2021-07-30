import { User } from "./search-panel";
import { Table } from "antd";
import dayjs from "dayjs";

interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
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
      rowKey={"id"}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "部门",
          dataIndex: "organization",
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
        {
          title: "创建时间",
          render: (text, record) => {
            return (
              <span>
                {record.created
                  ? dayjs(record.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
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
