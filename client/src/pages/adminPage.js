import React, { useEffect, useState } from 'react';
import { getCategories, addCategory, deleteCategory, modifyCategory } from '../store/actions';
import { connect } from 'react-redux';

function AdminPage({categories, getCategories, addCategory, deleteCategory, modifyCategory}) {
    const [name, setName] = useState('');
    const [id, setId] = useState(0);

    return (
        <div>
            <button onClick={getCategories}>Get Categories</button>

            <form onSubmit={e => {
                e.preventDefault();
                addCategory(name);
            }}>
                <input onChange={e => setName(e.target.value)} value={name} placeholder='name'/>
                <input type='submit'/>
            </form>

            <form onSubmit={e => {
                e.preventDefault();
                modifyCategory(id, name);
            }}>
                <input onChange={e => setName(e.target.value)} value={name} placeholder='name'/>
                <input onChange={e => setId(e.target.value)} value={id} placeholder='id'/>
                <input type='submit'/>
            </form>

            <form onSubmit={e => {
                e.preventDefault();
                deleteCategory(id);
            }}>
                <input onChange={e => setId(e.target.value)} value={id} placeholder='id'/>
                <input type='submit'/>
            </form>

            <div>
                {categories.map(
                    function(cat, index){
                        return (
                            <div key={index}>{cat.id} {cat.name}</div>
                        );
                    }
                )}
            </div>
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