import React from 'react';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
    title: {
        fontWeight: 800
    },
    info: {}
})

export default function UserCard({name, email, address}) {
    const classes = useStyle();

    return (
        <Card>
            <CardContent>
                <Typography className={classes.title}>{name}</Typography>
                <Typography className={classes.info}>{email}</Typography>
                <Typography className={classes.info}>{address}</Typography>
            </CardContent>
        </Card>
    )
}