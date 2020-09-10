import React from 'react';
import Catalogo from '../components/categorySearch/';
import {categories, products, getProductsByCategory, getCategories, getSelectors} from './../store/actions';
import { useParams } from "react-router";
import { connect } from 'react-redux';
import { useEffect } from 'react';

function CategoriaPage({selectors, products, getProducts, getSelectors}) {
    let { categoryId } = useParams();

    useEffect(() => {
      getProducts(categoryId);
      getSelectors();
    }, []);

    return (
        <div>
            <Catalogo 
      	    categoryId={categoryId}
            selectors={selectors}
      	    products={products}
      	    getProducts={getProducts}
            getSelectors={getSelectors}
            />
        </div>
    )
}

function mapStateToProps(state) {
    return {
        products: state.products,
        categories: state.categories,
        selectors: state.selectors
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProducts: (id) => dispatch(getProductsByCategory(id)),
        getSelectors: () => dispatch(getSelectors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriaPage);


