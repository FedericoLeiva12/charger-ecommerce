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

const pruebaObj = [{
  imagen : 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=649&q=80',
   titulo:'CAMPERA',
   precio:'$9999'
 },{
   imagen : 'https://vansco.vteximg.com.br/arquivos/ids/220878-1200-1200/VN0A3WMAVNE-1-.jpg?v=637036794910600000',
   titulo:'Zapatillas', 
   precio:'$19999'},{
    imagen : 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=649&q=80',
     titulo:'CAMPERA',
     precio:'$9999'
   },{
     imagen : 'https://vansco.vteximg.com.br/arquivos/ids/220878-1200-1200/VN0A3WMAVNE-1-.jpg?v=637036794910600000',
     titulo:'Zapatillas', 
     precio:'$19999'},{
      imagen : 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=649&q=80',
       titulo:'CAMPERA',
       precio:'$9999'
     },{
       imagen : 'https://vansco.vteximg.com.br/arquivos/ids/220878-1200-1200/VN0A3WMAVNE-1-.jpg?v=637036794910600000',
       titulo:'Zapatillas', 
       precio:'$19999'},

]
// var categorias =['size','color', 'name', 'hola'] //prueba categorias

function Catalogo({products, getProducts, getCategories, categories}){
    const classes = useStyles();

    useEffect(() => {
      getProducts();
      getCategories();
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
                categories.map(cat=>{
                  return(
                    <Selector nom={cat.name} desc={cat.description}/>
                  )
                })
              }
            </Grid>
            <div>
                <Container prendas={products.map(prod => ({imagen: prod.imgs[0].url, titulo: prod.name, precio: prod.price}))} />
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
