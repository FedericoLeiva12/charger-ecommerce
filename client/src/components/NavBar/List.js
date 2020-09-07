import React from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core'

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

export default function List(){
    const classes = useStyles()
    return(
        <div>
            <Link to='/categoria/:categoria' className={classes.categories}>
                <h1>CATEGORIA 1</h1>
            </Link>
            <Link to='/categoria/:categoria' className={classes.categories}>
                <h1>CATEGORIA 2</h1>
            </Link>
            <Link to='/categoria/:categoria' className={classes.categories}>
                <h1>CATEGORIA 3</h1>
            </Link>
            <Link to='/categoria/:categoria' className={classes.categories}>
                <h1>CATEGORIA 4</h1>
            </Link>
            <Link to='/admin' className={classes.categories}>
                <h1>ADMIN</h1>
            </Link>
        </div>
    )
}