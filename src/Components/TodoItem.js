import { IconButton, Paper } from "@material-ui/core";
import { Check, Delete } from "@material-ui/icons";
import axios from "axios";
import React, { useContext } from "react";
import TodoContext from "../context/TodoContext";
import UserContext from "../context/UserContext";

const TodoItem = ({ title, todoId, completed }) => {
  const { user } = useContext(UserContext);
  const { todoArray, setTodoArray } = useContext(TodoContext);

  const handleDelete = async () => {
    let token = user.token;
    const deletedTodo = await axios.post(
      "https://todoapp-backend6.herokuapp.com/todo/delete",
      null,
      {
        params: { id: todoId },
        headers: { "x-auth-token": token },
      }
    );
    setTodoArray(todoArray.filter((item) => item._id !== deletedTodo.data._id));
  };

  const handleUpdate = async () => {
    let token = user.token;
    await axios.post(
      "https://todoapp-backend6.herokuapp.com/todo/update",
      null,
      {
        params: { id: todoId },
        headers: { "x-auth-token": token },
      }
    );
    setTodoArray(
      todoArray.map((item) => {
        console.log(item._id === todoId);
        if (item._id === todoId) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  return (
    <Paper className={`${completed && "todoItem-completed"} todoItem`}>
      <p>{title}</p>
      <div>
        <IconButton color="primary" onClick={handleUpdate}>
          <Check />
        </IconButton>
        <IconButton color="secondary" onClick={handleDelete}>
          <Delete />
        </IconButton>
      </div>
    </Paper>
  );
};

export default TodoItem;
