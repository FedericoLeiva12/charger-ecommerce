import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(0),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: '#1C1C1C'
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
      backgroundColor: 'rgba(66, 66, 66, 0.36)',
      padding: 30,
      borderRadius:  20
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: '#1C1C1C',
      color: '#f4f4f4',
      "&:hover":{
        backgroundColor: '#f6f6f6',
        color: '#1C1C1C',
        transition: '0.7s'
      }
    },
  }));


  export default function Login() {
    const classes = useStyles();
  
    return (
      <Container component="main" maxWidth="xs" style={{backdropFilter: 'blur(30px)'}}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="false"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
            //   color='primary'
              className={classes.submit}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to='/signUp'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
         
        </Box>
      </Container>
    );
  }