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
    // const [portfolioBalance, setPortfolioBalance] = useState(0)

    // getting transactions from backend for user
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


    return (
        <>
            <h1>Portfolio Balance ${transactions && transactions.reduce((acc, c) => acc + (c.price * c.qty), 0)}CAD</h1>
            <h2>Total Change ${transactions && currencies && transactions.reduce((acc, trans) => acc + (trans.price - currencies.find(cur => cur.name === trans.currencyName).current_price) * trans.qty, 0).toFixed(2)}CAD</h2>
            <div className="home">
                <TransactionForm currencies={currencies} />
                <div className="transactions">
                    {transactions && transactions.map((transaction) => (
                        <TransactionDetails key={transaction._id} transaction={transaction} />
                    ))}
                </div>
            </div>
        </>

    )
}

export default Portfolio