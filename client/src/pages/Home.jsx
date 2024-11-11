import { useEffect, useState } from "react"
import axios from 'axios'

function Home() {

    const [page, setPage] = useState(null);
    const [pagination, setPagination] = useState([]);
    const [activePage, setActivePage] = useState(1);

    const [shops, setShops] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [shopName, setShopName] = useState("");
    const [adminEmail, setAdminEmail] = useState("");
    const [productName, setProductName] = useState("");
    const [stock, setStock] = useState("");

    const [body, setBody] = useState({
        params: {
            shopName: shopName,
            adminEmail: adminEmail,
            productName: productName,
            stock: stock,
            page: activePage
        }
    })

    const handlerFilter = () => {
        setActivePage(1)
        setBody({
            params: {
                shopName: shopName,
                adminEmail: adminEmail,
                productName: productName,
                stock: stock,
                page: activePage
            }
        })
    }

    const handlerPagination = (pageSelect) => {
        setActivePage(pageSelect)
        setBody({
            params: {
                shopName: shopName,
                adminEmail: adminEmail,
                productName: productName,
                stock: stock,
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
                    <div id="shopForm" className="flex p-10 shadow-md text-left justify-center gap-5">
                        <div className="">
                            <label htmlFor="shopName" className="block text-gray-700 font-medium mb-2">Nama Toko</label>
                            <input type="text" id="shopName" name="shopName" value={shopName} onChange={(e) => setShopName(e.target.value)} className="w-full text-black bg-white px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                        </div>

                        <div className="">
                            <label htmlFor="productName" className="block text-gray-700 font-medium mb-2">Nama Produk</label>
                            <input type="text" id="productName" name="productName" value={productName} onChange={(e) => setProductName(e.target.value)} className="w-full text-black bg-white px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                        </div>

                        <div className="">
                            <label htmlFor="stock" className="block text-gray-700 font-medium mb-2">Stok</label>
                            <input type="number" id="stock" name="stock" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full text-black bg-white px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                        </div>
                        <div className="mt-7">
                            <button onClick={() => handlerFilter()} className=" bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                                Submit
                            </button>
                        </div>
                    </div>
                    <section className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {shops.map((shop, index) => (
                            <div key={index} className="p-4 border rounded-md bg-white shadow-md">
                                <img src={shop.products[0].images[0]} alt="Car" className="w-full h-40 object-cover mb-4" />
                                <h3 className="font-semibold text-black">{shop.name}</h3>
                                <p className="text-green-500 font-bold">Rp {shop.products[0].price}</p>
                                <p className="text-gray-600 mt-2 text-sm">Stock : {shop.products[0].stock}</p>
                                {/* <div className="flex items-center justify-between text-gray-500 text-sm mt-4"> <span>4 orang</span> <span>Manual</span> <span>Tahun 2020</span>
                                </div> */}
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

