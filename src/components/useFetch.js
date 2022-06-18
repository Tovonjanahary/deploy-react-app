import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    (async function getData() {
      try {
        const { data } = await axios.get(url, { signal: abortController.signal })
        setData(data);
        setIsPending(false);
        setError(null);
      } catch (error) {  
        setIsPending(false) 
        setError('ouppppssss,impossible de charger les donnees,Verifiez bien que vous avez une bonne connexion internet');  
        console.log(error)
      }
    })();
    return () => abortController.abort();
  },[url]);
  
  return { data, isPending, error };
}

export default useFetch; 