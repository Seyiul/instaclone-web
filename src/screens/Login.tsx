import React from "react";
import { StateUpdater } from "../types";

type LoginProps = {
  setIsLoggedIn: StateUpdater<boolean>;
};

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => setIsLoggedIn(true)}>Login</button>
    </div>
  );
};

export default Login;
