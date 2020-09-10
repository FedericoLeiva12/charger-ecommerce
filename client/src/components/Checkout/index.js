import React, { useEffect } from "react";
import NavBarCOntainer from "../NavBar/Container";
import { connect } from "react-redux";
import { getProducts } from "../../store/actions";
import CartProduct from "./CartProduct";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
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

function Checkout({ products, getProducts }) {
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
          <CartProduct />
        </div>
      </ThemeProvider>
    </>
  );
}

function mapStateToProps(state) {
  return {
    products: state.products,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: () => dispatch(getProducts()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
