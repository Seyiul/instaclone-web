import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Separator from "../components/auth/Separator";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import routes from "../routes";
import BottomBox from "../components/auth/BottomBox";
import { FatLink } from "../components/shared";
import PageTitle from "../components/PageTitle";
import Logo from "../components/Logo";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";

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

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SubTitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const Terms = styled.span`
  text-align: center;
  margin-top: 20px;
  color: gray;
  font-weight: 500;
  line-height: 1.8;
  font-size: 11px;
`;

function SignUp() {
  const { register, handleSubmit, formState, setError } = useForm({
    mode: "onBlur",
  });
  const SIGNUP_MUTATION = gql`
    mutation createAccount(
      $firstName: String!
      $lastName: String
      $username: String!
      $email: String!
      $password: String
    ) {
      createAccount(
        firstName: $firstName
        lastName: $lastName
        username: $username
        email: $email
        password: $password
      ) {
        ok
        token
        error
      }
    }
  `;

  const onCompleted = (data: any) => {
    const {
      createAccount: { ok, error, token },
    } = data;

    if (!ok) {
      setError("result", {
        message: error,
      });
    }
  };

  const [signup, { loading }] = useMutation(SIGNUP_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = () => {
    if (loading) return;
  };
  return (
    <AuthLayout>
      <PageTitle title="Sign Up" />
      <FormBox>
        <HeaderContainer>
          <Logo />
          <SubTitle>
            Sign up to see photos ans videos from your friends.
          </SubTitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <ImageButton>
            <FontAwesomeIcon icon={faFacebookSquare} />
            <span>Log in with Facebook</span>
          </ImageButton>
          <Separator />
          <Input
            {...register("email", {
              required: "Email is required",
            })}
            type="text"
            placeholder="Email"
          />
          <Input
            {...register("firstName", {
              required: "First Name is required",
            })}
            type="text"
            placeholder="First Name"
          />
          <Input
            {...register("lastName", {})}
            type="text"
            placeholder="Last Name"
          />
          <Input
            {...register("username", {
              required: "Username is required",
            })}
            type="text"
            placeholder="Username"
          />
          <Input
            {...register("password", {
              required: "Password is required",
            })}
            type="password"
            placeholder="Password"
          />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign Up"}
            disabled={!formState.isValid || loading}
          />
          {formState.errors.result && (
            <FormError message={formState.errors.result.message as string} />
          )}{" "}
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
