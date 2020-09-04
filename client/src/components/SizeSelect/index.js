import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import {Box} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 110,
        borderBottom: '1px solid white',
    },
}))

export default function SizeSelect({talles, colors}) {
    const classes = useStyles()

    return (
        <Box display="flex" direction="column" style={{width: '100%'}}>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="grouped-select" style={{color: 'white'}}>
                    Talle
                </InputLabel>
                <Select
                    defaultValue=""
                    id="grouped-select"
                    style={{color: 'white'}}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {talles &&
                        talles.map((talle, i) => {
                            return <MenuItem key={i} value={talle}>{talle}</MenuItem>
                        })}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="grouped-select" style={{color: 'white'}}>
                    Color
                </InputLabel>
                <Select
                    defaultValue=""
                    id="grouped-select"
                    style={{color: 'white'}}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {colors &&
                        colors.map((color, i) => {
                            return <MenuItem key={i} value={color}>{color}</MenuItem>
                        })}
                </Select>
            </FormControl>
        </Box>
    )
}
