import { Link } from 'react-router-dom';
import Profil from './Profil';
import SideDrawer from '../SideDrawer';
import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { UserState } from '../../context/GlobalState';
import NavAuth from './NavAuth';

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { userInfo } = UserState();
  let user = localStorage.getItem('userLogin');
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Container maxWidth="xl" className="bg-white text-black sticky top-0 z-40">
      <Toolbar disableGutters>
        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' }
          }}
        >
          <img src="/img/logo.svg" alt="e-couloir" />
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}

          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            <MenuItem onClick={handleCloseNavMenu}>
                <Link to='/'>
                  Accueil
                </Link>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
                <Link to='/services'>
                  Services
                </Link>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
                <Link to='/'>
                  Contact
                </Link>
            </MenuItem>
            {
              !user && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to="/user/signin">
                    <Button variant="outlined" size="small">Connexion</Button>
                  </Link>
                </MenuItem>
                )
            }
            {
              !user && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to="/user/signup">
                    <Button variant="contained" size="small">Inscription</Button>
                  </Link>
                </MenuItem>
                )
            }
          </Menu>
        </Box>
        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href=""
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            textDecoration: 'none',
          }}
        >
          E-COULOIRS
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Button
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: 'black', display: 'block' }}
          >
            <Link to='/'>
              Accueil
            </Link>
          </Button>
          <Button
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: 'black', display: 'block' }}
          >
            <Link to='/services'>
              Services
            </Link>
          </Button>
          <Button
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: 'black', display: 'block' }}
          >
            <Link to='/contact'>
              Contact
            </Link>
          </Button>
          <Button
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: 'black', display: 'block' }}
          >
            <SideDrawer/>
          </Button>
        </Box>
        {
          user ? (
            <Box sx={{ flexGrow: 0, display: { xs: 'flex'} }}>
              <Tooltip title="A propos">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  { userInfo && <Avatar alt="Remy Sharp" src={userInfo && userInfo.photo} /> }
                </IconButton>
              </Tooltip>
              <Profil handleCloseUserMenu={handleCloseUserMenu} anchorElUser={anchorElUser} />
            </Box>
          )
          : <NavAuth/>
        }
        
      </Toolbar>
    </Container>
  );
}

export default Navbar;