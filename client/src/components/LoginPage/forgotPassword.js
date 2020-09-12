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
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: 'rgba(255, 255, 255, 0.24)',
      border: '2px solid #fafafa'
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
      backgroundColor: 'rgba(255, 255, 255, 0.24)',
      padding: 30,
      borderRadius:  20,
      border: '2px solid #fafafa',
      color: '#fafafa'
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      border: '2px solid #fafafa',
      color: '#fafafa',
      "&:hover":{
        backgroundColor: '#fafafa',
        color: '#1C1C1C',
        transition: '0.7s'
      }
    },
  }));

  const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#fafafa',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#fafafa',
      },
      '& .MuiInput-underline:before': {
        borderBottomColor: '#fafafa',
      },
    },
  })(TextField);


  export default function Login() {
    const classes = useStyles();
  
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{color: '#f6f6f6'}}>
            RESET PASSWORD
          </Typography>
          <form className={classes.form} noValidate>
            <CssTextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="New Password"
              type="password"
              name="email"
              autoComplete="false"
            />
            <CssTextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Type Password Again"
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
              Reset
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to='/login' style={{textDecoration: 'none', color: '#fafafa'}}>
                  I already remembered my password!
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