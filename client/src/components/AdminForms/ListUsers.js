import {Grid} from '@material-ui/core';
import React from 'react';
import {connect} from 'react-redux';
import {getAllUsers, deleteUser, makeAdmin} from '../../store/actions';
import UserTable from './UserTable';

function ListUsers({users, getAllUsers, deleteUser, makeAdmin}) {
  
  return (
    <div style={{height: '79.36vh', background: '#3d3d3d', padding: '16px'}}>
      <Grid container justify='center'>
          <UserTable users={users} deleteUser={deleteUser} makeAdmin={makeAdmin} getAllUsers={getAllUsers}/>
      </Grid>
    </div>
  )
}

export default  ListUsers
