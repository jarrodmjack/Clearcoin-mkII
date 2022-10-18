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
    
    
    // getting transactions from backend for user
    useEffect(() => {
        // console.log(user)
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
            if (user) {
                fetchTransactions()
            }
        }

        const fetchMarketCurrencies = async () => {
            const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=200&page=1&sparkline=false')
            const data = await res.json()
            setCurrencies(data)
        }
        fetchMarketCurrencies()

    }, [dispatch, user])



    return (
        <div className="home">
            <TransactionForm currencies={currencies} />
            <div className="transactions">
                {transactions && transactions.map((transaction) => (
                    <TransactionDetails key={transaction._id} transaction={transaction} />
                ))}
            </div>
        </div>
    )
}

export default Portfolio