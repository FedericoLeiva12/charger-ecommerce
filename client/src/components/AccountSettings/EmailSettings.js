import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Button, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { connect } from 'react-redux';
import { modifyMyUser } from '../../store/actions';

function EmailSettings({openEmail, handleClose, modifyUser}) {
  const [state, setState] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    modifyUser(state);
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <Dialog open={openEmail} onClose={handleClose}>
        <DialogTitle>Email settings</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To change your email address, please enter your new email address here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Email Address"
            type="email"
            fullWidth
            color="secondary"
            autoComplete="off"
            value={state}
            onChange={e => setState(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="secondary">
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
    modifyUser: (email) => dispatch(modifyMyUser({email}, 'Email changed correctly', 'Error changing email, try again.'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailSettings)
