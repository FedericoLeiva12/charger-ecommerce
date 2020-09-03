import React from 'react'
import Container from './Container'
import Selector from './Selector'
import { createMuiTheme, ThemeProvider, makeStyles  } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const useStyles = makeStyles((theme) => ({
  cont:{
    background:'#3D3D3D',
  },
}));

export default function Catalogo(){
    const classes = useStyles();
    return(
      <ThemeProvider theme={darkTheme}>
        <div className={classes.cont}>
            <Grid container 
      		direction="row"
      		justify="space-between"
  		alignItems="flex-start">
            	<Grid item >
                    <Selector nom="talle"/>
      		</Grid>
                <Grid item >
                    <Selector  nom="ordenar"/>
      		</Grid>
            </Grid>
            <div>
                <Container></Container>
                <Container></Container>
                <Container></Container>
                <Container></Container>
            </div>
        </div>
      </ThemeProvider>
      
    )
}
