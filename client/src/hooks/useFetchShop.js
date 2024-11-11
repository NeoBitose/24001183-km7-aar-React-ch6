import { useState } from "react";

async function useFetchShops() {

    const [shops, setShops] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    try {
        const response = await axios.get('http://localhost:3000/api/v1/shops')
        console.log(response)
        const data = response.data
        if (data.isSuccess) {
            setShops(data.data.shops.rows)
            setLoading(false)
        }
        else {
            setError("error")
        }
        return { shops, loading, error }
    }
    catch (error) {
        setError(`${error.message}`)
    }
        
};

export default useFetchShops