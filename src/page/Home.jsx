import { Link } from 'react-router-dom';

const HomePage = () => {

  return (
    <div className="home-page bg-white">
      <div className="pt-24 ">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
            <p className="uppercase tracking-loose w-full">Vous cherchez des services ?</p>
            <h1 className="my-4 text-5xl font-bold text-gray-400 leading-tight">
              Découvrez notre nouvelle solution digitale pouaaa! 😃
            </h1>
            <p className="leading-normal text-2xl mb-8">
              Touvez ici des plusieurs secteurs d'activité basés à Fianarantsoa.
            </p>
            <Link to="/services" className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
              Trouver des services
            </Link>
          </div>
          <div className="w-full md:w-3/5 py-6 text-center">
            <img className="w-full md:w-4/5 z-50" alt="background" src="/img/undraw_adventure_map_hnin.png" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;