import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
  TextField,
} from '@material-ui/core'
import React from 'react'

function PasswordSettings({openPassword, handleClose, handlePasswordClose}) {
  return (
    <>
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
          />
          <TextField
            margin="dense"
            id="name"
            label="New Password"
            type="password"
            fullWidth
            color="secondary"
            autoComplete="off"
          />
          <TextField
            margin="dense"
            id="name"
            label="Repeat password"
            type="password"
            fullWidth
            color="secondary"
            autoComplete="off"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handlePasswordClose} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default PasswordSettings
