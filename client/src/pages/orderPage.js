import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Box,
  Card,
  Typography,
  CardContent,
  Avatar,
  makeStyles,
  Grid,
  Modal,
  Button,
} from "@material-ui/core";
import PaymentIcon from "@material-ui/icons/Payment";
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import NavBarContainer from '../components/NavBar/Container';
import CreateReview from '../components/CreateReview';
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

function OrderPage({user, orders, getOrders}) {
  const classes = useStyle();

  const { id } = useParams();

  const [order, setOrder] = useState(null);

  const [open, setOpen] = React.useState(false);

  const [p, setP] = React.useState(0);

  const handleOpen = (productId) => {
    setOpen(true);
    setP(productId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if(user)
        getOrders(user.id);
  }, [user]);

  useEffect(() => {
    if(orders)
      setOrder(
        orders.map(order => (
          {
            ...order,
            shoppingCard: undefined,
            products: order.shoppingCart.content
          }
        )).filter(order => {console.log(order.id, id); return order.id === id})[0]);
      console.log(order)
  }, [orders]);

  let total = 0;

  

  if(order !== null && order !== undefined) {
    console.log(order)
  order.products.map(prod => {total += prod.price * prod.amount; return prod;});
  return (
    <><NavBarContainer noTransparent={true}/>
    <Grid container className={classes.root}>
      <Grid xs={6} item>
        <Card className={classes.card}>
          <CardContent>
            <Box>
              <Typography variant="h4">Total: ${total}</Typography>
            </Box>
            {order.products.map((prod, index) => (
	      <>
              <Box key={index} className={classes.product}>
                <Avatar src={prod.image} />
                <Typography>- {prod.name} - ${prod.price * prod.amount} ( ${prod.price} x{prod.amount} )</Typography>
              </Box>
	      <Box>
		<Button type="button" variant="contained" color="secondary" onClick={() => handleOpen(prod.id)}>
        		Create Review
      		</Button>

	      </Box>
	      </>
            ))}
            <Box>
              <Typography>#{order.id}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={6} item>
        <Card className={classes.card}>
          <CardContent>
            <Typography>
            Status: <Box component="span">{order.state.split('').map((l, i) => i===0?l.toUpperCase():l).join('')}</Box>
            </Typography>
            <Box component="div">
              <Box component="div" className={classes.process}>
                <PaymentIcon />
                Payment: {order.state === 'pending'?'Processing...':'Completed'}
              </Box>
              <Box component="div" className={classes.process}>
                <LocalShippingIcon />
                Shipping: {order.state === 'shipping'?'Shipping':order.state==='complete'?'Completed':'Waiting'}
              </Box>
              <Box component="div" className={classes.process}>
                <LocalShippingIcon />
                Reception: {order.state === 'complete'?'Completed':'Waiting'}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>

      </Grid>
    </Grid>
      <Modal
	open={open}
	onClose={handleClose}>
	<div>
		<CreateReview userId={user.id} productId={p}/>
	</div>
    </Modal> </>
  )} else {
    return (<Box>
      No orders
    </Box>)
  }
}

//  DISABLED FOR DEBUGGING

function mapStateToProps(state) {
     return {
         orders: state.orders,
         user: state.user
     }
}

function mapDispatchToProps(dispatch) {
     return {
         getOrders: (userId) => dispatch(getOrders(userId))
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
