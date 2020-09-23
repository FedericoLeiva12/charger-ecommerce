import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Button, TextField } from '@material-ui/core';
import React from 'react'

function FullnameSettings({openName, handleClose, handleFullnameClose}) {
  return (
    <>
      <Dialog open={openName} onClose={handleClose}>
        <DialogTitle>Fullname settings</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To change your fullname, please enter your new name and last name here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            color="secondary"
            autoComplete="off"
          />
          <TextField
            margin="dense"
            id="name"
            label="Last name"
            type="text"
            fullWidth
            color="secondary"
            autoComplete="off"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleFullnameClose} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default FullnameSettings
