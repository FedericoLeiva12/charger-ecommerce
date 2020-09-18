import {Grid} from '@material-ui/core'
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getAllUsers, deleteUser, makeAdmin} from '../../store/actions'
import UserCard from './UserCard'

function ListUsers({users, getAllUsers, deleteUser}) {
  useEffect(() => {
    getAllUsers()
  }, [])
  

  return (
    <div style={{height: '100vh', background: '#3d3d3d', padding: '16px'}}>
      <Grid container xs={12} style={{paddingTop:'8px'}} spacing={2}>
        {users &&
          users.map((user, i) => {
            return (
              <Grid key={i} item xs={3}>
                <UserCard user={user} deleteUser={deleteUser} makeAdmin={makeAdmin} />
              </Grid>
            )
          })}
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
