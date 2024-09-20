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
import { useHistory } from "react-router-dom";
import SubTitle from "../components/auth/Subtitle";

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

const Terms = styled.span`
  text-align: center;
  margin-top: 20px;
  color: gray;
  font-weight: 500;
  line-height: 1.8;
  font-size: 11px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

function SignUp() {
  const history = useHistory();
  const onCompleted = (data: any) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;

    if (!ok) {
      setError("result", {
        message: error,
      });
    }

    history.push(routes.home, {
      message: "Account created. Please log in.",
      username,
      password,
    });
  };

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const {
    register,
    handleSubmit,
    formState,
    setError,
    clearErrors,
    getValues,
  } = useForm({
    mode: "onChange",
  });

  const onSubmitValid = (data: any) => {
    if (loading) {
      return;
    }

    createAccount({
      variables: {
        ...data,
      },
    });
  };

  const clearError = () => {
    clearErrors("result");
  };
  return (
    <AuthLayout>
      <PageTitle title="Sign Up" />
      <FormBox>
        <HeaderContainer>
          <Logo />
          <SubTitle title="Sign up to see photos ans videos from your friends." />
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
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            })}
            type="text"
            placeholder="Email"
            hasError={Boolean(formState.errors?.email?.message)}
            onFocus={clearError}
          />
          {formState.errors.email && (
            <FormError message={formState.errors.email.message as string} />
          )}
          <Input
            {...register("firstName", {
              required: "First Name is required",
            })}
            type="text"
            placeholder="First Name"
            hasError={Boolean(formState.errors?.firstName?.message)}
            onFocus={clearError}
          />
          {formState.errors.firstName && (
            <FormError message={formState.errors.firstName.message as string} />
          )}
          <Input
            {...register("lastName", {})}
            type="text"
            placeholder="Last Name"
            hasError={Boolean(formState.errors?.lastName?.message)}
            onFocus={clearError}
          />
          {formState.errors.lastName && (
            <FormError message={formState.errors.lastName.message as string} />
          )}
          <Input
            {...register("username", {
              required: "Username is required",
            })}
            type="text"
            placeholder="Username"
            hasError={Boolean(formState.errors?.username?.message)}
            onFocus={clearError}
          />
          {formState.errors.username && (
            <FormError message={formState.errors.username.message as string} />
          )}
          <Input
            {...register("password", {
              required: "Password is required",
            })}
            type="password"
            placeholder="Password"
            hasError={Boolean(formState.errors?.password?.message)}
            onFocus={clearError}
          />
          {formState.errors.password && (
            <FormError message={formState.errors.password.message as string} />
          )}
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
