import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import {Box, Button, Snackbar} from '@material-ui/core'
import AddShoppingCartSharpIcon from '@material-ui/icons/AddShoppingCartSharp'
import {Alert} from '@material-ui/lab'
import './style.css'

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 236,
        borderBottom: '1px solid white',
    },
}))

export default function SizeSelect({talles}) {
    const classes = useStyles()

    const [active, setActive] = React.useState(true)

    const [open, setOpen] = React.useState(false)

    //Handler para desactivar boton
    const handleOnChange = e => {
        e.preventDefault()
        const change = e.target.value
        console.log(change)
        if (change !== '') {
            setActive(false)
            return
        }
        setActive(true)
    }

    //handlers de alert
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    const handleClick = () => {
        setOpen(true)
    }

    return (
        <Box style={{width: '100%'}}>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="grouped-select" style={{color: 'white'}}>
                    Size
                </InputLabel>
                <Select
                    defaultValue=""
                    id="grouped-select"
                    style={{color: 'white'}}
                    onChange={handleOnChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {talles &&
                        talles.map((talle, i) => {
                            return (
                                <MenuItem key={i} value={talle}>
                                    {talle}
                                </MenuItem>
                            )
                        })}
                </Select>
            </FormControl>
            <Button
                variant="contained"
                style={{
                    width: '100%',
                }}
                color="default"
                disabled={active}
                endIcon={<AddShoppingCartSharpIcon />}
                onClick={handleClick}
            >
                ADD TO CART
            </Button>
            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                open={open}
                onClose={handleClose}
                autoHideDuration={6000}
            >
                <Alert onClose={handleClose} severity="success" variant='filled'>
                    ¡Product successfully added to cart!
                </Alert>
            </Snackbar>
        </Box>
    )
}
