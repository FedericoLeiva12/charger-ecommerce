import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ProductCard from "../productCard";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
export default function CenteredGrid(props) {
  const classes = useStyles();
<<<<<<< HEAD
  const listItems = props.prendas.map((prenda) => (
    <Grid item xs={4}>
=======
  const listItems = props.prendas.map((prenda, index) =>
    <Grid key={index} item xs={4}>
>>>>>>> 4f94419eef5ed58c83a3313f5bc86d71ba60bbcf
      <ProductCard prenda={prenda} />
    </Grid>
  ));

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {listItems}
      </Grid>
    </div>
  );
}
