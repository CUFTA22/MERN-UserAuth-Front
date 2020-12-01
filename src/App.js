import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./Components/pages/HomePage";
import LoginPage from "./Components/pages/LoginPage";
import RegisterPage from "./Components/pages/RegisterPage";
import Header from "./Components/layout/Header";
import UserContext from "./context/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";
import TodoContext from "./context/TodoContext";

function App() {
  const [user, setUser] = useState({
    token: undefined,
    user: undefined,
  });
  const [todoArray, setTodoArray] = useState([]);

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        "Your URL/user/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await axios.get(
          "Your URL/user/",
          {
            headers: { "x-auth-token": token },
          }
        );
        setUser({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <TodoContext.Provider value={{ todoArray, setTodoArray }}>
            <Header />
            <Switch>
              <Route
                exact
                path="/"
                render={() =>
                  !user.user ? <Redirect to="/login" /> : <HomePage />
                }
              />
              <Route
                exact
                path="/login"
                render={() => (user.user ? <Redirect to="/" /> : <LoginPage />)}
              />
              <Route exact path="/register" component={RegisterPage} />
            </Switch>
          </TodoContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
