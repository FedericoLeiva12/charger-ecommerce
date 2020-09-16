import React, { useEffect } from "react";
import NavBarCOntainer from "../NavBar/Container";
import { connect } from "react-redux";
import { getProducts, getCart, removeFromCart, checkout } from "../../store/actions";
import CartProduct from "./CartProduct";

import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Button } from "@material-ui/core";
const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const useStyles = makeStyles(() => ({
  cont: {
    background: "#3D3D3D",
  },
}));

function Checkout({ cart, getCart, removeFromCart, onCheckout }) {
  const classes = useStyles();
  const removeMessage = 'Product successfully removed from your cart!'
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <NavBarCOntainer />
      <div style={{ paddingTop: 64, backgroundColor: "#3D3D3D" }}></div>
      <ThemeProvider theme={darkTheme}>
        <div>
          {cart.length > 0 ? (
            /* WHEN THE CLIENT hAVE PRODUCTS IN THE CART: */
            <>
              {cart.map((prod, index) => (
                <CartProduct
                  key={index}
                  onClose={() => {
                    removeFromCart(prod, removeMessage);
                  }}
                  product={prod}
                />
              ))}
              <Button onClick={onCheckout} style={{
                backgroundColor: '#F84'
              }}>Checkout</Button>
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
        </div>
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
    removeFromCart: (id, message) => dispatch(removeFromCart(id, message)),
    onCheckout: () => dispatch(checkout())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
