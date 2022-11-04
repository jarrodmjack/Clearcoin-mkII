import { useEffect, useState } from "react"
import ExchangesTable from "../components/ExchangesTable"

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([])
  useEffect(() => {
    const fetchExchanges = async () => {
      const res = await fetch('https://api.coingecko.com/api/v3/exchanges?per_page=50')
      const data = await res.json()
      setExchanges(data)
    }
    fetchExchanges()
  }, [])

  if (exchanges) {
    return (
      <div>
        <div className="my-20 flex flex-col gap-4 w-full lg:w-4/6 ">
          <h1 className="text-3xl text-white text-center lg:text-left">Top Exchanges Rated by Coingecko's Trust Score</h1>
          <p className="text-center lg:text-left">Trust score is an algorithm created by Coingecko to evaluate an exchanges legitimacy based on a number of factors such as liquidity, available trading pairs, volume etc... For more information <a className="text-accent underline hover:text-white" href="https://www.coingecko.com/en/methodology" target="_blank">check out Coingecko's methodology</a></p>
        </div>
        <ExchangesTable exchanges={exchanges} />
      </div>
    )
  } else {
    return (
      <div>
        Data loading...
      </div>
    )
  }


}

export default Exchanges