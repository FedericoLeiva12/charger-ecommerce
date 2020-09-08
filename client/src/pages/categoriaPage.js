import React from 'react';
import Catalogo from '../components/categorySearch/';
import {categories, products, getProductsByCategory, getCategories} from './../store/actions';
import { useParams } from "react-router";
import { connect } from 'react-redux';
import { useEffect } from 'react';

function CategoriaPage({categories, products, getProducts, getCategories}) {
    let { categoryId } = useParams();

    useEffect(() => {
      getProducts(categoryId);
      getCategories();
    }, []);

    return (
        <div>
            <Catalogo 
      	    categoryId={categoryId}
            categories={categories}
      	    products={products}
      	    getProducts={getProducts}
            getCategories={getCategories}
            />
        </div>
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
        getProducts: (id) => dispatch(getProductsByCategory(id)),
        getCategories: () => dispatch(getCategories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriaPage);


