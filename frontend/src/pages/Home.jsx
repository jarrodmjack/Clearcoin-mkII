import { useEffect } from 'react'
import { useTransactionsContext } from "../hooks/useTransactionsContext"

// components
import TransactionDetails from '../components/TransactionDetails'
import TransactionForm from '../components/TransactionForm'

const Home = () => {
  const { transactions, dispatch } = useTransactionsContext()

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch('/api/transactions')
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_TRANSACTIONS', payload: json })
      }
    }

    fetchTransactions()
  }, [dispatch])

  return (
    <div className="home">
      <div className="transactions">
        {transactions && transactions.map((transaction) => (
          <TransactionDetails key={transaction._id} transaction={transaction} />
        ))}
      </div>
      <TransactionForm />
    </div>
  )
}

export default Home