import { useAuthHook } from "../context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsyncHook } from "../hooks/useAsyncHook";
import { useDocumentTitleHook } from "../hooks/useDocumentTitleHook";

export const Register = ({ onError }: { onError: (error: Error) => void }) => {
  useDocumentTitleHook("注册");

  // 可以全局读取 user 信息，和这些auth方法
  const { register } = useAuthHook();
  const { run, isLoading } = useAsyncHook(undefined, { throwOnError: true });
  /*const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    register({ username, password });
  };*/

  const handleSubmit = async ({
    rePassword,
    ...values
  }: {
    username: string;
    password: string;
    rePassword: string;
  }) => {
    if (rePassword !== values.password) {
      onError(new Error("请确认两次输入的密码相同"));
      return;
    }
    // register(values).catch(onError)
    // 等价于如下，但注意，上面是异步的，必须是 await，不然错了也捕获不到，try-catch 的坑
    try {
      await run(register(values));
    } catch (err) {
      onError(err);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input type="text" placeholder={"输入用户名"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type="password" placeholder={"输入密码"} />
      </Form.Item>
      <Form.Item
        name={"rePassword"}
        rules={[{ required: true, message: "请输入确认密码" }]}
      >
        <Input type="password" placeholder={"确认密码"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type={"primary"} htmlType={"submit"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
