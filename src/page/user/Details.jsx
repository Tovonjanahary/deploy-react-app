import useFetch from '../../components/useFetch';
import { useParams } from "react-router";
import { Link } from 'react-router-dom';
import config from '../../config/config';

const Details = () => {
  const { id } = useParams();
  const { data: service, isPending, error } = useFetch(`${config.apiUrl}/users/getSingleUser/` + id);

  return (
    <div className="shadow-xl">
      {error && <div className="flex flex-col items-center justify-center">{error}</div>}
      {isPending && <div className="flex flex-col items-center justify-center">Loading...</div>}
      {service &&
        <div className="bg-gray-100 flex" key={service._id}>
          <div className="px-8 py-12 max-w-md mx-auto sm:max-w-xl lg:max-w-full lg:w-1/2 lg:py-24 lg:px-12">
            <div className="xl:max-w-lg xl:ml-auto">
              {service.image &&
                <img className="mt-6 rounded-lg shadow-xl sm:mt-8 sm:h-64 sm:w-full sm:object-cover sm:object-center lg:hidden" src={`/img/${service.photo}`} alt="Woman workcationing on the beach" />}
              <span className="text-xl uppercase text-indigo-500">{'>' + service.categorie}</span>
              <div className='d-flex' style={{display: "flex", alignItems:'center'}}>
                <div>
                  <img width="50px" height="5px" style={{borderRadius: "50%", marginRight:"10px"}}src={`/img/${service.photo}`} alt="Woman workcationing on the beach " />
                </div>
                <p className="mt-2 text-gray-600 sm:mt-4 sm:text-xl">
                  {service.name} {service.firstName}
                </p>
              </div>
            
              <h1 className="mt-6 text-2xl font-bold text-gray-900 leading-tight sm:mt-8 sm:text-4xl lg:text-3xl xl:text-4xl">
                {service.title}
              </h1>
              <span className="mt-1 text-1xl text-gray-600 leading-tight sm:mt-8 sm:text-4xl lg:text-1xl xl:text-4xl">
                {service.adresse},{service.ville}
                <br className="hidden lg:inline" />
              </span>
              <span className="text-xl text-indigo-400">{'#' + service.sous_categorie}</span>
              <br className="hidden lg:inline" />
              <span className="text-sm text-gray-500">{'contact: ' + service.phone}</span>
              <br className="hidden lg:inline" />
              <p className="mt-2 text-gray-600 sm:mt-4 sm:text-xl">
                {service.description}
              </p>
              <Link className="text-sm text-indigo-500">{'https://wwww.' + service.site_web}</Link>
              <br className="hidden lg:inline" />
              <div className="mt-4 sm:mt-6">
                <Link to="/services" className="inline-block px-5 py-3 rounded-lg shadow-lg bg-indigo-500 text-sm text-white uppercase tracking-wider font-semibold sm:text-base">Retour</Link>
              </div>
            </div>
          </div>
          <div className="hidden lg:block lg:w-1/2 lg:relative">
            {service.photo &&
              <img className="absolute inset-0 h-full w-full object-cover object-center" src={`../img/${service.photo}`} alt="Woman workcationing on the beach " />}
          </div>
        </div>
      }
    </div>
  );
}


export default Details;