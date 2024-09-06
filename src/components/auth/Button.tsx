import styled from "styled-components";

const SButton = styled.input`
  border: none;
  margin-top: 12px;
  background-color: ${(props) => props.theme.blue};
  color: white;
  text-align: center;
  padding: 8px 0px;
  width: 100%;
  font-weight: 600;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? "0.4" : "1")};
`;
function Button(props: React.ComponentPropsWithRef<"input">) {
  return <SButton {...props} />;
}

export default Button;
