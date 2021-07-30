import { useState } from "react";
import { Register } from "./register";
import { Login } from "./login";
import { Button, Card, Divider } from "antd";
import styled from "@emotion/styled";

export const UnappenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);

  const handleClick = () => {
    setIsRegister(!isRegister);
  };

  return (
    <Container>
      <ShadowCard>
        <Title>{isRegister ? "请注册" : "请登录"}</Title>
        {isRegister ? <Register /> : <Login />}
        <Divider />
        <Button type={"link"} onClick={handleClick}>
          {isRegister ? "已经有账号了？直接登录" : "没有账号？注册新账号"}
        </Button>
        {/*<a onClick={handleClick}>
          {isRegister ? "已经有账号了？直接登录" : "没有账号？注册新账号"}
        </a>*/}
      </ShadowCard>
    </Container>
  );
};

export const LongButton = styled(Button)`
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;
