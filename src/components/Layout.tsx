import { ReactNode } from "react";
import Header from "./Header";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Content = styled.main`
  margin: 0 auto;
  margin-top: 45px;
  max-width: 930px;
`;

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Container>
        <Content>{children}</Content>
      </Container>
    </>
  );
}

export default Layout;
