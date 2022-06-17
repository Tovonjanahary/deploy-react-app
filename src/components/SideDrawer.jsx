import React, { useState } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = useState({ left: false });
  const [searchResult, setSearchResult] = useState([]);

  const searchUser = async (search) => {
    try {
      if(search === '') {
        return setSearchResult([]);
      }
      const { data } = await axios.get(`http://localhost:5000/users/searchUser?search=${search}`);
      setSearchResult(data);
    } catch (error) {
      
    }
  }
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 350 }}
      role="presentation"
      className = "p-2"
    >
      <input type="text" onChange={(e) => searchUser(e.target.value)} className="ml-2 focus:outline-none border-b-2 border-gray-200 p-2"
        placeholder='rechercher ici'
      />
      <Divider />

      {
        searchResult && searchResult.map((u) => (
          <div className='m-3 border border-indigo-200 p-2 rounded-lg' key={u._id}>
            <div className='flex items-center'>
              <Avatar
                src={`/img/${u.photo}`} 
                alt="user pic" 
              />
              <div  className='ml-3'>
                <Link to={`/user/profile/${u._id}`}><h5>{u.name}</h5></Link>
                <div className='text-xs font-bold'>{u.jobTitle}</div>
              </div>
              
            </div>
          </div>
        ))
      }
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <input aria-label="Enter title" className='bg-gray-200 focus:outline-none p-1.5 rounded-md' placeholder='recherche'
          onClick={toggleDrawer(anchor, true)}
          />
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
