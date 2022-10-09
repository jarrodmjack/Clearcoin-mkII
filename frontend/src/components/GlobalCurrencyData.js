import React from 'react'
import { useEffect, useState } from 'react'


const GlobalCurrencyData = () => {

    const [globalMarketCap, setGlobalMarketCap] = useState(0)
    const [mcapChangePercent, setMcapChangePercent] = useState(0)

    useEffect(() => {
        const fetchGlobalCurrencyData = async () => {
            const res = await fetch('https://api.coingecko.com/api/v3/global')
            const data = await res.json()
            setGlobalMarketCap(data.data.total_market_cap.cad)
            setMcapChangePercent(data.data.market_cap_change_percentage_24h_usd)
        }

        fetchGlobalCurrencyData()
    }, [])

    const isMcapPositive = mcapChangePercent >= 0 ? true : false

    return (
        <div className='text-center text-2xl'>
            <p className=''>The global cryptocurrency market cap is <span className='font-bold'>${globalMarketCap.toLocaleString()}</span> CAD, a change of <span style={{color: `${isMcapPositive ? 'lime' : 'red'}`}}>{mcapChangePercent.toFixed(2)}%</span> in the last 24 hours.</p>
        </div>
    )
}

export default GlobalCurrencyData