import React from 'react';
import {Link} from 'react-router-dom';
import {makeStyles, Typography} from '@material-ui/core'
import { getCategories, logout } from '../../store/actions';
import { connect } from 'react-redux';

const useStyles = makeStyles(()=>({
    categories:{
        color: 'white',
        "&:hover":{
            color: '#9C9C9C',
            transition: '0.3s'
        },
        textDecoration: 'none',
    }
}))

function List({categories, logged, onSignout}){
    const classes = useStyles()

    return(
        <div>
            {categories
                .filter(cat => 
                    (cat.name === 'Type' || cat.name === 'Season')
                ).map((cat, index) => (
                    <Link key={index} to={`/category/${cat.id}`} className={classes.categories}><h1>{cat.description}</h1></Link>
                ))
            }
            <Link to='/admin' className={classes.categories}>
                <h1>ADMIN</h1>
            </Link>
            {logged && (<Link onClick={e => {e.preventDefault(); onSignout();}} className={classes.categories}><h1>SIGNOUT</h1></Link>)}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        categories: state.categories,
        logged: state.logged
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCategories: () => dispatch(getCategories),
        onSignout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);