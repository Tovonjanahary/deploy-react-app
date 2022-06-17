import { Link } from "react-router-dom";

const NavAuth = () => {
  return (
    <div className="text-sm lg:flex-grow">
      <Link to="/user/signin" className="block border h-full px-6 py-2 rounded-lg shadow-xl hover:outline-0 outline-0 bg-indigo-400 mt-4 lg:inline-block lg:mt-0 text-teal-200 mr-4">
        Connexion
      </Link>
      <Link to="/user/signup" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 mr-4">
        S'inscrire
      </Link>
    </div>
  )
}

export default NavAuth;