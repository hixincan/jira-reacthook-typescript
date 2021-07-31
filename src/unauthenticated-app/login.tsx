import { useAuthHook } from "../context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsyncHook } from "../hooks/useAsyncHook";
import { on } from "cluster";

export const Login = ({ onError }: { onError: (error: Error) => void }) => {
  // 可以全局读取 user 信息，和这些auth方法
  const { login } = useAuthHook();
  const { run, isLoading } = useAsyncHook(undefined, { throwOnError: true });

  /*const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
  };*/

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    // run(login(values).catch(onError));//这里的catch先执行，run内的catch就没有机会执行了
    // 换种 try-catch 写法

    try {
      await run(login(values));
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
      <Form.Item>
        <LongButton loading={isLoading} type={"primary"} htmlType={"submit"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
