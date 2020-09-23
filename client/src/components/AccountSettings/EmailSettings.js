import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Button, TextField } from '@material-ui/core';
import React from 'react'

function EmailSettings({openEmail, handleClose, handleEmailClose}) {
  return (
    <>
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
          />
          <TextField
            margin="dense"
            id="name"
            label="Confirm New Email Address"
            type="email"
            fullWidth
            color="secondary"
            autoComplete="off"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEmailClose} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EmailSettings
