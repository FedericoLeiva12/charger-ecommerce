import React from 'react';
import SearchBar from '../SearchBar/index';

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import {Grid, makeStyles} from '@material-ui/core'
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import Drawer from '../Drawer/index'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: 'white'
    },
}))
const sectionStyle = {
    background: 'rgba(66, 66, 66, 0.36)',
    color: 'white'
}

export default function NavBar(){
    const classes = useStyles()
    return(
        <div >
            <AppBar position="fixed" style={sectionStyle} >
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                        
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Button className={classes.title}> INICIAR SESIÓN </Button>
                        <Button className={classes.title}>
                        <LocalMallOutlinedIcon/>
                        </Button>

                    </Typography>
                    <SearchBar/>
                </Toolbar>
            </AppBar>
        </div>
    )}