import styled from "styled-components";

const Button = styled.input`
  border: none;
  border-radius: 5px;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  width: 100%;
  font-weight: 600;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? "0.4" : "1")};
`;
export default Button;
