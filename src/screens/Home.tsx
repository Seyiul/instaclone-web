import React from "react";
import { isLoggedInVar, logUserOut } from "../apollo";
import { useHistory } from "react-router-dom";
type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  const history = useHistory();
  return (
    <div>
      <h1>Welcome to Home</h1>
      <button onClick={() => logUserOut(history)}>Log out🥹</button>
    </div>
  );
};

export default Home;
