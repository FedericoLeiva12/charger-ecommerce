import React, { useEffect, useState } from 'react';
import { getCategories, addCategory, deleteCategory, modifyCategory } from '../store/actions';
import { connect } from 'react-redux';
import FormCategorias from '../components/AdminForms/';

function AdminPage({categories, getCategories, addCategory, deleteCategory, modifyCategory}) {
    const [name, setName] = useState('');
    const [id, setId] = useState(0);

    return (
    <div>
      <FormCategorias 
      viewCategories={getCategories}
      categories={categories} 
      name={name}
      setName={setName}
      id={id}
      setId={setId}
      addCategory={addCategory}
      deleteCategory={deleteCategory}
      modifyCategory={modifyCategory}
      />
    </div>
    )
}

function mapStateToProps(state) {
    return {
        categories: state.categories
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCategories: () => dispatch(getCategories()),
        addCategory: name => dispatch(addCategory(name)),
        deleteCategory: id => dispatch(deleteCategory(id)),
        modifyCategory: (id, name) =>dispatch(modifyCategory(id, name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
