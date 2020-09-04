import React from 'react'
import {Grid, makeStyles} from '@material-ui/core'
import ProductImage from '../components/ProductImage'
import InfoProduct from '../components/InfoProduct'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const productPrueba = {
    title: 'Campera',
    description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus reiciendis minima repudiandae. Nobis, quod voluptatibus voluptatem cumque, deserunt tempora ipsam laudantium, explicabo quidem quibusdam suscipit mollitia tenetur omnis consequuntur obcaecati',
    price: 999,
    colors: ['Red', 'Blue', 'Green', 'Yellow'],
    talles: ['S', 'M', 'L', 'XL']
}

const imagenPrueba = [
    'https://images.unsplash.com/photo-1520294890956-4a240865ae85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80',
    'https://images.unsplash.com/photo-1503431194692-82dd03d18093?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1190&q=80',
    'https://images.unsplash.com/photo-1517423568366-8b83523034fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80'
]

const sectionStyle = {
    height: '100vh',

    // background: `linear-gradient(to right, #cfd9df 100%, #e2ebf0 0%)`,
    background: 'linear-gradient(to top, #09203f 0%, #537895 100%)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    opacity: 1,
    backgroudBlendMode: 'luminosity',
    color: 'white'
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}))

export default function ProductPage() {
    const classes = useStyles()
    return (
        <div style={sectionStyle}>
            <AppBar position="relative" color='transparent'>
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
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Grid container justify='center' alignItems='center' style={{maxWidth:1350, maxHeight:760}}>
                <Grid container item  xs={6} lg={6}>
                    <ProductImage src={imagenPrueba[1]} />
                </Grid>
                <Grid container item  xs={6} lg={6} justify='center' alignContent='center'>
                    <InfoProduct {...productPrueba} />
                </Grid>
            </Grid>
        </div>
    )
}
