import React from "react";
import { connect } from "react-redux";
import Payment from "../components/Payment/";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { getOrders } from "../store/actions";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function PaymentPage() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid item xs={6}>
          <Payment />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentPage);
