import { useEffect, useState } from "react"
import axios from 'axios'

function Home() {

    const [page, setPage] = useState(null);
    const [pagination, setPagination] = useState([]);
    const [activePage, setActivePage] = useState(1);

    const [shops, setShops] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [body, setBody] = useState({
        params: {
            page: activePage
        }
    })

    const handlerPagination = (pageSelect) => {
        setActivePage(pageSelect)
        setBody({
            params: {
                page: pageSelect
            }
        })
    }

    useEffect(() => {

    }, [])

    //fetch data
    useEffect(() => {
        const fetchShops = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/shops', body)
                console.log(response)
                const data = response.data
                console.log(data.isSuccess)
                if (data.isSuccess) {
                    setShops(data.data.shops.rows)
                    setPage(data.data.totalPages)
                    setActivePage(parseInt(data.data.page))
                }
                else {
                    setError("error")
                }
            }
            catch (error) {
                setError(`${error.message}`)
            } finally {
                setLoading(false)
            }
        };
        fetchShops()
    }, [body])

    useEffect(() => {
        const tempPagination = []
        for (let i = 0; i < page; i++) {
            tempPagination.push(
                <a className={i + 1 === activePage ? "text-green-500 text-lg" : "text-black text-lg"} key={i} onClick={() => handlerPagination(i + 1)}>
                    {i + 1}
                </a>
            );
        }
        setPagination(tempPagination)
    }, [shops])


    return (
        <>
            {error && <p className="text-red=300">{error}</p>}
            {loading && <p>...Loading</p>}
            {!error && (
                <>
                    <section className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {shops.map((shop, index) => (
                            <div key={index} className="p-4 border rounded-md bg-white shadow-md">
                                <img src={shop.products[0].images[0]} alt="Car" className="w-full h-40 object-cover mb-4" />
                                <h3 className="font-semibold text-black">{shop.name}</h3>
                                <p className="text-green-500 font-bold">Rp {shop.products[0].price}</p>
                                <p className="text-gray-600 mt-2 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                <div className="flex items-center justify-between text-gray-500 text-sm mt-4"> <span>4 orang</span> <span>Manual</span> <span>Tahun 2020</span>
                                </div>
                                <button className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded-md">Pilih Mobil</button>
                            </div>
                        ))}
                    </section>
                    <div className="flex gap-10 justify-center p-10">
                        {pagination}
                    </div>
                </>
            )}
        </>
    )
}

export default Home

