//este es el Container

import React from 'react';
import {makeStyles, Hidden} from '@material-ui/core';
import NavBar from './Navbar';
import Box from './Box';

const styles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
}))


const Contenedor = ()=>{
    
    const classes = styles()
    const[abrir, setAbrir] = React.useState(false)

    const accionAbrir = () =>{
        setAbrir(!abrir)
    }

    return(
        <div className={classes.root}>
            <NavBar accionAbrir={accionAbrir}/>
            <Hidden xsDown>
                <Box 
                    variant='temporary'
                    open={abrir}
                    onClose={accionAbrir}
                    
                />
            </Hidden>
            <Hidden smUp>
                <Box 
                    variant='temporary'
                    open={abrir}
                    onClose={accionAbrir}
                    
                />
            </Hidden>

            
        </div>
    )
}

export default Contenedor