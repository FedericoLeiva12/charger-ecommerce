import React from 'react';
import { createMuiTheme, ThemeProvider, makeStyles  } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';


const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});
const useStyles = makeStyles((theme) => ({
  cont:{
    background:'#3D3D3D', 
  },
  root: {
    color: "#A4A4A4"
  }
}));


export default function FormCategorias(props) {
  const classes = useStyles();
    return (
      <ThemeProvider theme={darkTheme}>
       <CssBaseline />
        <Box className={classes.cont} m={3} p={3}>
          {/*p = padding m = margin*/}
            <Grid
	      container
              direction="column"
              justify="space-around"
      	      spacing={3}
      	      p={2}
      >
		<Grid item >
      		    <Typography variant="h3">CRUD categories</Typography>
      		</Grid>
                <Grid item >
	          <Button variant="contained" onClick={props.viewCategories} color="secondary">
 		       View Categories
      		  </Button> 
      		</Grid>
      		<Grid item >
       		  <Typography variant="p">
      		    {props.categories.map(
                    function(category, index){return (
                    <div key={index}>{category.id} {category.name}</div>);
                    })}
     		   </Typography>
      		</Grid>

      		<Divider/>
              
            	<Grid item >
                  <Typography variant="h6">Create categories</Typography>
                </Grid>
                <Grid item >
              <form   autoComplete="off" onSubmit={e => {
                e.preventDefault();
                props.addCategory(props.name);
            }}  >
      		  <TextField 
      			label="Nombre"
      			onChange={
			  e => props.setName(e.target.value)
			}
      			value={props.name} placeholder='name'
         		helperText="Solo debe contener letras"
          		fullWidth
          		margin="normal" />
      	          <Button variant="contained"  type="submit" color="primary">
 		       Guardar
      		  </Button> 
	         </form>
      		</Grid>
 
      		<Divider/>
             
            	<Grid item >
                  <Typography variant="h6">Modify categories</Typography>
                </Grid>
                <Grid item >
              <form   autoComplete="off" onSubmit={e => {
                e.preventDefault();
                props.modifyCategory(props.id,props.name);
            }}  >
      		  <TextField 
      			label="Name"
      			onChange={
			  e => props.setName(e.target.value)
			}
      			value={props.name} placeholder='name'
         		helperText="Category Name"
          		fullWidth
          		margin="normal" />
      		   <TextField 
      			label="id"
      			onChange={
			  e => props.setId(e.target.value)
			}
      			value={props.id} placeholder='name'
         		helperText="Solo debe contener letras"
          		fullWidth
          		margin="normal" />
		<Button variant="contained"  type="submit" color="primary">
 		       Guardar
      		  </Button> 
       		</form>
      	      </Grid>
                     		
      		<Divider/>
              
            	<Grid item >
                  <Typography variant="h6">Delete categories</Typography>
                </Grid>
                <Grid item >
		<form   autoComplete="off" onSubmit={e => {
                e.preventDefault();
                props.deleteCategory(props.id);
            	}}  >
      		  <TextField 
      			label="Nombre"
      			onChange={
			  e => props.setId(e.target.value)
			}
      			value={props.id } placeholder='name'
         		helperText="Solo debe contener letras"
          		fullWidth
          		margin="normal" />
	          <Button variant="contained"  type="submit" color="primary">
 		       Guardar
      		  </Button> 
                </form>
             </Grid> 
            </Grid>
        </Box>
      </ThemeProvider>    )
}
