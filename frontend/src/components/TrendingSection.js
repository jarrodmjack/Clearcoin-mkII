import { useState, useEffect } from "react"
import axios from 'axios'


const TrendingSection = () => {

    const [trendingCurrencies, setTrendingCurrencies] = useState([])

    useEffect(() => {
        const fetchTrendingCurrencies = async () => {
            const res = await axios.get('https://api.coingecko.com/api/v3/search/trending')
            setTrendingCurrencies(res.data.coins)
        }
        fetchTrendingCurrencies()
    }, [])

    if(trendingCurrencies.length < 1){
        return
    }


    return (
        <div className="card w-96 bg-base-300 shadow-xl">
            <div className="card-body">
                <h2 className="card-title mb-2">🔥 Trending</h2>
                <div className="flex gap-4">
                    <span>🚀</span><p>{trendingCurrencies[0].item.name}</p>
                </div>
                <div className="flex gap-4">
                    <span>🚀</span><p>{trendingCurrencies[1].item.name}</p>
                </div>
                <div className="flex gap-4">
                    <span>🚀</span><p>{trendingCurrencies[2].item.name}</p>
                </div>
            </div>
        </div>
    )
}

export default TrendingSection