//*este es el Container del Navbar 
import { connect } from "react-redux";

import React from 'react';
import {makeStyles, Hidden} from '@material-ui/core';
import NavBar from './Navbar';
import Box from './Box';

const styles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
}))

const Contenedor = ({noTransparent, cart})=>{
    
    const classes = styles()
    const[open, setOpen] = React.useState(false)

    const onOpen = () =>{
        setOpen(!open)
    }

    return(
        
        <div className={classes.root}>
            <NavBar onOpen={onOpen} noTransparent={noTransparent} cart={cart}/>
            <Hidden xsDown>
                <Box 
                    variant='temporary'
                    open={open}
                    onClose={onOpen}
                    
                />
            </Hidden>
            <Hidden smUp>
                <Box 
                    variant='temporary'
                    open={open}
                    onClose={onOpen}
                    
                />
            </Hidden>

        </div>
           
    )
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
  };
}
export default connect(mapStateToProps)(Contenedor);
