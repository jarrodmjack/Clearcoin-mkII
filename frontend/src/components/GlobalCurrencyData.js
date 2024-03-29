import React from 'react'
import { useEffect, useState } from 'react'

const GlobalCurrencyData = () => {
    const [globalMarketCap, setGlobalMarketCap] = useState(0)
    const [mcapChangePercent, setMcapChangePercent] = useState(0)
    const [globalMarketData, setGlobalMarketData] = useState()
    const formatter = Intl.NumberFormat('en', {
        notation: 'compact',
        style: 'currency',
        currency: 'CAD'
    })

    useEffect(() => {
        const fetchGlobalCurrencyData = async () => {
            const res = await fetch('https://api.coingecko.com/api/v3/global')
            const data = await res.json()
            console.log(data.data)
            setGlobalMarketData(data.data)
            setGlobalMarketCap(data.data.total_market_cap.cad)
            setMcapChangePercent(data.data.market_cap_change_percentage_24h_usd)
        }
        fetchGlobalCurrencyData()
    }, [])

    if (globalMarketCap && globalMarketData) {
        return (
            <div className='justify-around bg-base-200 hidden p-10 lg:flex'>
                <p>Market Cap: <span className='text-accent'>{formatter.format(globalMarketCap)}</span></p>
                <p>Volume: <span className='text-accent'>{formatter.format(globalMarketData.total_volume.cad)}</span></p>
                <p>Currencies: <span className='text-accent'>{Intl.NumberFormat('en', {notation: 'compact'}).format(globalMarketData.active_cryptocurrencies)}</span></p>
                <p>Ongoing ICO's: <span className='text-accent'>{globalMarketData.ongoing_icos}</span></p>
                <p>Exchanges: <span className='text-accent'>{globalMarketData.markets}</span></p>
            </div>
        )
    }
}
export default GlobalCurrencyData