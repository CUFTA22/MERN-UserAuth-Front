import { Button, TextField } from "@material-ui/core";
import React, { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ErrorNotice from "../ErrorNotice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      // Logs user in and gives us JWT
      const loginRes = await axios.post(
        "Your URL/user/login",
        {
          email,
          password,
        }
      );

      setUser({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (error) {
      error.response.data.msg && setError(error.response.data.msg);
    }
  };

  return (
    <div className="page">
      <h2>Log In</h2>
      <form className="form" onSubmit={submit}>
        {error && (
          <ErrorNotice message={error} clear={() => setError(undefined)} />
        )}
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          label="E-mail"
          variant="standard"
          name="email"
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          label="Password"
          variant="standard"
          name="password"
        />

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default LoginPage;
