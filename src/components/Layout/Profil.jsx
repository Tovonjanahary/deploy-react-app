import React from 'react'
import { Link } from 'react-router-dom';
import { UserState } from '../../context/GlobalState';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Profil = ({ handleCloseUserMenu, anchorElUser }) => {
  const { userInfo } = UserState();
  const logout = (e) => {
    e.preventDefault();
    const confirm = window.confirm("se deconnecter ?");
    if (confirm) {
      localStorage.removeItem('userLogin');
      window.location.href = "/";
    }
  }
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
            <Link to={`/user/profile/${userInfo._id}`} className="rounded-lg border-slate-400">voir le profil</Link>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
            <Link to='/services'>
                Parametre
            </Link>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
            <button className=' m-auto shadow-sm text-slate-400 rounded-lg p-1 mt-2' onClick={logout}>Deconnexion</button>
        </MenuItem>
      </Menu>
  )
}

export default Profil