import { useState } from 'react';
import { Link} from 'react-router-dom';
import NavAuth from './NavAuth';
import HomeIcon from '@mui/icons-material/Home';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import Profil from './Profil';
import SideDrawer from '../SideDrawer';

const Navbar = () => {
  const userInfo = JSON.parse(localStorage.getItem('userLogin'));
  const[showProfil, setShowProfil] = useState(false);

  return (
    <nav className="flex items-center justify-between bg-white flex-wrap bg-slate-100 w-full p-6 sticky top-0 z-50">
      <div className="flex items-center flex-shrink-0 text-dark mr-6">
        <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg>
        <Link to="/" className="font-semibold text-xl text-indigo-500 tracking-tight">Couloirs-Fianara</Link>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-end lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <SideDrawer/>
        </div>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto"> 
          <div className="text-sm flex flex-row items-center">
            <div className="flex items-end text-base text-gray-700">
              <HomeIcon/>
              <Link to='/' className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 mr-4 basis-1/2">
                Accueil
              </Link>
            </div>
            <div className="flex items-end text-base text-gray-700">
              <DesignServicesIcon/>
              <Link to="/services" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 mr-4 basis-1/2">
                Services
              </Link>
            </div>
            <div className="flex items-end text-base text-gray-700">
              <AddIcCallIcon/>
              <Link to='/contact' className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 mr-4 basis-1/2">
                Contact
              </Link>
            </div>
            {
              !userInfo ? <NavAuth /> 
              : 
              <div className="basis-1/2">
                <div className="relative basis-1/2 flex flex-row basis-1/2 items-center">
                  <img style={{ borderRadius: "50%" }} width="20px" height="20px" src={`/img/${userInfo.photo}`} alt={userInfo.name} onClick={() => {setShowProfil(!showProfil)}}/>
                  <svg className="fill-current h-4 w-4 basis-1/2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" onClick={() => {setShowProfil(!showProfil)}}/></svg>
                  { showProfil ? <div className='absolute bottom-0 left-0 top-14 z-40 -left-10 shadow-lg'><Profil/></div>: "" } 
                </div>
              </div>
            }          
          </div>                 
      </div>
    </nav>
  );
}

export default Navbar;