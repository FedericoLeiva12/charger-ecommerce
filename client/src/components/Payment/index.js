import React, { useEffect } from "react";
import { connect } from "react-redux";
import NavBarCOntainer from "../NavBar/Container";
import PurchaseForm from "./ShippingAndPaymentForm";
import { Box, Grid } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import PurchaseContainer from "./PurchaseContainer";
import { getOrders } from "../../store/actions";

function Purchase({ user, orders, getOrders }) {
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });

  useEffect(() => {
    if (user) getOrders(user.id);
  }, [user]);
  return (
    <>
      <div style={{ paddingTop: 64 }}></div>
      <ThemeProvider theme={darkTheme}>
        <Box mt={4}>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
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
