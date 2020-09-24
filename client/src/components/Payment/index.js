import React, { useEffect } from "react";
import NavBarCOntainer from "../NavBar/Container";
import PaymentForm from "./AdressForm";
import { Box, Grid } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import OrderCard from "../orderCard/";

function Payment() {
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
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
            {/*  <OrderCard /> */}
            <PaymentForm />
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default Payment;
