import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { UserState } from '../../context/GlobalState';

const EditUser = ({ open, handleClose, setuseDetails }) => {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: ' border border-indigo-200',
    boxShadow: 24,
  };
  const [newUser, setNewUser] = useState({ name: '', firstName: '', email: '', phone: '', adresse: '', birthdate: ''
  });

  const [error, setError] = useState(false);
  const { userid } = useParams();
  const { userInfo } = UserState();

  const getUserProfile = async () => {
    const { data } = await axios.get(`/users/getSingleUser/${userid}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });
    setuseDetails(data);
    };

  useEffect(() => {
    (async function getUserProfile() {
      const { data } = await axios.get(`/users/getSingleUser/${userid}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      }
      )
      setNewUser({
        name: data.name,
        firstName: data.firstName,
        email: data.email,
        phone: data.phone,
        adresse: data.adresse,
        birthdate: data.birthdate,
      })
    })();
  }, [userid, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/updateUser/${userid}`, {...newUser}, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });
      // window.location.href = `/user/profile/${userid}`;
      getUserProfile();
      handleClose();
    } catch (error) {
      setError(error.response.data.error);
    }
  }

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  }

  const classStyle = {
    label: "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2",
    select: "block appearance-none w-full bg-gray-200 border  border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
    input: `text-sm text-gray-base w-full
        mr-3 py-5 px-4 h-3 focus:outline-none border-b-2 border-gray-200
        border-gray-200 mb-2`,
    selectIcon: "pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="overflow-auto rounded-lg p-2 w-full container md:w-2/4">
        <h6 className="sticky top-0 bg-white text-sm p-1 flex items-center justify-between font-medium">
          <div className=" flex items-center"><EditIcon/> modification du profil</div>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon/>
          </IconButton>
        </h6>
        <form className="shadow-xl px-5 py-5 mt-2" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <input aria-label="Enter name"
              type="text" placeholder="Name"
              id="name"
              className={classStyle.input}
              name="name"
              value={newUser.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <input aria-label="Enter firstName"
              type="text" placeholder="FirstName"
              id="title"
              className={classStyle.input}
              name="firstName"
              value={newUser.firstName}
              onChange={handleChange}
            />
          </div>
          <input aria-label="Enter email"
            type="text" placeholder="Email"
            id="email"
            className={classStyle.input}
            name="email"
            value={newUser.email}
            onChange={handleChange}
          />
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <input aria-label="Enter l'url de votre site web"
                type="text" placeholder="Adresse"
                id="adresse"
                className={classStyle.input}
                name="adresse"
                value={newUser.adresse}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <input aria-label="Enter your birthdate"
                type="date" placeholder="Date de naissance"
                id="birthdate"
                className={classStyle.input}
                name="birthdate"
                value={newUser.birthdate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <input aria-label="Enter your phone"
                type="text" placeholder="Phone"
                id="phone"
                className={classStyle.input}
                name="phone"
                value={newUser.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          {error && <div className='text-danger'>{error}</div>}
          <button type="submit"
            className="bg-indigo-400 py-2 rounded-bl-lg w-full mt-4 sticky bottom-0">
            Valider
          </button>
        </form>
      </Box>
    </Modal>
  )
}

export default EditUser;