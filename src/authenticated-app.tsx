import { ProjectList } from "./pages/project-list";
import { useAuthHook } from "./context/auth-context";
import { Button, Dropdown, Menu } from "antd";
import styled from "@emotion/styled";
import { Row } from "./components/lib";

import { ReactComponent as Logo } from "assets/jira-software-logo.svg";

export const AuthenticatedApp = () => {
  const { logout, user } = useAuthHook();

  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <Logo width={"18rem"} color={"rgb(38, 132, 255)"} />
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={"logout"}>
                  <a onClick={logout}>登出</a>
                </Menu.Item>
              </Menu>
            }
          >
            <a onClick={(e) => e.preventDefault()}>Hi, {user?.name}</a>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectList />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
`;
const Main = styled.main``;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
