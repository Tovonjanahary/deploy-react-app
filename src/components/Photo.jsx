import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { UserState } from '../context/GlobalState';
import { useParams } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import config from '../config/config';

const Photo = () => {
  const { userInfo } = UserState();
  const { userid } = useParams();
  const [userDetails, setuseDetails] = useState('');
  const [pending, setIsPending] = useState(false);
  useEffect(() => {
    (async function getUserProfile() {
      setIsPending(true);
      const { data } = await axios.get(`${config.apiUrl}/users/getSingleUser/${userid}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      }
      )
      setuseDetails(data);
      setIsPending(false);
    })();
  }, [userid, userInfo]);

  return (
    <section className='flex flex-row flex-wrap w-full mx-auto'>
      { pending && 
        <section className='flex flex-row flex-wrap w-full mx-auto'>
          <Skeleton variant="rectangular" width={128} height={132} className='ml-1 mt-1'/>
          <Skeleton variant="rectangular" width={128} height={132} className='ml-1 mt-1'/>
          <Skeleton variant="rectangular" width={128} height={132} className='ml-1 mt-1'/>
          <Skeleton variant="rectangular" width={128} height={132} className='ml-1 mt-1'/>
        </section>}
      {userDetails && userDetails.post.map((item) => (
          <img
            key={item._id}
            alt="post pic"
            src={item.image}
            loading="lazy"
            className='w-32'
          />
      ))}
    </section>
  )
}

export default Photo