import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProductCard from '../productCard';
import NoProducts from './NoProducts';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
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

  // if(!props.predas) {
  //   return (
  //     <NoProducts />
  //   )
  // }

  const listItems = props.prendas.map((prenda, index) =>
    <Grid key={index} item xs={4}>
      <ProductCard prenda={prenda} setAlert={props.setAlert} />
    </Grid>
  );


  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
          {listItems}
     </Grid>
    </div>
  );
}
