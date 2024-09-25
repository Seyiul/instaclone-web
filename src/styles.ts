import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

export const lightTheme: DefaultTheme = {
  blue: "#0095f6",
  borderColor: "rgb(219, 219, 219)",
  fontColor: "#2c2c2c",
  bgColor: "#FAFAFA",
  accent: "#0095f6",
};

export const darkTheme: DefaultTheme = {
  blue: "#0095f6",
  fontColor: "#FAFAFA",
  bgColor: "#2c2c2c",
  borderColor: "rgb(219, 219, 219)",
  accent: "#0095f6",
};

export const GlobalStyles = createGlobalStyle`
    ${reset};
    input{
        all:unset;
    }
    * {
        box-sizing: border-box;
    }
    body{
        background-color: ${(props) => props.theme.bgColor};
        font-size: 14px;
        font-family: "Open Sans", sans-serif;
        color: ${(props) => props.theme.fontColor};
    }
    a{
        text-decoration: none;
    }
`;
