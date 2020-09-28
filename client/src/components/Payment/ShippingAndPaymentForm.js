import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CardForm from './DialogStripeCC'
import { Elements } from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
const stripePromise= loadStripe('pk_test_51HVqxeCJbTm2zZUewzVqUxrwjYz9MnzEYwZUJ2QCBcbjfzWyNLZT8vut0cXlIt28Gn6HGssqUZercMaRa0hplIqF00c5g6uOth')
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

export default function ShippingAndPaymentForm({ setPurchaseData, setPaymentMethodDos }) {
  const classes = useStyles();
  const [paymentMethod, setpaymentMethod] = React.useState("");
  const [shippingAdress, setshippingAdress] = React.useState("");
  const handleChangeSelect = (event) => {
    setpaymentMethod(event.target.value);
  };
  const handleChangeShippingAdress = (event) => {
    setshippingAdress(event.target.value);
  }

  return (
    <>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
/*         onSubmit={(e) => {
          e.preventDefault();
          setPurchaseData(paymentMethod, shippingAdress);
        }} */
      >
        <div>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <Grid item={12}>
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
              <FormControl required fullWidth className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Payment</InputLabel>
                <Select
                  label="Payment Method"
                  id="demo-simple-select"
                  value={paymentMethod}
                  onChange={handleChangeSelect}
                >
                  <MenuItem value={"Credit Card"}>Credit Card</MenuItem>
                  <MenuItem value={null}>------------</MenuItem>
                </Select>
                <FormHelperText> Choose a payment method</FormHelperText>
              </FormControl>
                {paymentMethod=== 'Credit Card'?
                <Elements stripe={stripePromise}>
                  <CardForm  setPaymentMethod={setPaymentMethodDos} />
                </Elements>
                : null}
              </Grid>

          </Grid>
        </div>
      </form>
    </>
  );
};

