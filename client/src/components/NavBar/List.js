import React from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles(()=>({
    categories:{
        color: 'white',
        "&:hover":{
            color: 'black'
        }
    }
}))

export default function List(){
    const classes = useStyles()
    return(
        <div>
            <Link to='/categoria/:categoria' style={{textDecoration:'none', color:'white'}}>
                <h1 className={classes.categories}>CATEGORIA 1</h1>
            </Link>
            <Link to='/categoria/:categoria' style={{textDecoration:'none', color:'white'}}>
                <h1 className={classes.categories}>CATEGORIA 2</h1>
            </Link>
            <Link to='/categoria/:categoria' style={{textDecoration:'none', color:'white'}}>
                <h1 className={classes.categories}>CATEGORIA 3</h1>
            </Link>
            <Link to='/categoria/:categoria' style={{textDecoration:'none', color:'white'}}>
                <h1 className={classes.categories}>CATEGORIA 4</h1>
            </Link>
        </div>
    )
}