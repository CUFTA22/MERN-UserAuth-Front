import { Button, TextField } from "@material-ui/core";
import React, { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ErrorNotice from "../ErrorNotice";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState();

  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password, passwordCheck, displayName };
      await axios.post(
        "Your URL/register",
        newUser
      );
      await axios
        .post("Your URL/login", {
          email,
          password,
        })
        .then((res) => {
          setUser({
            token: res.data.token,
            user: res.data.user,
          });
          localStorage.setItem("auth-token", res.data.token);
          history.push("/");
        });
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="page">
      <h2>Register</h2>
      <form className="form" autoComplete="on" onSubmit={submit}>
        {error && (
          <ErrorNotice message={error} clear={() => setError(undefined)} />
        )}
        <TextField
          onChange={(e) => setDisplayName(e.target.value)}
          label="Display Name"
          variant="standard"
        />
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          label="E-mail"
          variant="standard"
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          label="Password"
          variant="standard"
        />
        <TextField
          onChange={(e) => setPasswordCheck(e.target.value)}
          type="password"
          label="Repeat Password"
          variant="standard"
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default RegisterPage;
