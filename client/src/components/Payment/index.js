import React, { useEffect } from "react";
import { connect } from "react-redux";
import NavBarCOntainer from "../NavBar/Container";
import PurchaseForm from "./ShippingAndPaymentForm";
import { Box, Grid, makeStyles } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import PurchaseContainer from "./PurchaseContainer";
import { getOrders } from "../../store/actions";

const useStyle = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: "4em",
    background: "#3d3d3d",
    height: "90.8vh",
  },
});

function Purchase({ user, orders, getOrders }) {
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });

  const classes = useStyle();

  useEffect(() => {
    if (user) getOrders(user.id);
  }, [user]);
  return (
    <>
      <div style={{ paddingTop: 20 }}></div>
      <ThemeProvider theme={darkTheme}>
        <Box mt={4}>
          <Grid
            fullwidth
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            className={classes.root}
          >
            <NavBarCOntainer />
            <PurchaseContainer
              orders={orders}
              user={user}
              getOrders={getOrders}
            />
            <PurchaseForm />
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
}

function mapStateToProps(state) {
  return {
    orders: state.orders,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getOrders: (userId) => dispatch(getOrders(userId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Purchase);
