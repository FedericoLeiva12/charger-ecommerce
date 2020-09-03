// IMPORTS
import React, { useState } from 'react';
import { TextField, withStyles, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import Style from './style.module.css';

// STYLED COMPONENTS
const SearchField = withStyles({
    root: {
        '& label': {
            color: '#DDD'
        },
        '& .MuiInput-underline:before': {
            borderColor: '#DDD'
        },
        '.MuiInput-underline': {
            '&:before:hover, &:after:hover': {
                borderColor: '#EEE !important'
            }
        },
        '& label.Mui-focused': {
            color: '#FFF'
        },
        '& .MuiInput-underline:after': {
            borderColor: '#FFF'
        }
    }
})(TextField);


export default function SearchBar() {
    const state = useState({
        results: [{
            title: 'CAMISETA JOHNNY B GOODE MC FLY HOMBRE PREVENTA 15 DE SEPTIEMBRE',
            price: '$1200',
            image: 'https://www.rockgota.com/wp-content/uploads/2020/08/118629110_345178486852052_5759129554751787277_n-300x300.jpg'
        }]
    });

    return (
        <form className={Style.form} onSubmit>
            <SearchField label="Buscar"/>
            <List>
                {state[0].results.map(result => (
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <img src={result.image} alt="" />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={result.title} secondary={result.price}/>
                    </ListItem>
                ))}
            </List>
        </form>
    )
}