import { useTransactionsContext } from '../hooks/useTransactionsContext'
import { useAuthContext } from '../hooks/useAuthContext'
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const TransactionDetails = ({ transaction }) => {
  const { dispatch } = useTransactionsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    
    if(!user){
      return
    }

    const response = await fetch('/api/transactions/' + transaction._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: json })
    }
  }

  return (
    <div className="transaction-details card bg-base-300 p-8 mb-10">
      <h4 className='text-accent text-2xl'>{transaction.currencyName}</h4>
      <p><strong>Price: </strong>${transaction.price} CAD</p>
      <p><strong>Qty: </strong>{transaction.qty}</p>
      <p>{formatDistanceToNow(new Date(transaction.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default TransactionDetails