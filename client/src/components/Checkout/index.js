import React, { useEffect } from "react";
import NavBarCOntainer from "../NavBar/Container";
import { connect } from "react-redux";
import { getProducts, getCart } from "../../store/actions";
import CartProduct from "./CartProduct";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
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

function Checkout({ cart, getCart }) {
  const classes = useStyles();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <NavBarCOntainer />
      <div style={{ paddingTop: 64, backgroundColor: "#3D3D3D" }}></div>
      <ThemeProvider theme={darkTheme}>
        <div>
          {cart.length>0?
          /* WHEN THE CLIENT hAVE PRODUCTS IN THE CART: */
          (
            <>{cart.map((prod, index) => (
              <CartProduct
                key={index}
                onClose={() => {}}
                product={prod}
              />
          ))}</>
          )
          /* WHEN THE CLIENT DON'T HAVE PRODUCTS IN THE CART */
          :(
            <div style={{textAlign: 'center', color: '#666', marginTop: '2em'}}>
              <h1>No products in the cart</h1>
              <RemoveShoppingCartIcon style={{fontSize: '15em'}}/>
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
