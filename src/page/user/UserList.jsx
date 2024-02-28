import { Link } from 'react-router-dom';
import Skeleton from '../../components/Skeleton';
import useFetch from '../../components/useFetch'
import { UserState } from '../../context/GlobalState';
import config from '../../config/config';

const Service = () => {

  const { data, error, isPending } = useFetch(`${config.apiUrl}/users/getUser`);
  const { userInfo } = UserState();

  return (
    <div className="container max-w-xs box-border m-auto bg-white flex flex-wrap items-center justify-center md:justify-center md:flex-row md:items-start md:flex-nowrap md:max-w-4xl">
      <div className="sm:max-w-xl lg:max-w-full mx-0 lg:py-5 lg:px-5 text-xs flex-auto w-32">
        <div className="xl:max-w-lg xl:ml-auto">
          {error && 
          <div>
            <div className='text-center font-bold'>{ error }</div>
            <img src='/img/undraw_Warning_re_eoyh.png' alt="warning"/>
          </div>}
          { isPending && <Skeleton/> }       
          {data && data.filter(u => u.jobTitle != null && userInfo._id !== u._id).map((service) => (
            <div className="flex flex-col bg-white w-full mb-5 shadow-xl rounded-lg dark:bg-gray-300 group overflow-hidden hover:shadow-2xl transition-shadow duration-300" key={service._id}>
              <div className="p-2 dark:bg-white rounded-tl-lg rounded-bl-lg">
                <div style={{ backgroundImage: `url(/img/${service.photo})` }} className="bg-contain bg-no-repeat bg-center w-full h-full transition-transform duration-300 group-hover:transform group-hover:scale-125"></div>
              </div>
              <div className=" p-5">
                <h1 className="md:text-2xl">{service.jobTitle.substr(0, 50)}</h1>
                <h3 className="text-gray-400 dark:text-gray-700">{service.categorie}</h3>
                <div className="mt-4 mb-4 text-xs">{service.description.substr(0, 20)}...</div>
                <Link to={`/user/profile/${service._id}`} className="mr-2 text-black bg-indigo-300 px-4 my-5 py-1 shadow-xl rounded-lg dark:text-gray-200">Details</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:block lg:relative ml-5 pr-2 pl-2 text-xs flex-auto w-64">
        <div className="xl:max-w-lg xl:ml-auto lg:w-full container">
          <img className=" hidden z-30 top-0 right-0 rounded-lg shadow-xl sm:mt-8 sm:h-64 sm:w-full sm:object-cover lg:object-cover lg:w-full sm:object-center lg:block" src="/img/beach-work.jpg" alt="Woman workcationing on the beach" />
          <h1 className="mt-6 text-xs font-bold text-gray-900 leading-tight sm:mt-8 sm:text-4xl lg:text-3xl xl:text-4xl">
            Vous pouvez maintenant trouver des services partout
            <br className="" /><span className="text-indigo-500">Solution de l'avenir</span>
          </h1>
          <p className="mt-2 text-gray-600 sm:mt-4 sm:text-xl">
            Couloirs Fianara est toujours à votre disposition si vous voudriez nous confier la localisation de votre établissement
          </p>
          <div className="mt-4 sm:mt-6">
            <Link to="/services/inscription" className="inline-block px-3 py-2 rounded-lg shadow-lg bg-indigo-500 text-xs text-white uppercase tracking-wider sm:font-semibold sm:text-base">S'inscrire gratuitement</Link>
            <img className="mt-6 rounded-lg shadow-xl sm:mt-8 sm:h-64 sm:w-full sm:object-cover sm:object-center lg:block" src='/img/pub_home_service.png' alt="Woman workcationing on the beach" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;