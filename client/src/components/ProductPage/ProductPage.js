import React, { useEffect, useState } from 'react'
import {Grid, makeStyles} from '@material-ui/core'
import ProductImage from './ProductImage'
import InfoProduct from './InfoProduct'
import Container from '../NavBar/Container'
import { connect } from 'react-redux'
import { getProducts } from '../../store/actions'
import { useParams } from 'react-router-dom'


const imagenPrueba = [
    'https://images.unsplash.com/photo-1520294890956-4a240865ae85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80',
    'https://images.unsplash.com/photo-1503431194692-82dd03d18093?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1190&q=80',
    'https://images.unsplash.com/photo-1517423568366-8b83523034fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80'
]

function ProductPage({products, getProducts}) {
    
    const sectionStyle = {
        height: '100vh',
        background: `url(${imagenPrueba[1]})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: '0% 50%',
        backdropFilter: 'blur(20px)',
        color: 'white'
    }

    const id = parseInt(useParams().product);

    const prod = products.filter(prod => prod.id === id)[0];

    useEffect(() => {
        getProducts();
    }, []);
    
    return (
        <div style={sectionStyle}>
            <Container />
            {/*<Grid container justify='center' alignItems='center' style={{maxWidth:1366, maxHeight:768, paddingTop: '80px', backdropFilter: 'blur(10px)', paddingBottom: '40px'}}>
                <Grid container item  xs={6} lg={6}>
                    <ProductImage src={imagenPrueba[1]} />
                </Grid>
                <Grid container item  xs={6} lg={6} justify='center' alignContent='center'>
                    <InfoProduct {...productPrueba} />
                </Grid>
            </Grid>*/}
                {prod?(
                    <Grid container justify='center' alignItems='center' style={{maxWidth:1366, maxHeight:768, paddingTop: '80px', backdropFilter: 'blur(10px)', paddingBottom: '40px'}}>
                        <Grid container item  xs={6} lg={6}>
                            <ProductImage src={prod.imgs[0].url} />
                        </Grid>
                        <Grid container item  xs={6} lg={6} justify='center' alignContent='center'>
                            <InfoProduct title={prod.name} description={prod.description} price={prod.price} talle={"XL"} />
                        </Grid>
                    </Grid>
                ):'Loading'}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        products: state.products
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProducts: () => dispatch(getProducts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);