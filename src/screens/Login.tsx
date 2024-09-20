import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Separator from "../components/auth/Separator";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import Logo from "../components/Logo";
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";
import { useLocation } from "react-router-dom";
import { LocalState } from "@apollo/client/core/LocalState";
import SubTitle from "../components/auth/Subtitle";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Notification = styled(SubTitle)`
  color: #05c46b;
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

interface LocationState {
  message: string;
  username: string;
  password: string;
}

function Login() {
  const location = useLocation<LocationState>();
  const {
    register,
    watch,
    handleSubmit,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
      result: "",
    },
  });
  const onCompleted = (data: any) => {
    const {
      login: { ok, error, token },
    } = data;

    if (!ok) {
      setError("result", {
        message: error,
      });
    }

    if (token) {
      logUserIn(token);
    }
  };
  const [login, { loading, data, called }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = (data: any) => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();
    login({
      variables: {
        username,
        password,
      },
    });
  };
  const clearLoginError = () => {
    clearErrors("result");
  };
  const onSubmitInvalid = (data: any) => {};
  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <Logo />
        {location?.state?.message && (
          <Notification title={location.state.message} />
        )}
        <form onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}>
          <Input
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username should be longer than 3 chars.",
              },
            })}
            type="text"
            placeholder="Username"
            hasError={Boolean(formState.errors?.username?.message)}
            onFocus={clearLoginError}
          />
          {formState.errors.username && (
            <FormError message={formState.errors.username.message as string} />
          )}
          <Input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Password"
            hasError={Boolean(formState.errors?.password?.message)}
            onFocus={clearLoginError}
          />
          {formState.errors.password && (
            <FormError message={formState.errors.password.message as string} />
          )}
          <Button
            type="submit"
            value={loading ? "Loading..." : "Log in"}
            disabled={!formState.isValid || loading}
          />
          {formState.errors.result && (
            <FormError message={formState.errors.result.message as string} />
          )}{" "}
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        link={routes.signUp}
        linkText="Sign up"
      />
    </AuthLayout>
  );
}
export default Login;
