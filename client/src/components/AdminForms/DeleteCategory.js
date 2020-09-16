import React from 'react'
import {
  makeStyles,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
  cont: {
      background: '#3D3D3D',
  },
  root: {
      color: '#A4A4A4',
  },
}))

function DeleteCategory(props) {
  const classes = useStyles();

  const [removeCategory, setRemoveCategory] = React.useState({
    id: 0
  });


  return (
    <Box className={classes.cont} my={0} p={3} height={'77.1vh'}>

      <Grid container justify='center' p={0}>

      <Grid item xs={6}>
      <form
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                props.deleteCategory(removeCategory.id);
              }}
            >
              <TextField
                label="ID"
                onChange={(e) => setRemoveCategory({...removeCategory, id: e.target.value})}
                value={removeCategory.id}
                placeholder="0"
                helperText="ID of the category to delete"
                fullWidth
                margin="normal"
              />
              <Button variant="contained" type="submit" color="secondary">
                Delete
              </Button>
            </form>
          </Grid>
      </Grid>
    </Box>
  )
}

export default DeleteCategory;
