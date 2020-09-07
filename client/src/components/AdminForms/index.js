import React, { useState } from "react";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import NewTable from "./table.js";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});
const useStyles = makeStyles((theme) => ({
  cont: {
    background: "#3D3D3D",
  },
  root: {
    color: "#A4A4A4",
  },
}));

export default function FormCategorias(props) {
  const classes = useStyles();

  const [addCategory, setAddCategory] = useState({
	  name: '',
	  description: ''
  });

  const [removeCategory, setRemoveCategory] = useState({
	  id: 0
  });

  const [modifyCategory, setModifyCategory] = useState({
	  id: 0,
	  name: '',
	  description: ''
  });

  const [createProduct, setCreateProduct] = useState({
    name: '',
    description: '',
	  price: '',
	  stock: '',
	  img: ''
  });

  const [deleteProduct, setDeleteProduct] = useState({
	  id: 0
  });

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

          <Divider />

          <Grid item>
            <Typography variant="h6">Create categories</Typography>
          </Grid>
          <Grid item>
            <form
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                props.addCategory(addCategory.name, addCategory.description);
              }}
            >
              <TextField
                label="Name"
                onChange={(e) => setAddCategory({...addCategory, name: e.target.value})}
                value={addCategory.name}
                placeholder="name"
                helperText="Only letters"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                onChange={(e) => setAddCategory({...addCategory, description: e.target.value})}
                value={addCategory.description}
                placeholder="description"
                helperText="Only letters"
                fullWidth
                margin="normal"
              />
              <Button variant="contained" type="submit" color="primary">
                Guardar
              </Button>
            </form>
          </Grid>

          <Divider />

          <Grid item>
            <Typography variant="h6">Modify categories</Typography>
          </Grid>
          <Grid item>
            <form
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                props.modifyCategory(modifyCategory.id, modifyCategory.name, modifyCategory.description);
              }}
            >
              <TextField
                label="Name"
                onChange={(e) => setModifyCategory({...modifyCategory, name: e.target.value })}
                value={modifyCategory.name}
                placeholder="Name"
                helperText="Category Name"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                onChange={(e) => setModifyCategory({...modifyCategory, description: e.target.value })}
                value={modifyCategory.description}
                placeholder="description"
                helperText="Category Name"
                fullWidth
                margin="normal"
              />
              <TextField
                label="id"
                onChange={(e) => setModifyCategory({...modifyCategory, id: e.target.value })}
                value={modifyCategory.id}
                placeholder="name"
                helperText="Solo debe contener letras"
                fullWidth
                margin="normal"
              />
              <Button variant="contained" type="submit" color="primary">
                Guardar
              </Button>
            </form>
          </Grid>

          <Divider />

          <Grid item>
            <Typography variant="h6">Delete categories</Typography>
          </Grid>
          <Grid item>
            <form
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                props.deleteCategory(removeCategory.id);
              }}
            >
              <TextField
                label="Name"
                onChange={(e) => setRemoveCategory({...removeCategory, id: e.target.value})}
                value={removeCategory.id}
                placeholder="Name"
                helperText="Solo debe contener letras"
                fullWidth
                margin="normal"
              />
              <Button variant="contained" type="submit" color="primary">
                Guardar
              </Button>
            </form>
          </Grid>
		  
		  <Divider />

		  <Grid item>
            <Typography variant="h3">Products</Typography>
          </Grid>

		  <Grid item>
		  	<Button
              variant="contained"
              onClick={props.viewProducts}
              color="secondary"
            >
              View Products
            </Button>
		  </Grid>

		  <Grid item>
            <NewTable
				columns={['Id', 'Name', 'Price', 'Stock']}
				data={props.products.map(data => [data.id,data.name,data.price,data.stock])} />
          </Grid>

		  <Divider />

		  <Grid item>
            <Typography variant="h6">Create products</Typography>
          </Grid>

		  <Grid item>
            <form
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                props.addProduct(
          createProduct.name,
          createProduct.description,
					createProduct.price,
					createProduct.stock,
					createProduct.img.split(',').map(x => x.replace(' ', ''))
				);
              }}
            >
              <TextField
                label="Name"
                onChange={(e) => setCreateProduct({...createProduct, name:e.target.value })}
                value={createProduct.name}
                placeholder="Name"
                helperText="Only letters"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                onChange={(e) => setCreateProduct({...createProduct, description:e.target.value })}
                value={createProduct.description}
                placeholder="description"
                helperText="Only letters"
                fullWidth
                margin="normal"
              />
			  <TextField
                label="Price"
                onChange={(e) => setCreateProduct({...createProduct, price:e.target.value })}
                value={createProduct.price}
                placeholder="100.00"
                helperText="Only numbers"
                fullWidth
                margin="normal"
              />
			  <TextField
                label="Stock"
                onChange={(e) => setCreateProduct({...createProduct, stock:e.target.value })}
                value={createProduct.stock}
                placeholder="10"
                helperText="Only numbers"
                fullWidth
                margin="normal"
              />
			  <TextField
                label="Images"
                onChange={(e) => setCreateProduct({...createProduct, img:e.target.value })}
                value={createProduct.img}
                placeholder="imageOne.png,imageTwo.png,imegeThree.png"
                helperText="Only links to images, separed with ',' without spaces."
                fullWidth
                margin="normal"
              />
              <Button variant="contained" type="submit" color="primary">
                Guardar
              </Button>
            </form>
          </Grid>

		  <Divider />

		  <Grid item>
		  <form
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                props.deleteProduct(
					deleteProduct.id
				);
              }}
            >
              <TextField
                label="Id"
                onChange={(e) => setDeleteProduct({...deleteProduct, id:e.target.value })}
                value={deleteProduct.id}
                placeholder="0"
                helperText="Only numbers"
                fullWidth
                margin="normal"
              />
              <Button variant="contained" type="submit" color="primary">
                Delete
              </Button>
            </form>
		  </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
