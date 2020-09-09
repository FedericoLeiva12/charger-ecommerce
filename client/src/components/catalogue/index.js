import React, { useEffect } from 'react'
import Container from './Container'
import Selector from './Selector'
import { createMuiTheme, ThemeProvider, makeStyles  } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { getProducts, getCategories } from '../../store/actions';
import { connect } from 'react-redux';
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


function Catalogo({products, getProducts, getCategories, categories}){
    const classes = useStyles();

    useEffect(() => {
      getProducts();
      getCategories();
    }, []);
    const handleChange = function (e){
      console.log(e);
    }

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
                categories.map(cat=>{
                  return(
                    <Selector nom={cat.name} desc={cat.description} val={cat.id}/>
                  )
                })
              }
            </Grid>
            <div>
                <Container prendas={products.map(prod => ({imagen: prod.imgs[0].url, titulo: prod.name, precio: prod.price, id: prod.id, categories: prod.categories}))} />
            </div>
        </div>
      </ThemeProvider>
      </>
    )
}

function mapStateToProps(state) {
    return {
        products: state.products,
        categories: state.categories
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProducts: () => dispatch(getProducts()),
        getCategories: () => dispatch(getCategories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalogo);


