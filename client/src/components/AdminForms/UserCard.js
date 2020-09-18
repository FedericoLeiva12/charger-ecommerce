import React from 'react'
import { Box, IconButton, Grid, Typography, Button, Divider } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: '5px',
    marginBottom: '5px',
    maxWidth: 344,
    maxHeight: 158,
    padding: '8px',
    paddingLeft: '0px',
    borderRadius: 10,
    color: '#3d3d3d',
    backgroundColor: '#fafafa'
  },
  boxIcon: {
    maxWidth: 80,
    maxHeight: 80,
  },
  icon: {
    fontSize: '80px',
  },
  boldText: {
    fontWeight: 'bold'
  }
}))

const CssIconButton = withStyles({
  root: {
    '& .MuiIconButton-root.Mui-disabled': {
      color: 'rgb(245 0 87 / 40%)',
      backgroundColor: 'transparent'
    }
  }
})(IconButton)

function UserCard({user, deleteUser, makeAdmin}) {
  const classes = useStyles()

  const message = `User ${user.infoUser.name} was successfully deleted!`
  const messageAdmin = `Now user ${user.infoUser.name} has administrator rights!`

  const rolUpperCase = user.rol.toUpperCase()

  const [open, setOpen] = React.useState(false);
  const [makeAdminOpen ,setMakeAdminOpen] = React.useState(false);

  const handleEditClick = () => {
    setMakeAdminOpen(true)
  }

  const handleDeleteDialogClick = () => {
    setOpen(true)
  }

  const handleDeleteDialogClose= () => {
    deleteUser(user.id, message)
    setOpen(false)
  }

  const handleMakeAdminDialogClose = () => {
    makeAdmin(user.id, messageAdmin)
    setMakeAdminOpen(false)
  }

  const handleCancelMakeAdminClose = () => {
    setMakeAdminOpen(false)
  }

  const handleCancelClose = () => {
    setOpen(false)
  }

  return (
    <Box className={classes.root} boxShadow={4}>

      <Grid container xs={12} justify='center' alignItems='center'>
              {/* AVATAR */}
        <Grid container item xs={4} justify='center' alignItems='center'>
        <Box className={classes.boxIcon}>
          <AccountCircleIcon className={classes.icon}/>
        </Box>
        </Grid>
              {/* INFO */}
        <Grid container item xs={8} style={{textAlign: 'start'}} direction='column'>
          <Grid item>
            <Typography variant='h6' color='inherit' className={classes.boldText}>{`${user.infoUser.name} ${user.infoUser.lastName}`}</Typography>
            <Typography>{`Email: ${user.email}`}</Typography>
            <Typography>{`Address: ${user.infoUser.address}`}</Typography>
          </Grid>
        </Grid>

        <Divider variant="middle" />
              {/* BUTTONS */}
        <Grid container item xs={12} style={{marginTop: '8px', marginLeft:'8px', marginBottom: '8px'}} justify='space-between' alignItems='center'>
            <CssIconButton color='secondary' onClick={handleEditClick} disabled={rolUpperCase === 'ADMIN' ? true : false}>
              <EditIcon />
            </CssIconButton>
            <Typography className={classes.boldText}>{rolUpperCase}</Typography>
            <IconButton color='secondary' onClick={handleDeleteDialogClick} >
              <DeleteIcon />
            </IconButton>
        </Grid>
      </Grid>
      {/* DIALOG ALERT DELETE USER */}
      <Dialog
        open={open}
        onClose={handleCancelClose}
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this user?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you hit the DELETE button, this user will not be able to log back into Charger
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClose} color="secondary">
            CANCEL
          </Button>
          <Button onClick={handleDeleteDialogClose} color="secondary" autoFocus>
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
      {/* DIALOG ALERT MAKEADMIN USER */}
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
    </Box>
  )
}

export default UserCard
