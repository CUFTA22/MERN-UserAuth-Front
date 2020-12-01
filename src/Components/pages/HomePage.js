import { IconButton, InputBase, makeStyles, Paper } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import UserContext from "../../context/UserContext";
import TodoContext from "../../context/TodoContext";
import TodoItem from "../TodoItem";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const { todoArray, setTodoArray } = useContext(TodoContext);

  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await axios.get(
        "Your URL",
        {
          headers: { "x-auth-token": user.token },
        }
      );
      setTodoArray(res.data);
    };
    fetchTodos();
  }, [user.token, setTodoArray]);

  const handlePost = (e) => {
    e.preventDefault();
    try {
      axios
        .post(
          "Your URL",
          {
            title: input,
            userId: user.user.id,
          },
          {
            headers: { "x-auth-token": user.token },
          }
        )
        .then((res) => {
          setInput("");
          setTodoArray([...todoArray, res.data]);
        });
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  return (
    <div className="todoList">
      <h2>Welcome {user.user?.displayName}</h2>

      <Paper onSubmit={handlePost} component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Add Todo Item"
          inputProps={{ "aria-label": "search google maps" }}
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <IconButton
          color="primary"
          className={classes.iconButton}
          aria-label="directions"
          onClick={handlePost}
        >
          <Add />
        </IconButton>
      </Paper>

      <div className="todoItems">
        {todoArray?.map((todo) => (
          <TodoItem
            key={todo._id}
            completed={todo.completed}
            title={todo.title}
            todoId={todo._id}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
