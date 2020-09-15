import React from 'react'
import NewTable from "./table.js";
import {
  makeStyles,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  cont: {
      background: '#3D3D3D',
  },
  root: {
      color: '#A4A4A4',
  },
}))


function CategoriesTable(props) {
  const classes = useStyles()

  return (
    <Box className={classes.cont} my={0} p={3} height={'77.1vh'}>

      <Grid container justify='center' p={0}>

        <Grid container item xs={6}>
          <Grid item>
              <Typography variant="h3">CRUD categories</Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={props.viewCategories}
                color="secondary"
              >
                View Categories
              </Button>
            </Grid>
            <Grid item>
              <NewTable columns={['ID', 'Name', 'Description']} data={props.categories.map(data => [data.id, data.name, data.description])} />
            </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CategoriesTable
