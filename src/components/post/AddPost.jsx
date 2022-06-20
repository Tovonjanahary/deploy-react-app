import { PhotoCamera } from '@mui/icons-material';
import { IconButton,Alert, AlertTitle, Backdrop, CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { UserState } from '../../context/GlobalState';
import { styled } from '@mui/material/styles';

const AddPost = ({setuseDetails}) => {

  const [post, setPost] = useState({ description: "" });
  const [image, setImage] = useState('');
  const { userid } = useParams();
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [loadingPic, setLoadingPic] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const { userInfo } = UserState();

  const classStyle = {
    label: "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2",
    select: "block appearance-none w-full bg-gray-200 border  border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
    input: `text-sm text-gray-base w-full
        mr-3 py-5 px-4 h-3 focus:outline-none border-b-2 border-gray-200
        border-gray-200 mb-2`,
    selectIcon: "pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
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
      setImage(data.url.toString());
      console.log(data.url.toString());
      setLoadingPic(false);
    });
    setImage(URL.createObjectURL(pic));
  }

  async function getUserProfile() {
    const { data } = await axios.get(`/users/getSingleUser/${userid}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });
    setuseDetails(data);
    setIsPending(false);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/service/addPost/${userid}`, { ...post, image: image });
      getUserProfile();
      setPost({ description: "" });
      setImage("");
      setError("");
    } catch (error) {
      if(error.message === "Network Error") {
        setError(error.message);
        return;
      }
      setError(error.response.data.error);
      setIsPending(false);
    }
  }

  const Input = styled('input')({
    display: 'none',
  });
  return (
    <form action="" onSubmit={handleSubmit} encType='multipart/form-data'>
      <h2>PUBLIER QUELQUE CHOSE</h2>
      <div className="relative mb-2">
        <div>
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
      </div>
      <div>
        <textarea aria-label="Description de métier"
          type="text" placeholder="Ecrivez ici..."
          id="description"
          className={classStyle.input}
          name="description"
          value={post.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <label htmlFor="icon-button-file">
          <Input accept="image/*" id="icon-button-file" type="file"
            onChange={(e) => handlePhoto(e.target.files[0])}
            name="image"
           />
          <IconButton color="primary" aria-label="upload picture" component="span">
            <PhotoCamera />
          </IconButton>
          Ajouter une photo
        </label>
      </div>
      { image && <img src={ image && image } alt="post pic" width="100px" height="100px"/> }
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
          <button
            className="bg-indigo-200 py-2 rounded-bl-lg w-full mt-4" disabled>
            Chargement de l'image...
          </button>
        ) :
        (
          <button type="submit"
            className="bg-indigo-400 py-2 rounded-bl-lg w-full mt-4" onClick={handleToggle}>
            Publier
          </button>
        )
      }
      
    </form>
  )
}

export default AddPost