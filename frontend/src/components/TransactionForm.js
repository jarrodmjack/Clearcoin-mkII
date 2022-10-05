import { useState } from "react"
import { useTransactionsContext } from "../hooks/useTransactionsContext"

const TransactionForm = () => {
  const { dispatch } = useTransactionsContext()

  const [currencyName, setCurrencyName] = useState('')
  const [price, setPrice] = useState('')
  const [qty, setQty] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const transaction = { currencyName, price, qty }

    const response = await fetch('/api/transactions', {
      method: 'POST',
      body: JSON.stringify(transaction),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setCurrencyName('')
      setPrice('')
      setQty('')
      setError(null)
      setEmptyFields([])
      console.log('new transactions added', json)
      dispatch({ type: 'CREATE_TRANSACTION', payload: json })
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Transaction</h3>

      <label>Currency Name</label>
      <input
        type="text"
        onChange={(e) => setCurrencyName(e.target.value)}
        value={currencyName}
        className={emptyFields.includes('currencyName') ? 'error' : ''}
      />

      <label>Price</label>
      <input
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        className={emptyFields.includes('price') ? 'error' : ''}
      />

      <label>Qty</label>
      <input
        type="number"
        onChange={(e) => setQty(e.target.value)}
        value={qty}
        className={emptyFields.includes('qty') ? 'error' : ''}
      />

      <button>Add Transaction</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default TransactionForm