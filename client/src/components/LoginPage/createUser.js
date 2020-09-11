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
import { createUser } from '../../store/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: 'rgba(255, 255, 255, 0.24)',
      border: '2px solid #f6f6f6'
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
      backgroundColor: 'rgba(255, 255, 255, 0.24)',
      padding: 30,
      borderRadius:  20,
      border: '2px solid #f6f6f6',
      color: '#f6f6f6'
    },
    submit: {
      margin: theme.spacing(2, 0, 2),
      border: '2px solid #f6f6f6',
      color: '#f4f4f4',
      "&:hover":{
        backgroundColor: '#f6f6f6',
        color: '#1C1C1C',
        transition: '0.7s'
      }
    },
  }));

  const CssTextField = withStyles({
    root: {
      color: 'red',
      '& label.Mui-focused': {
        color: '#f6f6f6',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#f6f6f6',
      },
      '& .MuiInput-underline:before': {
        borderBottomColor: '#f6f6f6',
      },
    },
  })(TextField);

  function CreateUser({ createUser, history }) {
    const classes = useStyles();
  
    const [user, setUser] = React.useState({
      email: '',
      password: '',
      name: '',
      lastName: '', 
      address: ''
    })

    const [error, setError] = React.useState('')

    function validateInfo({email, name, lastName, address, password}){
      if(!/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(email)|| !name || !lastName || !address || !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)){
        setError('Invalid data')
      }else{
        setError('')
      }
      setUser({email, name, lastName, address, password})
    }

    return (
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{color: '#f6f6f6'}}>
            SIGN UP
          </Typography>
          <form className={classes.form} noValidate onSubmit={(e) => {
            e.preventDefault();
            createUser(user.email, user.password, user.name, user.lastName, user.address);
            history.push('/')
          }}>
            <CssTextField
              onChange={(e) => validateInfo({...user, email: e.target.value})}
              value={user.email}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autocomplete="section-blue shipping street-address"
            />
            <CssTextField
              onChange={(e) => validateInfo({...user, name: e.target.value})}
              value={user.name}
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              id="name"
              autoComplete="false"
            />
            <CssTextField
              onChange={(e) => validateInfo({...user, lastName: e.target.value})}
              value={user.lastName}
              margin="normal"
              required
              fullWidth
              name="lastName"
              label="Last Name"
              id="lastName"
              autoComplete="false"
            />
            <CssTextField
              onChange={(e) => validateInfo({...user, address: e.target.value})}
              value={user.address}
              margin="normal"
              required
              fullWidth
              name="address"
              label="Adress"
              id="address"
              autoComplete="false"
            />
            <CssTextField
            onChange={(e) => validateInfo({...user, password: e.target.value})}
              value={user.password}
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
              className={classes.submit}
              disabled={!error ? false : true}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to='/login' style={{textDecoration: 'none', color: '#f6f6f6'}}>
                  I have an acount!
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }

  function mapDispatchToProps(dispatch) {
    return {
      createUser: (email, password, name, lastName, address) => dispatch(createUser(email, password, name, lastName, address))
    }
  }

  export default withRouter(connect(null, mapDispatchToProps)(CreateUser));