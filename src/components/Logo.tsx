import React from "react";
import styled from "styled-components";
import IGLogo from "../images/instagram_logo.png";

const SLogo = styled.img`
  width: 50px;
`;

const Logo: React.FC = () => {
  return <SLogo src={IGLogo} alt="Instagram Logo" />;
};

export default Logo;
