import { useEffect } from 'react'
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

    useEffect(() => {
        console.log(user)
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

    }, [dispatch, user])


    return (
        <div className="home">
            <TransactionForm />
            <div className="transactions">
                {transactions && transactions.map((transaction) => (
                    <TransactionDetails key={transaction._id} transaction={transaction} />
                ))}
            </div>
        </div>
    )
}

export default Portfolio