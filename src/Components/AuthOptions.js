import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import TodoContext from "../context/TodoContext";
import UserContext from "../context/UserContext";

const AuthOptions = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const { setTodoArray } = useContext(TodoContext);

  const logout = () => {
    setUser({
      token: undefined,
      user: undefined,
    });
    setTodoArray([]);
    localStorage.setItem("auth-token", "");
  };

  return (
    <nav>
      {user.user ? (
        <Button onClick={logout}>Log Out</Button>
      ) : (
        <>
          <Button onClick={() => history.push("/register")}>Register</Button>
          <Button onClick={() => history.push("/login")}>Log In</Button>
        </>
      )}
    </nav>
  );
};

export default AuthOptions;
