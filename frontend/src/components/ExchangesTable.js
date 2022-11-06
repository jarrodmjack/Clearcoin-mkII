import { useEffect, useState } from 'react'
import ExchangesTableRow from './ExchangesTableRow'


const ExchangesTable = () => {


    const [exchanges, setExchanges] = useState([])
    const [sortedAscending, setSortedAscending] = useState({ col: "", asc: false })

    useEffect(() => {
        const fetchExchangeList = async () => {
            const res = await fetch('https://api.coingecko.com/api/v3/exchanges?per_page=50')
            const data = await res.json()
            console.log(data)
            setExchanges(data)
        }
        fetchExchangeList()
    }, [])


    const handleSort = (e) => {
        console.log('sort exchanges')
        let sortedExchanges
        switch (e.target.id) {
            case 'name':
                sortedExchanges = exchanges.concat().sort((a, b) => {
                    return (a.name).localeCompare(b.name)
                })
                break;
            case 'country':
                sortedExchanges = exchanges.concat().sort((a, b) => {
                    if (!a.country) {
                        return "na".localeCompare(b.country)
                    } else if (!b.country) {
                        return (a.country).localeCompare("na")
                    } else {
                        return (a.country).localeCompare(b.country)
                    }
                })
                break;
            default:
                sortedExchanges = exchanges.concat().sort((a, b) => {
                    return a[e.target.id] - b[e.target.id]
                })
                break;
        }


        if (e.target.id === sortedAscending.col) {
            if (!sortedAscending.asc) {
                setSortedAscending({ ...sortedAscending, asc: true })
                setExchanges(sortedExchanges)
            } else {
                setSortedAscending({ ...sortedAscending, asc: false })
                setExchanges(sortedExchanges.reverse())
            }
        } else {
            setSortedAscending({ col: e.target.id, asc: true })
            setExchanges(sortedExchanges)
        }

    }


    return (
        <div className="overflow-x-auto mb-10">
            <table
                className="table table-zebra w-full"
            >
                <thead>
                    <tr>
                        <th>Symb</th>
                        <th
                            className="cursor-pointer hover:text-white"
                            onClick={handleSort}
                            id="name"
                        >Exchange</th>
                        <th
                            className="cursor-pointer hover:text-white"
                            onClick={handleSort}
                            id="country"
                        >Origin</th>
                        <th
                            className="cursor-pointer hover:text-white"
                            onClick={handleSort}
                            id="trust_score"
                        >Trust Score</th>
                        <th
                            className="cursor-pointer hover:text-white"
                            onClick={handleSort}
                            id="trade_volume_24h_btc"
                        >24h Volume (BTC)</th>
                    </tr>
                </thead>
                <tbody>
                    {exchanges.map((exchange, i) => (
                        <ExchangesTableRow key={exchange.id} exchange={exchange} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ExchangesTable