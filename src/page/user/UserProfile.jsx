import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Route, Switch, useParams, useRouteMatch } from 'react-router-dom'
import Contact from '../../components/Contact';
import AboutUser from '../../components/AboutUser';
import Post from '../../components/post/PostList.jsx';
import Photo from '../../components/Photo';
import { Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AddPost from '../../components/post/AddPost';
import PhoneIcon from '@mui/icons-material/Phone';
import { UserState } from '../../context/GlobalState';
import EditUser from '../user/EditUser';
import Suggestion from '../../components/Suggestion';

const UserProfile = () => {
  const { userInfo } = UserState();
  const { userid } = useParams();
  const [userDetails, setuseDetails] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { path, url } = useRouteMatch();
  const currentUser = userInfo._id === userid;

  useEffect(() => {
    const abortController = new AbortController();
    (async function getUserProfile() {
      const { data } = await axios.get(`http://localhost:5000/users/getSingleUser/${userid}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      }, { signal: abortController.signal }
      )
      setuseDetails(data);
    })();

    return () => abortController.abort();
  }, [userid, userInfo]);

  return (
    <div className='m-3 box-border'>
      <div className='container-sm bg-white w-full rounded-lg'>
        <div className="">
          <div className="flex flex-row justify-center items-center pt-3">
            <section>
              <img src={`/img/${userDetails.photo}`} alt={userDetails.name} width="150px" height="150px" style={{ borderRadius: "50%" }} className="mt-2 m-auto border-2 border-white" />
              <section>
                <div className='flex flex-row items-center w-96 justify-between mt-3'>
                  <section>
                    <h4 className='font-semibold text-2xl'>{userDetails.name} {userDetails.firstName}</h4>
                    <p className='text-base text-grey'>{userDetails.jobTitle}</p>
                  </section>
                  {
                    currentUser ?
                      <IconButton aria-label="delete" onClick={handleOpen}>
                        <EditIcon />
                      </IconButton>
                      : ""
                  }

                </div>
              </section>
              <section className='mt-2'>
                {
                  currentUser ?
                    <>
                      {
                        userDetails && userDetails.jobTitle == null ?
                          <>
                            <div className='text-xs m-1'>Remplissez votre profil afin que quelqu'un puisse vous voir</div>
                            <Button variant="outlined" startIcon={<AddTaskIcon />}>
                              <Link to={`/services/inscription/${userDetails._id}`}>Completez votre profil</Link>
                            </Button>
                          </> :
                          <Button variant="outlined" startIcon={<AddTaskIcon />}>
                            Votre profil est a jour
                          </Button>
                      }
                    </> :
                    <Button variant="outlined" startIcon={<PhoneIcon />}>
                      Contacter
                    </Button>
                }

              </section>
              <div className="container ml-5 flex flex-row justify-between mt-4 w-96 font-bold pb-2">
                <Link to={`${url}`}>Post</Link>
                <Link to={`${url}/AboutUser`}>A propos</Link>
                <Link to={`${url}/photo`}>Photos</Link>
                <Link to={`${url}/Contact`}>Me contacter</Link>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="mt-2 p-5 box-border max-w-5xl m-auto flex items-start">
        <section className='flex-auto w-64 rounded-md'>
          <Switch>
            <Route exact path={`${path}`}>
              <Post user={userDetails} />
            </Route>
            <Route path={`${path}/AboutUser`} component={AboutUser} />
            <Route path={`${path}/photo`} component={Photo} />
            <Route path={`${path}/Contact`} component={Contact} />
          </Switch>
        </section>
        <section className='bg-white flex-auto w-32 ml-5 rounded-md p-3 sticky top-20 border border-indigo-200'>
          {
            currentUser ? <AddPost setuseDetails={setuseDetails}/>
            : <Suggestion/>
          }
          
        </section>
      </div>
      <EditUser open={open} handleClose={handleClose} userDetails={userDetails && userDetails} setuseDetails={setuseDetails}/>
    </div>
  )
}

export default UserProfile