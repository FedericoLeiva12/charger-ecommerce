import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {List, ListItem, Divider, ListItemText, Typography, Paper} from '@material-ui/core';


const useStyles = makeStyles(() => ({
    root: {
        maxHeight: 200, 
        overflow: 'auto',
        backgroundColor: 'rgba(66, 66, 66, 0.36)',
        width: 450,
        boxShadow: '5px 10px 10px rgba(0, 0, 0, 0.2)',
        borderRadius: 10,
      '&:hover':{
       boxShadow: '15px 20px 30px rgba(0, 0, 0, 0.2)',
     },
     //barra de scroll
     '&::-webkit-scrollbar': {
        width: '0.4em'
      },
      '&::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px black'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.1)',
        // outline: '1px solid slategrey',
      }
        
    },
    inline: {
        display: 'inline',
    },
  }));


const Comments = ({data}) => {
    
const array=[
    {
        commentary:'Me gusto mucho la remera, esta re piola',
        rating: 5,
        name: 'Juan C Lescano'
    },
    {
        commentary: 'Medio pelo',
        rating: 2,
        name: 'Maunicols'
    },
    {
        commentary: 'Es una basura',
        rating: 1,
        name: 'Fede Leiva'
    },
    {
        commentary: 'Me gusto mucho la tela, me llegó en perfecto estado a Colombia!',
        rating: 5,
        name: 'Manu Beleño'
    },
    {
        commentary: 'Muy picada',
        rating: 4,
        name: 'Juanpi'
    },
]
    const classes = useStyles()
    return(
        <Paper className={classes.root}>
            <List >
                {
                    data.map((c)=>{
                        return(
                        <>
                        <ListItem alignItems="flex-start">
                            <ListItemText
                            primary={
                                <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textSecondary"
                                >
                                    {c.id}
                                </Typography>
                                : {c.commentary}
                                </React.Fragment>
                            }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        </>
                        )
                    })
                }
        </List>
    </Paper>
    ) 
}

export default Comments
