import { useTransactionsContext } from '../hooks/useTransactionsContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const TransactionDetails = ({ transaction }) => {
  const { dispatch } = useTransactionsContext()

  const handleClick = async () => {
    const response = await fetch('/api/transactions/' + transaction._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: json })
    }
  }

  return (
    <div className="transaction-details">
      <h4>{transaction.currencyName}</h4>
      <p><strong>Price: </strong>${transaction.price} CAD</p>
      <p><strong>Qty: </strong>{transaction.qty}</p>
      <p>{formatDistanceToNow(new Date(transaction.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default TransactionDetails