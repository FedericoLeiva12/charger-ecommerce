import React from 'react';
import { makeStyles, Card, CardContent, Typography } from '@material-ui/core';

const useStyle = makeStyles({
    card: {
        maxWidth: '20em'
    },
    title: {
        fontWeight: 800
    },
    product: {
        fontSize: '0.75em',
        color: '#555555'
    },
    status: {
        color: '#888888',
        fontSize: '0.75em'
    }
});

export default function OrderCard({id, products, status}) {
    const classes = useStyle();

    let total = 0;

    products.forEach(prod => {
        total += prod.precio * prod.cantidad;
    });

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title}>Order #{id} <span className={classes.status}>Status: {status}</span></Typography>
                {products.map(prod => (
                    <Typography className={classes.product}> - {prod.titulo} - ${prod.precio * prod.cantidad} (${prod.precio} - x{prod.cantidad})</Typography>
                ))}
                <Typography className={classes.total}>Total: ${total}</Typography>
            </CardContent>
        </Card>
    )
}