import {
  faFacebook,
  faFacebookF,
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const WhiteBox = styled.div`
  background-color: white;
  border: 1px solid rgb(219, 219, 219);
  width: 100%;
`;

const TopBox = styled(WhiteBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 40px 25px 40px;
  margin-bottom: 10px;
  form {
    margin-top: 35px;
    width: 100%;
    display: flex;
    justify-items: center;
    flex-direction: column;
    align-items: center;
  }
`;

const Input = styled.input`
  width: 100%;
  border-radius: 3px;
  padding: 7px;
  background-color: #fafafa;
  border: 0.5px solid rgb(219, 219, 219);
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
`;

const Button = styled.input`
  border: none;
  margin-top: 12px;
  background-color: ${(props) => props.theme.blue};
  color: white;
  text-align: center;
  padding: 8px 0px;
  width: 100%;
  font-weight: 600;
  cursor: pointer;
  &:disabled {
    opacity: 0.4;
  }
`;

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

const BottomBox = styled(WhiteBox)`
  padding: 20px 0px;
  text-align: center;
  a {
    font-weight: 600;
    color: ${(props) => props.theme.blue};
    margin-left: 5px;
  }
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const Separator = styled.div`
  margin: 20px 0px 30px 0px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  div {
    width: 100%;
    height: 1px;
    background-color: rgb(219, 219, 219);
  }
  span {
    margin: 0px 10px;
    font-weight: 600;
    color: #8e8e8e;
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
    <Container>
      <Wrapper>
        <TopBox>
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
            <Separator>
              <div></div>
              <span>Or</span>
              <div></div>
            </Separator>
            <Input type="text" placeholder="Mobile Number or Email" />
            <Input type="text" placeholder="Full Name" />
            <Input type="text" placeholder="Username" />
            <Input type="password" placeholder="Password" />
            <Button type="submit" value="Sign Up" disabled />
          </form>
          <Terms>
            By signing up, you agree to our Terms, Data Policy and Cookies
            Policy.
          </Terms>
        </TopBox>
        <BottomBox>
          <span>Have an account?</span> <Link to="/">Login</Link>
        </BottomBox>
      </Wrapper>
    </Container>
  );
}
export default SignUp;
