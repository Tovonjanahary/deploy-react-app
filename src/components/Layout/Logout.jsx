import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { UserState } from '../../context/GlobalState';
import Avatar from '@mui/material/Avatar';

const Logout = ({ open, logout, handleClose }) => {
  const { userInfo } = UserState();

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        { userInfo && 
          <DialogTitle id="alert-dialog-title" className='flex flex-row items-center'>
          <Avatar alt="Remy Sharp" src={ userInfo.photo } /> <span className='font-semibold ml-2'>{userInfo.name } { userInfo.firstName }</span>
          </DialogTitle> 
        }
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Voulez-vous vraiment vous deconnecter ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>annuler</Button>
          <Button onClick={logout} autoFocus color="error">
            confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Logout;