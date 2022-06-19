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
  const [error, setError] = useState(false);

  const searchUser = async (search) => {
    try {
      if(search === '') {
        return setSearchResult([]);
      }
      const { data } = await axios.get(`https://e-couloirs.herokuapp.com/searchUser?search=${search}`);
      setSearchResult(data);
    } catch (error) {
      if(error.message === "Network Error") {
        setError(error.message);
        return;
      }
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
      <input type="text" onChange={(e) => searchUser(e.target.value)} className="ml-2 focus:outline-none border-b-2 border-gray-200 p-2 w-full"
        placeholder='rechercher ici'
      />
      <Divider />
      {error && 
        <div>
          <div className='text-center font-bold'>{ error }</div>
          <img src='/img/undraw_Warning_re_eoyh.png' alt="warning"/>
        </div>
      }
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
