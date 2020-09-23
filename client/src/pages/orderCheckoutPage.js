import React from 'react';
import { Box, Card, CardContent, makeStyles } from '@material-ui/core';
import { LocalGroceryStore } from '@material-ui/icons';

const useStyle = makeStyles({
    root: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000'
    },
    card: {
        maxWidth: '480px',
        boxShadow: '5px 5px #ddd'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: '2em',
        textAlign: 'center'
    },
    icon: {
        marginRight: 'auto',
        marginLeft: 'auto',
        fontSize: '2.5em',
        color: 'green'
    }
});

export default () => {
    const classes = useStyle();
    return (
        <Box className={classes.root}>
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <LocalGroceryStore className={classes.icon} />
                    We have sent you an email. Open it to confirm the purchase.
                </CardContent>
            </Card>
        </Box>
    )
}