import { Button } from '@mui/material';
import React from 'react'
import useFetch from './useFetch';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Link, useParams } from 'react-router-dom';
import { UserState } from '../context/GlobalState';
import Loader from './Loader';
import { Avatar } from '@mui/material';
import config from '../config/config';

const Suggestion = () => {
  const { data, isPending } = useFetch(`${config.apiUrl}/users/getUser`);
  const { userid } = useParams();
  const { userInfo } = UserState();

  return (
    <div>
      <h2 className='font-bold'>Des suggestions pour vous:</h2>
      {isPending && <Loader/>}
      <div className='mt-4'>
        {
          data && data.filter(d => d.jobTitle != null && d._id !== userid && userInfo._id !== d._id).map((user) => (
            <section key={user._id} className="p-2 rounded-lg mb-2 border-indigo-500 flex items-center">
              {/* <img src={`/img/${user.photo}`} alt="userMiniProfile" width="80px"/> */}
              <Avatar
                alt="userMiniProfile"
                src={`/img/${user.photo}`}
                sx={{ width: 56, height: 56 }}
              />
              <div className="ml-4">
                <h5 className='font-bold'>{user.jobTitle}</h5>
                <Button variant="outlined" startIcon={<AddTaskIcon />} className='ml-2'>
                  <Link to={`/user/profile/${user._id}`}>afficher plus</Link>
                </Button>
              </div>
            </section>
          )
        )}

      </div>
    </div>
  )
}

export default Suggestion