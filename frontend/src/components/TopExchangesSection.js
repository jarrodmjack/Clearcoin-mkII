import React from 'react'
import { useEffect, useState } from 'react'


const TopExchangesSection = () => {

    const [trendingExchanges, setTrendingExchanges] = useState([])

    useEffect(() => {
        console.log('useEffect')
        const fetchExchanges = async () => {
            console.log('fetchexchanges')
            const res = await fetch('https://api.coingecko.com/api/v3/exchanges?per_page=5')
            const data = await res.json()
            console.log(res)
            console.log(data)
            setTrendingExchanges(data)
        }
        fetchExchanges()
    }, [])


    if(trendingExchanges.length < 1) {
        return
    }

    return (
        <div className="card w-96 bg-base-300 shadow-xl">
       
            <div className="card-body">
                <h2 className="card-title mb-2">💹 Top Exchanges</h2>
                <div className='flex gap-4'>
                    <span className=''>📊</span>
                    <p>{trendingExchanges[0].name}</p>
                    <p className='text-xs text-gray-500'>{trendingExchanges[0].trade_volume_24h_btc.toFixed(2)}btc</p>
                </div>
                <div className='flex gap-4'>
                    <span className=''>📊</span>
                    <p>{trendingExchanges[1].name}</p>
                    <p className='text-xs text-gray-500'>{trendingExchanges[1].trade_volume_24h_btc.toFixed(2)}btc</p>
                </div>
                <div className='flex gap-4'>
                    <span className=''>📊</span>
                    <p>{trendingExchanges[2].name}</p>
                    <p className='text-xs text-gray-500'>{trendingExchanges[2].trade_volume_24h_btc.toFixed(2)}btc</p>
                </div>
            </div>
        </div>
    )
}

export default TopExchangesSection