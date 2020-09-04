import React from 'react'
import SizeSelect from '../SizeSelect'
import ColorSelect from '../ColorSelect'
import {Grid, Typography, Box, Button} from '@material-ui/core'

function InfoProduct({title, description, price, colors = [], talles = []}) {
    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            justify="center"
        >
            <Box mt={2} textAlign="center">
                <Typography
                    variant="h5"
                    style={{borderBottom: '2px solid white'}}
                >
                    {title}
                </Typography>
                <Box mt={1} style={{width: 600}}>
                    <Typography variant="subtitle2">{description}</Typography>
                </Box>
                <Box mt={1} fontWeight="fontWeightMedium">
                <Typography variant="h6">${price}</Typography>
                </Box>
            </Box>
            <Box
                mb={2}
                direction="column"
                textAlign="center"
                style={{width: 250}}
            >
                <SizeSelect talles={talles} colors={colors} />
                <Button
                    variant="outlined"
                    style={{
                        color: 'white',
                        borderColor: 'white',
                        width: '100%',
                    }}
                >
                    ADD TO CART
                </Button>
            </Box>
        </Grid>
    )
}

export default InfoProduct
