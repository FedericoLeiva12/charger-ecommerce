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


export default function SearchBar({onSearch}) {
    const [state, setState] = useState({
        query: '',
        results: []
    });

    return (
        <form className={Style.form} onSubmit={e => {
            e.preventDefault();
            console.log('a')
            onSearch(state.query)
        }}>
            <SearchField
                label="Search"
                onChange={e => setState({...state, query: e.target.value})}
                value={state.query} />
            <List>
                {state.results.map(result => (
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