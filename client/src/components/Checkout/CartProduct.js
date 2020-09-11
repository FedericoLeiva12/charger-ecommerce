import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '5px',
    marginBottom: '5px'
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 90,
    height: 90,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

export default function CartProduct({product, onClose}) {
  const classes = useStyles();

  const [amount, setAmount] = useState(1);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                /*alt="complex"*/
                src={product.imgs[0].url}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {product.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {product.description}
                </Typography>
                {/*<Typography variant="body2" color="textSecondary">
                  ID: 1030114
                </Typography>*/}
              </Grid>
              {/* <Grid item>
                <Typography variant="body2" style={{ cursor: "pointer" }}>
                  Remove
                </Typography>
              </Grid> */}
            </Grid>
            <Grid item style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
              <Grid item style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button onClick={onClose}>
                  <DeleteForeverIcon fontSize="large"/>
                </Button>
              </Grid>
              <Grid item style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Button onClick={e => setAmount(amount<product.stock?amount + 1:amount)}>
                  <AddCircleIcon />
                </Button>
                <div style={{color: '#eee', padding: '5px', borderRadius: '5px'}}>
                  x{amount}
                  <span style={{borderLeft: '1px solid #eee', textAlign: 'center', marginLeft: '5px', paddingLeft: '5px'}}>
                    ${product.price * amount}
                  </span>
                </div>
                <Button onClick={e => setAmount(amount>1?amount - 1:amount)}>
                  <RemoveCircleIcon />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
