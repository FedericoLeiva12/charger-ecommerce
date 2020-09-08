import React, { useEffect } from 'react'
import Container from './Container'
import Selector from './Selector'
import { createMuiTheme, ThemeProvider, makeStyles  } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import NavBarCOntainer from '../NavBar/Container'

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const useStyles = makeStyles(() => ({
  cont:{
    background:'#3D3D3D',
  },
}));


export default function Catalogo(props){
    const classes = useStyles();

    return(
      <>
      <NavBarCOntainer/> 
      <div style={{paddingTop:64, backgroundColor: '#3D3D3D'}}></div>
      <ThemeProvider theme={darkTheme}>
        <div className={classes.cont}>
            <Grid container 
      		direction="row"
          alignItems="flex-start"
          paddingBottom='40px'
          >
            	{
                props.categories.map(cat=>{
                  return(
                    <Selector nom={cat.name} desc={cat.description} val={cat.id}/>
                  )
                })
              }
            </Grid>
            <div>
                <Container prendas={props.products.map(prod => ({imagen: prod.imgs[0].url, titulo: prod.name, precio: prod.price}))} />
            </div>
        </div>
      </ThemeProvider>
      </>
    )
}


