import { Alert, AlertTitle, Backdrop, CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Signup = () => {

  const [newUser, setNewUser] = useState({ email: '', password: '' });
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const history = useHistory();
  
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
      const { data } = await axios.post('http://localhost:5000/users/signin', {
        email: newUser.email,
        password: newUser.password
      });
      localStorage.setItem("userLogin", JSON.stringify(data));
      window.location.href = "/";
      setIsPending(false);
    } catch (error) {
      setIsPending(false);
      if(error.message === "Network Error") {
        setError(error.message);
        return;
      }
      setError(error.response.data?.error);
    }
  }

  useEffect(() => {
    const user = localStorage.getItem('userLogin');
    if (user) {
      history.push("/")
    }
  }, [history]);

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
      <div className="bg-white m-auto md:max-w-2xl w-full container">
        <div className="flex flex-col mt-5">
          <p className="text-indigo-500 text-xl uppercase tracking-wider mb-3 text-center">
            Connexion
          </p>
          <form className="shadow-xl px-5 py-5" onSubmit={handleSubmit}>
            <label className={classStyle.label} htmlFor="description">
              Email
            </label>
            <input aria-label="Enter email"
              type="text" placeholder="Email"
              id="email"
              className={classStyle.input}
              name="email"
              value={newUser.email}
              onChange={handleChange}
            />
            <label className={classStyle.label} htmlFor="password">
              Mot de passe
            </label>
            <input aria-label="Enter your password"
              type="password" placeholder="mot de passe"
              id="password"
              className={classStyle.input}
              name="password"
              value={newUser.password}
              onChange={handleChange}
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
            <button type="submit"
              className="bg-indigo-400 py-2 rounded-bl-lg w-full mt-4" onClick={handleToggle}>
              Connexion
            </button>
            <div className='pt-5'>Vous n'avez pas de compte? <Link to="/user/signup">
              <span className='text-red-600 font-bold'>Inscrivez-vous</span></Link></div>
          </form>
        </div>
      </div>
      );
}

export default Signup;