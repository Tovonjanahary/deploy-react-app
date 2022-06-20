import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Alert, AlertTitle, Backdrop, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [newUser, setNewUser] = useState({ name: '', firstName: '', email: '', phone: '', adresse: '', birthdate: '', password: '' });
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [picture, setPicture] = useState('');
  const history = useHistory();
  const [photo, setPhoto] = useState();
  const [loadingPic, setLoadingPic] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const { data } = await axios.post('/users/addUser', { ...newUser, photo: photo });
    localStorage.setItem("userLogin", JSON.stringify(data));
    history.push("/");
    setIsPending(false);
    console.log(data)
    } catch (error) {
      setIsPending(false);
      if(error.message === "Network Error") {
        setError(error.message);
        return;
      }
    setError(error.response.data.error);
    }    
  }

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  }

  const handlePhoto = (pic) => {
    setLoadingPic(true);
    if (pic === undefined) {
      console.log('selectionnez un fichier')
      return;
    }
    const data = new FormData();
    data.append("api_key", "577399692975353");
    data.append("cloud_name", "tenzo");
    data.append("file", pic);
    data.append("upload_preset", "e-couloir");
    fetch("https://api.cloudinary.com/v1_1/tenzo/image/upload", {
      method: "post",
      body: data,
    })
    .then((res) => res.json())
    .then((data) => {
      setPhoto(data.url.toString());
      setLoadingPic(false);
    });
    setPicture(URL.createObjectURL(pic));
  }

  useEffect(() => {
    const user = localStorage.getItem('userLogin');
    if(user) {
      history.push("/")
    }
  },[history]);
  
  const classStyle = {
    label: "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2",
    select: "block appearance-none w-full bg-gray-200 border  border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
    input: `text-sm text-gray-base w-full
        mr-3 py-5 px-4 h-3 focus:outline-none border-b-2 border-gray-200
        border-gray-200 mb-2`,
    selectIcon: "pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
  };

  return (
    <div className="bg-white m-auto md:max-w-2xl w-full container" >
      <div className="flex flex-col">
        <p className="text-indigo-500 text-xl uppercase tracking-wider mb-3 text-center">
          S'inscrire
        </p>
        <form className="shadow-xl px-5 py-5" onSubmit={handleSubmit}>
          <div className="previewProfilePic w-1/4 md:w-1/2" >
              {picture && <img className="playerProfilePic_home_tile w-1/4 " alt="sary" src={picture && picture}></img>}
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <label className={classStyle.label} htmlFor="title">
              Nom
            </label>
            <input aria-label="Nom"
              type="text" placeholder="Name"
              id="name"
              className={classStyle.input}
              name="name"
              value={newUser.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <label className={classStyle.label} htmlFor="firstName">
              Prenom
            </label>
            <input aria-label="Prenom"
              type="text" placeholder="FirstName"
              id="title"
              className={classStyle.input}
              name="firstName"
              value={newUser.firstName}
              onChange={handleChange}
            />
          </div>
          <label className={classStyle.label} htmlFor="description">
            Email
          </label>
          <input aria-label="Email"
            type="text" placeholder="Email"
            id="email"
            className={classStyle.input}
            name="email"
            value={newUser.email}
            onChange={handleChange}
          />
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className={classStyle.label} htmlFor="adresse">
                Adresse
              </label>
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
              <label className={classStyle.label} htmlFor="email">
                Date de naissance
              </label>
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
              <label className={classStyle.label} htmlFor="phone">
                Phone
              </label>
              <input aria-label="Telephone"
                type="text" placeholder="Phone"
                id="phone"
                className={classStyle.input}
                name="phone"
                value={newUser.phone}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className={classStyle.label} htmlFor="password">
                Mot de passe
              </label>
              <input aria-label="Mot de passe"
                type="password" placeholder="mot de passe"
                id="password"
                className={classStyle.input}
                name="password"
                value={newUser.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <label className={classStyle.label} htmlFor="image">
            Image
          </label>
          <input aria-label="image"
            type="file"
            accept=".png, .jpg, .jpeg"
            className="mb-2"
            name="image"
            onChange={(e) => handlePhoto(e.target.files[0])}
          />
          {error && 
              <Alert severity="error">
                <AlertTitle>{ error }</AlertTitle>
              </Alert>
          }
          { isPending && 
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop> 
          }
          {
            loadingPic ? (
              <button type="submit" disabled
                className="bg-indigo-200 py-2 rounded-bl-lg w-full mt-4">
                chargement de l'image...
              </button>
            ) : (
              <button type="submit"
                className="bg-indigo-400 py-2 rounded-bl-lg w-full mt-4" onClick={handleToggle}>
                Enregistrer
              </button>
            )
          }
          <div className='pt-5'>Vous avez deja un compte? <Link to="/user/signin"><span className='text-red-600 font-bold'>Connectez-vous</span></Link> maintenant</div>
        </form>
      </div>
    </div>
  );
}

export default Signup;