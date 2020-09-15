import React, {useEffect} from "react";
import { 
  Button,
  Grid,
  Table ,
  TableBody ,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Paper
} from "@material-ui/core";

export default function CartCheckout({cart, onCheckout, getCart }){
  useEffect(() => {
    cart = getCart();
  }, []);


  var total = 0;
  cart.map((prod) => {
    total += prod.amount*prod.price;
  })
  return(
    <Grid item xs>
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Sub-Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map((prod) => (
            <TableRow key={prod.id}>
              <TableCell component="th" scope="row">
                {prod.name}
              </TableCell>
              <TableCell align="right">{prod.amount*prod.price}</TableCell>
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
      <br/>
      <Button onClick={onCheckout}   
	  variant="contained"  
	  color="secondary">
          Checkout
      </Button>
    </Grid>
  )

}
