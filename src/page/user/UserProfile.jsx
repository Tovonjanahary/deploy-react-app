import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Route, Switch, useParams, useRouteMatch, useLocation } from 'react-router-dom'
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
import Skeleton from '@mui/material/Skeleton';
import config from '../../config/config.js';

const UserProfile = () => {
  const { userInfo } = UserState();
  const { userid } = useParams();
  const [userDetails, setuseDetails] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { path, url } = useRouteMatch();
  const currentUser = userInfo._id === userid;
  const location = useLocation();

  const getColor = (curr) => {
    if (location.pathname === curr) {
      return 'border-b-2 border-sky-600';
    }
  }
  useEffect(() => {
    try {
      const abortController = new AbortController();
      (async function getUserProfile() {
        const { data } = await axios.get(`${config.apiUrl}/users/getSingleUser/${userid}`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        }, { signal: abortController.signal }
        )
        setuseDetails(data);
      })();

      return () => abortController.abort();
    } catch (error) {
      console.log(error);
    }

  }, [userid, userInfo]);

  return (
    <div className='m-3 box-border'>
      <div className='container-sm bg-white w-full rounded-lg'>
        <div className="">
          <div className="flex flex-row justify-center items-center pt-3">
            <section>
              {
                !userDetails ? (
                  <>
                    <Skeleton variant="circular" width={150} height={150} className="mt-2 m-auto border-2 border-white"/>
                    <Skeleton animation="wave" width={80} className="m-auto"/>
                  </>
                )
                  : (
                  <img src={userDetails.photo} alt={userDetails.name} width="150px" height="150px" style={{ borderRadius: "50%" }} className="mt-2 m-auto border-2 border-white" />
                  )
              }  
              <section className='flex items-center justify-center'>
                <div className='flex flex-wrap items-center justify-center md:justify-between lg:justify-between mt-3'>
                  <section>
                    <h4 className='text-base md:font-semibold text-2xl'>{userDetails.name} {userDetails.firstName}</h4>
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
                    <div className='flex flex-col items-center'>
                      {
                        userDetails && userDetails.jobTitle == null ?
                          <>
                            <div className='text-xs m-1'>Remplissez votre profil afin que quelqu'un puisse vous voir</div>
                            <Button variant="outlined" startIcon={<AddTaskIcon />}>
                              <Link to={`/services/inscription/${userDetails._id}`}>Completez votre profil</Link>
                            </Button>
                          </> :
                          <Button variant="outlined" startIcon={<AddTaskIcon />} className="flex items-center justfy-between">
                            Votre profil est a jour
                          </Button>
                      }
                    </div> :
                    <Button variant="outlined" startIcon={<PhoneIcon />} className="m-auto w-full">
                      Contacter
                    </Button>
                }
              </section>
              <div className="container flex flex-wrap items-center justify-center lg:justify-between flex mt-4 lg:w-96 font-bold pb-2">
                <Link to={`${url}`} className={"ml-2 " + getColor(`${url}`)}>Post</Link>
                <Link to={`${url}/AboutUser`} className={"ml-2 " + getColor(`${url}/AboutUser`)}>A propos</Link>
                <Link to={`${url}/photo`} className={"ml-2 " + getColor(`${url}/photo`)}>Photos</Link>
                <Link to={`${url}/Contact`} className={"ml-2 " + getColor(`${url}/Contact`)}>Me contacter</Link>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="mt-2 p-5 box-border m-auto flex flex-col items-center justify-center flex-col-reverse md:max-w-4xl lg:max-w-5xl md:flex-row md:items-start">
        <section className='flex-auto w-full rounded-md mt-4 md:mt-0 md:w-96 md:mr-5'>
          <Switch>
            <Route exact path={`${path}`}>
              <Post user={userDetails} />
            </Route>
            <Route path={`${path}/AboutUser`} component={AboutUser} />
            <Route path={`${path}/photo`} component={Photo} />
            <Route path={`${path}/Contact`} component={Contact} />
          </Switch>
        </section>
        <section className='bg-white flex-auto w-full rounded-md p-3 lg:sticky top-7 border border-indigo-200 lg:block md:w-64'>
          {
            currentUser ? <AddPost setuseDetails={setuseDetails} />
              : <Suggestion />
          }

        </section>
      </div>
      <EditUser open={open} handleClose={handleClose} userDetails={userDetails && userDetails} setuseDetails={setuseDetails} />
    </div>
  )
}

export default UserProfile