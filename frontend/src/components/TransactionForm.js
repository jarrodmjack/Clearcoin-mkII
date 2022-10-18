import { useState } from "react"
import { useTransactionsContext } from "../hooks/useTransactionsContext"
import { useAuthContext } from "../hooks/useAuthContext"

const TransactionForm = ({ currencies }) => {
  const { dispatch } = useTransactionsContext()
  const { user } = useAuthContext()
  const [currencyName, setCurrencyName] = useState('')
  const [price, setPrice] = useState('')
  const [qty, setQty] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])



  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const transaction = { currencyName, price, qty }

    const response = await fetch('/api/transactions', {
      method: 'POST',
      body: JSON.stringify(transaction),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
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
      dispatch({ type: 'CREATE_TRANSACTION', payload: json })
    }
  }


  return (
    <form className="create bg-base-300 m-0 p-4 h-min rounded-2xl" onSubmit={handleSubmit}>
      <h3 className="mb-8 text-xl">Add a New Transaction</h3>

      <label>Currency Name</label>
      <select
        value={currencyName}
        className="select my-2 w-full max-w-xs"
        onChange={(e) => setCurrencyName(e.target.value)}
        >
        <option disabled selected>Select Currency</option>
        {currencies.map((currency, i) => (
          <option
            key={i}>
            {currency.name}
          </option>
        ))}
      </select>

      {/* save selected option in state */}

      {/* <input
        type="text"
        onChange={(e) => setCurrencyName(e.target.value)}
        value={currencyName}
        className={emptyFields.includes('currencyName') ? 'error' : 'bg-base-100'}
      /> */}

      <label>Price</label>
      <input
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        className={emptyFields.includes('price') ? 'error' : 'bg-base-100'}
      />

      <label>Qty</label>
      <input
        type="number"
        onChange={(e) => setQty(e.target.value)}
        value={qty}
        className={emptyFields.includes('qty') ? 'error' : 'bg-base-100'}
      />

      <button className="btn btn-accent w-full">Add Transaction</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default TransactionForm