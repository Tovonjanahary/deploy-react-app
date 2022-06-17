import React from 'react'
import { Link } from 'react-router-dom';
import { UserState } from '../../context/GlobalState';

const Profil = () => {
  const { userInfo } = UserState();

  const logout = (e) => {
    e.preventDefault();
    const confirm = window.confirm("se deconnecter ?");
    if (confirm) {
      localStorage.removeItem('userLogin');
      window.location.href = "/";
    }
  }
  return (
    <div className='w-64 p-3 rounded-lg bg-white '>
      { 
        userInfo && (
          <div>
            <img style={{ borderRadius: "50%" }} width="50px" height="50px" src={`/img/${userInfo.photo}`} alt="profil" className='m-auto' />
            <h6 className='text-center mt-2'>{userInfo.name} {userInfo.firstName}</h6>
            <h3 className='text-center mt-1'>{userInfo.jobTitle}</h3>
            <button className=' m-auto border-black rounded-lg p-1 mt-2' style={{ width:"100%", border:"1px solid black" }}><Link to={`/user/profile/${userInfo._id}`}>voir le profil</Link></button>
            <button className=' m-auto shadow-sm text-slate-400 rounded-lg p-1 mt-2' style={{ width: "100%" }} onClick={logout}>Deconnexion</button>
            <button className=' m-auto shadow-sm text-slate-400 rounded-lg p-1 mt-2' style={{ width: "100%" }}>Parametres</button>
          </div>
        )
      }
    </div>
  )
}

export default Profil