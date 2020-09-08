import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function Selector(props) {
  const classes = useStyles();
  const [prop, setProp] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [redirect, setRedirect] = React.useState(null);

  const handleChange = (event) => {
    setProp(event.target.value);
    setRedirect('catalogo/');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  if (redirect) {
    return <Redirect to={'category/'+prop} />
  }
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">{props.nom}</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={prop}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
         <MenuItem value={props.val}>
            <em>{props.desc}</em>
          </MenuItem>
        {/*.map(des =>{return <MenuItem value={des}>{des}</MenuItem>})}
          
        {/* { props.desc.map(d=>{
         return(
         <MenuItem value={d}>{d}</MenuItem>
         ) 
       })} */}

        </Select>
      </FormControl>
    </div>
  );
}
