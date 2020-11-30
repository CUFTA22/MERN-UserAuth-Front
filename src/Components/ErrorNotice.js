import { Fab, makeStyles } from "@material-ui/core";
import { CloseRounded } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "none",
    boxShadow: "none",
    width: 36,
    height: 36,
    color: "white",

    "&:hover": {
      background: "rgba(31, 31, 31, 0.068);",
    },
  },
}));

const ErrorNotice = ({ message, clear }) => {
  const classes = useStyles();
  return (
    <div className="errorNotice">
      <span>{message}</span>
      <Fab
        className={classes.root}
        onClick={clear}
        size="small"
        aria-label="add"
      >
        <CloseRounded />
      </Fab>
    </div>
  );
};

export default ErrorNotice;
