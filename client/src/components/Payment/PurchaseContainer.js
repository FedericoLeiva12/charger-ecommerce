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
  Divider,
} from "@material-ui/core";
import { useParams } from "react-router-dom";

const useStyle = makeStyles({
  root: {
    marginTop: "4em",
    background: "#3d3d3d",
    height: "90.8vh",
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
    display: "flex",
    alignItems: "center",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function PurchaseContainer({ user, orders, getOrders }) {
  const classes = useStyle();
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (user) getOrders(user.id);
  }, [user]);

  useEffect(() => {
    if (orders)
      setOrder(
        orders
          .map((order) => ({
            ...order,
            shoppingCard: undefined,
            products: order.shoppingCart.content,
          }))
          .filter((order) => {
            console.log(order.id, id);
            return order.id === id;
          })[0]
      );
  }, [orders]);

  let total = 0;
  if (order !== null && order !== undefined) {
    order.products.map((prod) => {
      total += prod.price * prod.amount;
      return prod;
    });
  }
  return (
    <>
      <Grid container className={classes.root}>
        <Grid xs={6} item>
          <Card className={classes.card}>
            <CardContent>
              <Box>
                <Typography>Order: #{order && order.id}</Typography>
              </Box>
              {order.products.map((prod, index) => (
                <>
                  <Box key={index} className={classes.product}>
                    <Avatar src={prod.image} style={{ marginRight: "8px" }} />
                    <Typography>
                      {" "}
                      {prod.name} - ${prod.price * prod.amount} ( ${prod.price}{" "}
                      x{prod.amount} )
                    </Typography>
                  </Box>
                </>
              ))}
              <Box
                mt={1}
                style={{ maxWidth: "100%" }}
                display="flex"
                justifyContent="flex-end"
              >
                <Divider />
                <Typography variant="h5">Total: ${total}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
