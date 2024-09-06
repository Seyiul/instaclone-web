import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import { BaseBox } from "../components/shared";
import Button from "../components/auth/Button";
import Separator from "../components/auth/Separator";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import routes from "../routes";
import BottomBox from "../components/auth/BottomBox";

const ImageButton = styled.button`
  border: none;
  background-color: ${(props) => props.theme.blue};
  color: white;
  text-align: center;
  padding: 8px 0px;
  width: 100%;
  font-weight: 600;
  cursor: pointer;
  span {
    margin-left: 5px;
  }
`;

const Logo = styled.div`
  margin-bottom: 20px;
`;
const Text = styled.span`
  font-weight: 600;
  text-align: center;
`;

const Terms = styled.span`
  text-align: center;
  margin-top: 20px;
  color: gray;
  font-weight: 500;
  line-height: 1.8;
`;

function SignUp() {
  return (
    <AuthLayout>
      <FormBox>
        <Logo>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </Logo>
        <Text>Sign up to see photos ans videos</Text>
        <Text>from your friends.</Text>
        <form>
          <ImageButton>
            <FontAwesomeIcon icon={faFacebookSquare} />
            <span>Log in with Facebook</span>
          </ImageButton>
          <Separator />
          <Input type="text" placeholder="Mobile Number or Email" />
          <Input type="text" placeholder="Full Name" />
          <Input type="text" placeholder="Username" />
          <Input type="password" placeholder="Password" />
          <Button type="submit" value="Sign Up" disabled />
        </form>
        <Terms>
          By signing up, you agree to our Terms, Data Policy and Cookies Policy.
        </Terms>
      </FormBox>
      <BottomBox cta="Have an account?" link={routes.home} linkText="Log in" />
    </AuthLayout>
  );
}
export default SignUp;
