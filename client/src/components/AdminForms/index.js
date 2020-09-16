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
import { Switch } from "@material-ui/core";

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

  const [modifyProduct, setModifyProduct] = useState({
    id: 0,
    name: '',
    description: '',
    price: '',
    stock: '',
    img:''
  });

  const [addCategoryProduct, setAddCategoryProduct] = useState({
    productId: '',
    categoryId: '',
    mode: true
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
                Create
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
                helperText="New category name"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                onChange={(e) => setModifyCategory({...modifyCategory, description: e.target.value })}
                value={modifyCategory.description}
                placeholder="description"
                helperText="New category description"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Id"
                onChange={(e) => setModifyCategory({...modifyCategory, id: e.target.value })}
                value={modifyCategory.id}
                placeholder="name"
                helperText="ID of the category to edit"
                fullWidth
                margin="normal"
              />
              <Button variant="contained" type="submit" color="primary">
                Edit
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
                label="ID"
                onChange={(e) => setRemoveCategory({...removeCategory, id: e.target.value})}
                value={removeCategory.id}
                placeholder="0"
                helperText="ID of the category to delete"
                fullWidth
                margin="normal"
              />
              <Button variant="contained" type="submit" color="primary">
                Delete
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
                placeholder="West Jeans"
                helperText="Name for the new product"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                onChange={(e) => setCreateProduct({...createProduct, description:e.target.value })}
                value={createProduct.description}
                placeholder="description"
                helperText="Description for the new product"
                fullWidth
                margin="normal"
              />
			  <TextField
                label="Price"
                onChange={(e) => setCreateProduct({...createProduct, price:e.target.value })}
                value={createProduct.price}
                placeholder="100.00"
                helperText="Price of the new product"
                fullWidth
                margin="normal"
              />
			  <TextField
                label="Stock"
                onChange={(e) => setCreateProduct({...createProduct, stock:e.target.value })}
                value={createProduct.stock}
                placeholder="10"
                helperText="Stock available for the new product"
                fullWidth
                margin="normal"
              />
			  <TextField
                label="Images"
                onChange={(e) => setCreateProduct({...createProduct, img:e.target.value })}
                value={createProduct.img}
                placeholder="imageOne.png,imageTwo.png,imegeThree.png"
                helperText="Only links to images, separed with ',' without spaces"
                fullWidth
                margin="normal"
              />
              <Button variant="contained" type="submit" color="primary">
                Create
              </Button>
            </form>
          </Grid>

		  <Divider />

{/* MODIFY PRODUCT */}

    <Grid item>
          <Typography variant="h6">Modify products</Typography>
      </Grid>

      <Grid item>
            <form
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                props.modifyProduct(
          modifyProduct.id,
          modifyProduct.name,
          modifyProduct.description,
					modifyProduct.price,
					modifyProduct.stock,
					modifyProduct.img.split(',').map(x => x.replace(' ', ''))
				);
              }}
            >
            <TextField
                label="Id"
                onChange={(e) => setModifyProduct({...modifyProduct, id:e.target.value })}
                value={modifyProduct.id}
                placeholder="0"
                helperText="ID of the product to edit"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Name"
                onChange={(e) => setModifyProduct({...modifyProduct, name:e.target.value })}
                value={modifyProduct.name}
                placeholder="Name"
                helperText="New name for the product"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                onChange={(e) => setModifyProduct({...modifyProduct, description:e.target.value })}
                value={modifyProduct.description}
                placeholder="description"
                helperText="New description for the product"
                fullWidth
                margin="normal"
              />
			  <TextField
                label="Price"
                onChange={(e) => setModifyProduct({...modifyProduct, price:e.target.value })}
                value={modifyProduct.price}
                placeholder="100.00"
                helperText="New price for the product"
                fullWidth
                margin="normal"
              />
			  <TextField
                label="Stock"
                onChange={(e) => setModifyProduct({...modifyProduct, stock:e.target.value })}
                value={modifyProduct.stock}
                placeholder="10"
                helperText="New stock for the product "
                fullWidth
                margin="normal"
              />
			  <TextField
                label="Images"
                onChange={(e) => setModifyProduct({...modifyProduct, img:e.target.value })}
                value={modifyProduct.img}
                placeholder="imageOne.png,imageTwo.png,imegeThree.png"
                helperText="Only links to images, separed with ',' without spaces."
                fullWidth
                margin="normal"
              />
              <Button variant="contained" type="submit" color="primary">
                Edit
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
                onChange={(e) => setDeleteProduct({...deleteProduct, id: e.target.value })}
                value={deleteProduct.id}
                placeholder="0"
                helperText="ID of the product to delete"
                fullWidth
                margin="normal"
              />
              <Button variant="contained" type="submit" color="primary">
                Delete
              </Button>
              </form>
            <Divider />
      <form autoComplete='off' onSubmit={(e) => {
        e.preventDefault();
        if(addCategoryProduct.mode)
          props.addCategoryProduct(addCategoryProduct.productId, addCategoryProduct.categoryId);
        else
          props.removeCategoryProduct(addCategoryProduct.productId, addCategoryProduct.categoryId);
      }}>
        <TextField
                label="Category ID"
                onChange={(e) => setAddCategoryProduct({...addCategoryProduct, categoryId: e.target.value })}
                value={addCategoryProduct.categoryId}
                placeholder="0"
                helperText="ID of the category"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Product ID"
                onChange={(e) => setAddCategoryProduct({...addCategoryProduct, productId: e.target.value })}
                value={addCategoryProduct.productId}
                placeholder="0"
                helperText="ID of the product"
                fullWidth
                margin="normal"
              />
              <div>
                Delete
                <Switch
                  checked={addCategoryProduct.mode}
                  onChange={e => setAddCategoryProduct({...addCategoryProduct, mode: !(addCategoryProduct.mode)})}
                  name="asd"
                  color="primary"
                />
                Add
              </div>
                <Divider />
                <Button variant="contained" type="submit" color="primary">
                  Send
                </Button>
            </form>
		      </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}