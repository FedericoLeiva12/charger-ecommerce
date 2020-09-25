import React from "react";

import Purchase from "../components/Payment";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

export default function PurchasePage() {
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
          <Purchase />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
