import {forwardRef} from 'react'
import React, {Component, useEffect} from 'react'
import ReactDOM from 'react-dom'
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
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

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

function UserTable({users, makeAdmin, deleteUser, getAllUsers}) {
  const [makeAdminOpen ,setMakeAdminOpen] = React.useState(false);
  const [user, setUser] = React.useState({
    id: 0,
    name: ''
  })
  

  useEffect(() => {
    getAllUsers()
  }, [])

  const data = users && users.map(user => {
    return {
      name: user.infoUser.name,
      lastname: user.infoUser.lastName,
      email: user.email,
      rol: user.rol,
      address: user.infoUser.address,
      id: user.id
    }
  })

  const handleMakeAdminClick = (rowData) => {
    setUser({id: rowData.id, name: rowData.name})
    setMakeAdminOpen(true)
  }

  const handleMakeAdminDialogClose = () => {
    makeAdmin(user.id, `Now User ${user.name} has administrator rights!` )
    setMakeAdminOpen(false)
  }

  const handleCancelMakeAdminClose = () => {
    setMakeAdminOpen(false)
  }

  return (
    <div>
      <MaterialTable
        title="All Users"
        icons={tableIcons}
        data={data}
        columns={[
          {title: 'Name', field: 'name', editable: 'never'},
          {title: 'Lastname', field: 'lastname', editable: 'never'},
          {title: 'Email', field: 'email', editable: 'never'},
          {title: 'Rol', field: 'rol', editable: 'never'},
          {title: 'Address', field:'address', editable: 'never'},
          {title: 'ID', field:'id', type: 'numeric', editable: 'never'}
        ]}
        actions={[
          rowData => ({
            icon: () => <SupervisorAccountIcon />,
            tooltip: 'Make admin',
            disabled: rowData.rol === 'admin',
            onClick: () => handleMakeAdminClick(rowData)
          })
        ]}
        editable={{
          onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const idUser = oldData.id
              deleteUser(idUser, `User ${oldData.name} was successfully deleted!`)
              resolve()
            }, 1000)
          })
        }}
      />
      <Dialog
        open={makeAdminOpen}
        onClose={handleCancelMakeAdminClose}
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to give to this user administrator rights?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you hit the button MAKE ADMIN, this user will have administrator rights.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelMakeAdminClose} color="secondary">
            CANCEL
          </Button>
          <Button onClick={handleMakeAdminDialogClose} color="secondary" autoFocus>
            MAKE ADMIN
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default UserTable
