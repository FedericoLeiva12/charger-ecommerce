import React, { useState } from 'react';
import { getCategories, addCategory, deleteCategory, modifyCategory, getProducts, deleteProduct, addProduct } from '../store/actions';
import { connect } from 'react-redux';
import AdminForms from '../components/AdminForms/';

function AdminPage({categories, products, getCategories, getProducts, addCategory, addProduct, deleteCategory, deleteProduct, modifyCategory}) {
    const [name, setName] = useState('');
    const [id, setId] = useState(0);

    return (
    <div>
      <AdminForms 
      viewCategories={getCategories}
      viewProducts={getProducts}
      categories={categories} 
      products={products}
      name={name}
      setName={setName}
      id={id}
      setId={setId}
      addCategory={addCategory}
      addProduct={addProduct}
      deleteCategory={deleteCategory}
      deleteProduct={deleteProduct}
      modifyCategory={modifyCategory}
      />
    </div>
    )
}

function mapStateToProps(state) {
    return {
        categories: state.categories,
        products: state.products
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCategories: () => dispatch(getCategories()),
        addCategory: (name, description) => dispatch(addCategory(name, description)),
        deleteCategory: id => dispatch(deleteCategory(id)),
        modifyCategory: (id, name, description) =>dispatch(modifyCategory(id, name, description)),
        getProducts: () => dispatch(getProducts()),
        addProduct: (name, description, price, stock, img) => dispatch(addProduct(name, description, price, stock, img)),
        deleteProduct: id => dispatch(deleteProduct(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
