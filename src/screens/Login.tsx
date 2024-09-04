import React, { useState } from "react";
import { isLoggedInVar } from "../apollo";
import styled from "styled-components";
import PropTypes from "prop-types";

interface ITitleProps {
  potato: boolean;
}

type LoginProps = {};

const Title = styled.h1<ITitleProps>`
  color: ${(props) => (props.potato ? "tomato" : "palevioletred")};
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const Container = styled.div`
  background-color: bisque;
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
      <Button onClick={togglePotato}>Toggle!</Button>
      <Button onClick={() => isLoggedInVar(true)}>Log in now!</Button>
    </Container>
  );
};

export default Login;
