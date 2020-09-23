import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Button, TextField } from '@material-ui/core';
import React from 'react'

function AddressSettings({openAddress, handleClose, handleAddressClose}) {
  return (
    <>
      <Dialog open={openAddress} onClose={handleClose}>
        <DialogTitle>Address settings</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To change your address, please enter your new address here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
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
          <Button onClick={handleAddressClose} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddressSettings
