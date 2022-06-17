import { Link } from "react-router-dom";

const NotFound = () => {
    return ( 
        <div className="flex flex-col
        items-center justify-center">
            <div className="w-200 h-200 md:w-200 mx-auto py-6 text-center">
             <img className="w-full md:w-1/2 lg:mx-auto md:mx-auto z-50" alt="not-found" src="../img/undraw_page_not_found_su7k.png" />
             <p className="leading-normal text-2xl mb-8">
                        Desolé, nous n'avons pas trouvé la page demandé

             </p>
             <Link to="/" className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                        Retour à la page d'accueil
            </Link>
            </div>
        </div>
     );
}
 
export default NotFound;