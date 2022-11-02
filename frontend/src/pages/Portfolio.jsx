import { useEffect, useState } from 'react'
import { useTransactionsContext } from "../hooks/useTransactionsContext"
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'

// components
import TransactionDetails from '../components/TransactionDetails'
import TransactionForm from '../components/TransactionForm'

const Portfolio = () => {
    const { transactions, dispatch } = useTransactionsContext()
    const { user } = useAuthContext()
    const navigate = useNavigate()
    const [currencies, setCurrencies] = useState([])
    const [profitOrLoss, setProfitOrLoss] = useState(0)

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }

        if (user) {
            const fetchTransactions = async () => {
                const response = await fetch('/api/transactions', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json = await response.json()
                if (response.ok) {
                    dispatch({ type: 'SET_TRANSACTIONS', payload: json })
                }else{
                    navigate('/login')
                }
            }
            fetchTransactions()
        }
        // fetching current market data to compare against portfolio
        const fetchMarketCurrencies = async () => {
            const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=200&page=1&sparkline=false')
            const data = await res.json()
            setCurrencies(data)
        }
        fetchMarketCurrencies()
    }, [dispatch, user])


    let portfolioBal = 0;
    if (transactions && currencies.length > 0) {
        portfolioBal = transactions.reduce((acc, trans) => acc + (currencies.find(cur => cur.name === trans.currencyName).current_price - trans.price) * trans.qty, 0).toFixed(2)
    }

    return (
        <div>
            <div className='flex my-10 justify-center sm:justify-start sm:w-1/2'>
                <div className='flex flex-col text-center p-2 sm:p-8 bg-base-300 rounded-2xl mr-10'>
                    <span className=' text-white sm:text-2xl'>{transactions && transactions.reduce((acc, c) => acc + (c.price * c.qty), 0)} CAD</span>
                    <h1 className=''>Portfolio Balance</h1>
                </div>
                <div className='flex flex-col text-center p-2 sm:p-8 bg-base-300 rounded-2xl'>
                    <span className=' text-white sm:text-2xl'>{portfolioBal} CAD</span>
                    <h2 className=''>Total {portfolioBal >= 0 ? 'Profit' : 'Loss'}</h2>
                </div>
            </div>
            <div className="home flex-col lg:grid">
                <TransactionForm currencies={currencies} />
                <div className="transactions">
                    {transactions && transactions.map((transaction) => (
                        <TransactionDetails key={transaction._id} transaction={transaction} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Portfolio