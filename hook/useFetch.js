import { useState, useEffect } from "react";    
import axios from "axios";


const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
          'x-rapidapi-key': '241a084076msh481d001112c1b58p1ae12fjsnc01b32177b3c',
          'x-rapidapi-host': 'jsearch.p.rapidapi.com'
        },
        
        params: { ...query },
    };

    const fetchData = async () => {
        setIsLoading(true);

        try{
            const response = await axios.request(options);

            setData(response.data.data);
            setIsLoading(false);
        }catch(error) {
            setError(error);
            const errorMessage = error?.code 
                ? `Error Code: ${error.code}, Message: ${error.message}` 
                : `Message: ${error.message || 'An unknown error occurred'}`;
                
            alert(errorMessage);
        }
        finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return { data, isLoading, error, refetch };
}

export default useFetch;