import React from 'react'
import { Link } from 'react-router-dom';
import { UserState } from '../../context/GlobalState';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Logout from './Logout';

const Profil = ({ handleCloseUserMenu, anchorElUser }) => {
  const { userInfo } = UserState();
 
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }
  const logout = () => {
    setOpen(false);
    localStorage.removeItem('userLogin');
    window.location.href = "/";
  };

  return (
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
            { userInfo?.nom }
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu} >
            <Link to={`/user/profile/${userInfo._id}`} className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full p-1 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">voir le profil</Link>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu} className="text-xs">
            <SettingsIcon/>
            <Link to='/services'>
                Parametre
            </Link>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
            <LogoutIcon/>
            <button className="mx-auto lg:mx-0 text-gray font-bold rounded-full shadow-lg text-xs p-1 bg-white" onClick={handleClickOpen}>Deconnexion</button>
        </MenuItem>
        <Logout handleClickOpen={handleClickOpen} open={open} setOpen={setOpen} handleClose={handleClose}logout={logout} />
      </Menu>
  )
}

export default Profil