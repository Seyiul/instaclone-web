import React, { useState } from "react";
import { darkModeVar, isLoggedInVar } from "../apollo";
import styled from "styled-components";

interface ITitleProps {
  potato: boolean;
}

type LoginProps = {};

const Title = styled.h1<ITitleProps>`
  color: ${(props) => props.theme.fontColor};
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;

const Button = styled.button`
  color: violet;
`;

const Login: React.FC<LoginProps> = ({}) => {
  const [potato, setPotato] = useState<boolean>(false);
  const togglePotato = () => setPotato((current: boolean) => !current);

  return (
    <Container>
      <Title potato={potato}>Login</Title>
      <Button onClick={() => darkModeVar(true)}>To Dark</Button>
      <Button onClick={() => darkModeVar(false)}>To Light</Button>
      <Button onClick={() => isLoggedInVar(true)}>Log in now!</Button>
    </Container>
  );
};

export default Login;
