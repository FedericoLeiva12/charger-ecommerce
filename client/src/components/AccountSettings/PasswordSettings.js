import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
  TextField,
} from '@material-ui/core'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { modifyMyUser } from '../../store/actions'

function PasswordSettings({openPassword, handleClose, handlePasswordClose, modifyUser}) {
  const [state, setState] = useState({password: '', repassword: '', apassword: ''});

  function handleSubmit(e) {
    e.preventDefault();

    modifyUser(state.apassword, state.password, state.repassword);
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <Dialog open={openPassword} onClose={handleClose}>
        <DialogTitle>Password settings</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To change your password, please enter your actual password here,
            then the new one.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Actual Password"
            type="password"
            fullWidth
            color="secondary"
            autoComplete="off"
            value={state.apassword}
            onChange={e => setState({...state, apassword: e.target.value})}
          />
          <TextField
            margin="dense"
            id="name"
            label="New Password"
            type="password"
            fullWidth
            color="secondary"
            autoComplete="off"
            value={state.password}
            onChange={e => setState({...state, password: e.target.value})}
          />
          <TextField
            margin="dense"
            id="name"
            label="Repeat password"
            type="password"
            fullWidth
            color="secondary"
            autoComplete="off"
            value={state.repassword}
            onChange={e => setState({...state, repassword: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  )
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    modifyUser: (apassword, password, repassword) => dispatch(modifyMyUser({apassword, password, repassword}, 'Password changed correctly', 'Error changing password, try again.'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordSettings);
