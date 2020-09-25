import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function PurchaseForm({ setPurchaseData }) {
  const classes = useStyles();
  const [paymentMethod, setpaymentMethod] = React.useState("");
  const [shippingAdress, setshippinAdress] = React.useState("");
  const handleChangeSelect = (event) => {
    setpaymentMethod(event.target.value);
  };
  const handleChangeShippingAdress = (event) => {
    setshippinAdress(event.target.value);
  };

  return (
    <>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          setPurchaseData(paymentMethod, shippingAdress);
        }}
      >
        <div>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <Grid item={12}>
              <FormControl required fullWidth className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Payment</InputLabel>
                <Select
                  label="Payment Method"
                  id="demo-simple-select"
                  value={paymentMethod}
                  onChange={handleChangeSelect}
                >
                  <MenuItem value={"Credit Card"}>Credit Card</MenuItem>
                  <MenuItem value={"Google Pay"}>Google Pay</MenuItem>
                  <MenuItem value={"Paypal"}>Paypal</MenuItem>
                </Select>
                <FormHelperText> Choose a payment method</FormHelperText>
              </FormControl>
            </Grid>
            <TextField
              required
              label="Adress"
              onChange={handleChangeShippingAdress}
              value={shippingAdress}
              placeholder="Exampleadress 1489"
              helperText="Complete the shipping adress"
              fullWidth
              margin="normal"
              color="secondary"
            />
            <Button variant="contained" type="submit" color="secondary">
              Purchase
            </Button>
          </Grid>
        </div>
      </form>
    </>
  );
}
