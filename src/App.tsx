import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";

function App() {
  const isLoggedIn = false;
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Home /> : <Login />}
        </Route>
        <Route path="/example">
          <h1>Ex</h1>
          {!isLoggedIn ? "Plz, login" : null}
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
