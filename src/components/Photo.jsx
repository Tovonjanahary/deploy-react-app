import React, { useEffect, useState } from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import axios from 'axios';
import { UserState } from '../context/GlobalState';
import { useParams } from 'react-router-dom';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `/img/${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `/img/${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const Photo = () => {
  const { userInfo } = UserState();
  const { userid } = useParams();
  const [userDetails, setuseDetails] = useState('');


  useEffect(() => {
    (async function getUserProfile() {
      const { data } = await axios.get(`http://localhost:5000/users/getSingleUser/${userid}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      }
      )
      setuseDetails(data);
    })();
  }, [userid, userInfo]);
  return (
    <ImageList
      sx={{ width: 500, height: 450 }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {userDetails && userDetails.post.map((item) => (
        <ImageListItem key={item.image} cols={item.cols || 1} rows={item.rows || 1}>
          <img
            {...srcset(item.image, 160, item.rows, item.cols)}
            alt="post pic"
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}

export default Photo