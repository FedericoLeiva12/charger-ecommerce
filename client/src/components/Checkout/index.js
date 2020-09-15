import React, { useEffect } from "react";
import NavBarCOntainer from "../NavBar/Container";
import { connect } from "react-redux";
import { getProducts, getCart, addToCart, removeFromCart, checkout } from "../../store/actions";
import CartProduct from "./CartProduct";
import CartCheckout from "./CartCheckout";

import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Button, Grid, Box} from "@material-ui/core";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});


function Checkout({ cart, getCart, addToCart, removeFromCart, onCheckout }) {
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <NavBarCOntainer />
      <div style={{ paddingTop: 64 }}></div>
      <ThemeProvider theme={darkTheme}>
	<Box mt={4}>

        <Grid
	  container
	  direction="row"
	  justify="space-around"
	  alignItems="center">
          {cart.length > 0 ? (
            /* WHEN THE CLIENT HAVE PRODUCTS IN THE CART: */
            <>
              {cart.map((prod, index) => (
                <CartProduct
                  key={index}
                  onClose={() => {
                    removeFromCart(prod);
                  }}
                  product={prod}
		  addToCart={addToCart}
		  removeFromCart={removeFromCart}
                />
              ))}
	    <CartCheckout 
	      onCheckout={onCheckout} 
	      cart={cart} 
	      getCart={getCart}
	    >
	    </CartCheckout> 
            </>
          ) : (
            /* WHEN THE CLIENT DON'T HAVE PRODUCTS IN THE CART */
            <div
              style={{ textAlign: "center", color: "#666", marginTop: "2em" }}
            >
              <h1>No products in the cart</h1>
              <RemoveShoppingCartIcon style={{ fontSize: "15em" }} />
            </div>
          )}
        </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCart: () => dispatch(getCart()),
    addToCart: (product) => dispatch(addToCart(product)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
    onCheckout: () => dispatch(checkout())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
