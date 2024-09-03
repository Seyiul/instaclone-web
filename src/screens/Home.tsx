import React from "react";
import { StateUpdater } from "../types";

type HomeProps = {
  setIsLoggedIn: StateUpdater<boolean>;
};

const Home: React.FC<HomeProps> = ({ setIsLoggedIn }) => {
  return (
    <div>
      <h1>Welcome to Home</h1>
      <button onClick={() => setIsLoggedIn(false)}>Logout</button>
    </div>
  );
};

export default Home;
