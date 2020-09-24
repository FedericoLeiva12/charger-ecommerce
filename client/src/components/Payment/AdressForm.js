import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function OrderForm() {
  const classes = useStyles();

  return (
    <>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <Grid></Grid>
          <TextField
            label="Adress"
            value=""
            placeholder="0"
            helperText="Complete the shipping adress"
            fullWidth
            margin="normal"
            color="secondary"
          />
        </div>
      </form>
    </>
  );
}
