import React from 'react'
import NewTable from "./table.js";
import {
  makeStyles,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box'
import ProductsTable from './ProductsTable';
import CategoriesTable from './CategoriesTable'

const useStyles = makeStyles(theme => ({
  cont: {
      background: '#3D3D3D',
  },
  root: {
      color: '#A4A4A4',
  },
}))


function Tables({categories, viewCategories, products, viewProducts}) {
  const classes = useStyles()
  
  // const {categories, viewCategories, products, viewProducts} = props
  return (

    <Box className={classes.cont} my={0} p={3} height={'100vh'}>

      <Grid container justify='center' p={0}>

        <Grid container item xs={6}>
          <ProductsTable products={products} viewProducts={viewProducts}/>
        </Grid>
        <Grid container item xs={6}>
          <CategoriesTable categories={categories} viewCategories={viewCategories}/>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Tables