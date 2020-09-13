import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Box,
  Card,
  Typography,
  CardContent,
  Avatar,
  makeStyles,
  Grid,
} from "@material-ui/core";
import PaymentIcon from "@material-ui/icons/Payment";
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import NavBarContainer from '../components/NavBar/Container';
import { useParams } from "react-router-dom";
import { getOrders } from "../store/actions";

const useStyle = makeStyles({
  root: {
    marginTop: '4em'
  },
  card: {
    margin: "2em",
  },
  product: {
    display: "flex",
    alignItems: "center",
    marginTop: "1em",
    marginBottom: "1em",
  },
  process: {
    display: 'flex',
    alignItems: 'center'
  }
});

function OrderPage({orders, getOrders}) {
  const classes = useStyle();

  const { id } = useParams();

  useEffect(() => {
    getOrders()
  }, []);

  const order = orders.filter(order => order.id === parseInt(id))[0];

  const total = 0;

  order.products.foreach(prod => total += prod.price * prod.amount);

  return (
    <><NavBarContainer noTransparent={true}/>
    <Grid container className={classes.root}>
      <Grid xs={6} item>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h3">Order #{order.id}</Typography>
            {order.products.map((prod, index) => (
              <Box key={index} className={classes.product}>
                <Avatar src={prod.imgs[0]} />
                <Typography>- {prod.name} - ${prod.price * prod.amount} ( ${prod.price} x{prod.amount} )</Typography>
              </Box>
            ))}
            <Box>
            <Typography variant="h4">Total: ${total}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={6} item>
        <Card className={classes.card}>
          <CardContent>
            <Typography>
              Status: <Box component="span">Processing</Box>
            </Typography>
            <Box component="div">
              <Box component="div" className={classes.process}>
                <PaymentIcon />
                Payment: {order.state === 'processing'?'Processing...':'Completed'}
              </Box>
              <Box component="div" className={classes.process}>
                <LocalShippingIcon />
                Shipping: {['complete'].includes(order.state)?'Completed':'Waiting'}
              </Box>
              <Box component="div" className={classes.process}>
                <LocalShippingIcon />
                Reception: {['complete'].includes(order.state)?'Completed':'Waiting'}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid></>
  );
}

//  DISABLED FOR DEBUGGING

function mapStateToProps(state) {
     return {
         orders: state.orders
     }
}

function mapDispatchToProps(dispatch) {
     return {
         getOrders: () => dispatch(getOrders())
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
