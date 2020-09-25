import {forwardRef, useEffect} from 'react'
import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import MaterialTable from 'material-table'
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import CartTable from './cartTable.js'

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
}
const useStyles = makeStyles(theme => ({

  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
}))

function OrdersTable({allOrders, getAllOrders, modifyOrdersState}) {

  useEffect(() => {
    getAllOrders()
  }, [])
  const classes = useStyles()

  const [open, setOpen] = React.useState(false);
  const data = allOrders && allOrders.map(ord => {
    return {
      state: ord.state,
      id: ord.id,
      email: ord.user.email,
      username: ord.user.infoUser.name +" "+ ord.user.infoUser.lastName,
      address: ord.user.infoUser.address,
    }
  })

  const [cart, setCart] = React.useState([]);

  const handleOpen = (id) => {
    setOpen(true);
    setCart(JSON.parse(allOrders.filter(order => order.id === id)[0].shoppingCart.content));
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
     <MaterialTable
        title='All orders'
        icons={tableIcons}
        data={data}
        columns={[
          {title: 'State', field: 'state', editable: 'onUpdate', 
	      lookup: { 'pending': 'pending', 'shipping': 'shipping','complete':'complete'}},
          {title: 'Email', field: 'email', editable: 'never'},
          {title: 'Address', field: 'address', editable: 'never'},
	  {title: 'Username', field: 'username', editable: 'never'},
	  {title: 'ID', field: 'id', editable: 'never'},
        ]}
        actions={[
          rowData => ({
            icon: () => <ShoppingCartIcon />,
            tooltip: 'See Cart',
            onClick: () => handleOpen(rowData.id),
          }),
        ]}

        editable={{
          onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
	      modifyOrdersState(oldData.id, newData.state);
	      getAllOrders();
              resolve();
            }, 1000)
          }),
        }}
      />
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
	<CartTable shoppingCart={cart}/>

      </Modal>
    </div>
  )
}


export default  OrdersTable;
