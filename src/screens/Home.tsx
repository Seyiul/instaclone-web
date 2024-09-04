import React from "react";
import { isLoggedInVar } from "../apollo";
type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  return (
    <div>
      <h1>Welcome to Home</h1>
      <button onClick={() => isLoggedInVar(false)}>Log out🥹</button>
    </div>
  );
};

export default Home;
