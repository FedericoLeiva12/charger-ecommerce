import React, { useEffect, useState } from 'react'
import Container from './Container'
import Selector from '../Selector'
import { createMuiTheme, ThemeProvider, makeStyles  } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { getProducts, getSelectors } from '../../store/actions';
import { connect } from 'react-redux';
import NavBarCOntainer from '../NavBar/Container'
import { Snackbar } from '@material-ui/core';

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


function Catalogo({products, getProducts, getSelectors, selectors}){
    const classes = useStyles();

    const [alert, setAlert] = useState(false);

    useEffect(() => {
      getProducts();
      getSelectors();
    }, []);

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
                /*selectors.map(cat=>{
                  return(
                    <Selector nom={cat.name} desc={cat.description} val={cat.id}/>
                  )
                })*/

                (() => {
                  if(selectors) {
                    let results = [];

                    let i = 0;

                    for(let [key, value] of Object.entries(selectors)) {
                      results.push(<Selector key={i} nom={key} elements={value} />)
                      i++;
                    }

                    return results
                  } else {
                    return ''
                  }
                })()
              }
            </Grid>
            <div>
                <Container setAlert={setAlert} prendas={products.map(prod => ({imagen: prod.imgs[0].url, titulo: prod.name, precio: prod.price, id: prod.id, stock: prod.stock}))} />
            </div>
        </div>
      </ThemeProvider>
      <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        open={alert}
        onClose={e => setAlert(false)}
        message="Out of stock"
      />
      </>
    )
}

function mapStateToProps(state) {
    return {
        products: state.products,
        selectors: state.selectors
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProducts: () => dispatch(getProducts()),
        getSelectors: () => dispatch(getSelectors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalogo);


