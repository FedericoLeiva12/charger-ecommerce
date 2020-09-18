import {Grid} from '@material-ui/core';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getAllUsers, deleteUser, makeAdmin} from '../../store/actions';
import UserTable from './UserTable';

function ListUsers({users, getAllUsers, deleteUser, makeAdmin}) {
  // useEffect(() => {
  //   getAllUsers()
  // }, [])
  

  return (
    <div style={{height: '79.36vh', background: '#3d3d3d', padding: '16px'}}>
      <Grid container justify='center'>
          <UserTable users={users} deleteUser={deleteUser} makeAdmin={makeAdmin} getAllUsers={getAllUsers}/>
      </Grid>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    users: state.users,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllUsers: () => dispatch(getAllUsers()),
    deleteUser: (id, message) => dispatch(deleteUser(id, message)),
    makeAdmin: (id, message) => dispatch(makeAdmin(id, message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListUsers)
