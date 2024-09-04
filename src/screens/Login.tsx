import styled from "styled-components";

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;

const Login = () => {
  return (
    <Container>
      <Title>Login</Title>
    </Container>
  );
};

export default Login;
