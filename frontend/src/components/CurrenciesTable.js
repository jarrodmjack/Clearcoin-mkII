import { useEffect, useRef, useState } from "react"
import Pagination from "./Pagination"
import axios from "axios"
import TableRow from './CurrenciesTableRow'


const Table = () => {

    const [currencies, setCurrencies] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [currenciesPerPage, setCurrenciesPerPage] = useState(16)
    const [sortedAscending, setSortedAscending] = useState({ col: "", asc: false })


    useEffect(() => {
        const fetchCurrencyData = async () => {
            setLoading(true)
            const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            setCurrencies(res.data)
            setLoading(false)
        }
        fetchCurrencyData()
    }, [])

    const handleSort = (e) => {
        let sortedCurrencies
        switch (e.target.id) {
            case 'currency':
                sortedCurrencies = currencies.concat().sort((a, b) => {
                    return (a.name).localeCompare(b.name);
                })
                break;
            default:
                sortedCurrencies = currencies.concat().sort((a, b) => {
                    return a[e.target.id] - b[e.target.id]
                })
                break;
        }

        if (e.target.id === sortedAscending.col) {
            if (!sortedAscending.asc) {
                setSortedAscending({ ...sortedAscending, asc: true })
                setCurrencies(sortedCurrencies)
            } else {
                setSortedAscending({ ...sortedAscending, asc: false })
                setCurrencies(sortedCurrencies.reverse())
            }
        } else {
            setSortedAscending({ col: e.target.id, asc: true })
            setCurrencies(sortedCurrencies)
        }
    }

    // GET CURRENT CURRENCIES FOR PAGINATION
    const indexOfLastCurrency = currentPage * currenciesPerPage
    const indexOfFirstCurrency = indexOfLastCurrency - currenciesPerPage
    const currentCurrencies = currencies.slice(indexOfFirstCurrency, indexOfLastCurrency)

    // CHANGE PAGE
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    if (loading) {
        return <h2>Loading...</h2>
    } else {
        return (
            <div className="overflow-x-auto">
                <table
                    className="table table-zebra w-full"
                >
                    <thead>
                        <tr>
                            <th>Symb</th>
                            <th onClick={handleSort} id="currency" className="cursor-pointer hover:text-white">{sortedAscending.col === "currency" ? sortedAscending.asc ? '👆🏻' : "👇🏻" : ""} Currency</th>
                            <th onClick={handleSort} id="current_price" className="cursor-pointer hover:text-white">{sortedAscending.col === "current_price" ? sortedAscending.asc ? "👆🏻" : "👇🏻" : ""} Price</th>
                            <th onClick={handleSort} id="market_cap" className="cursor-pointer hover:text-white">{sortedAscending.col === "market_cap" ? sortedAscending.asc ? "👆🏻" : "👇🏻" : ""} Market Cap (CAD)</th>
                            <th onClick={handleSort} id="circulating_supply" className="cursor-pointer hover:text-white">{sortedAscending.col === "circulating_supply" ? sortedAscending.asc ? "👆🏻" : "👇🏻" : ""} Circulating Supply</th>
                            <th onClick={handleSort} id="total_volume" className="cursor-pointer hover:text-white">{sortedAscending.col === "total_volume" ? sortedAscending.asc ? "👆🏻" : "👇🏻" : ""} 24h Volume (CAD)</th>
                            <th onClick={handleSort} id="price_change_percentage_24h" className="cursor-pointer hover:text-white">{sortedAscending.col === "price_change_percentage_24h" ? sortedAscending.asc ? "👆🏻" : "👇🏻" : ""} 24h %</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCurrencies.map((currency, i) => (
                            <TableRow key={i} currency={currency} />
                        ))}
                    </tbody>
                </table>
                <Pagination currenciesPerPage={currenciesPerPage} totalCurrencies={currencies.length} paginate={paginate} currentPage={currentPage} />
            </div>
        )
    }
}
export default Table