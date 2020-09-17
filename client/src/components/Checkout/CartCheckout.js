import React, { useEffect } from "react";
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Paper,
} from "@material-ui/core";
import CartProduct from "./CartProduct";

export default function CartCheckout({ cart, onCheckout, getCart, addToCart, removeFromCart, deleteFromCart}) {
  useEffect(() => {
    getCart();
    
  }, []);
  var total = 0;
  cart.map((prod) => {
    total += prod.amount * prod.price;
  });
 
  return (
    <Grid item xs={12}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Product</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Sub-Total</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((prod) => (
              <TableRow key={prod.id}>
                <CartProduct
                  key={prod.id}
                  onClose={() => {
                    deleteFromCart(prod);
                  }}
                  product={prod}
		  addToCart={addToCart}
		  removeFromCart={removeFromCart}
                />
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">{total}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <br />
      <Button onClick={onCheckout} variant="contained" color="secondary">
        Checkout
      </Button>
    </Grid>
  );
}
