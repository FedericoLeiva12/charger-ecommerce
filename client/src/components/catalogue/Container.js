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

  const listItems = props.products.map((prod, index) =>
    <Grid key={index} item xs={4}>
      <ProductCard product={prod} setAlert={props.setAlert} addToCart={props.addToCart}
        removeFromCart={props.removeFromCart} />
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
