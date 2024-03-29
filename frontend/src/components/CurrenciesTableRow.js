const TableRow = ({ currency }) => {
  return (
    <tr className="hover cursor-pointer border-t-2 border-slate-700">

      <td><img className="h-10 w-10" src={currency.image} alt="" /></td>
      <td className="text-white">{currency.name}</td>
      <td>${currency.current_price <= 1 ? currency.current_price.toFixed(7) : currency.current_price.toLocaleString()}</td>
      <td>${currency.market_cap.toLocaleString()}</td>
      <td>{currency.circulating_supply.toLocaleString()}</td>
      <td>${currency.total_volume.toLocaleString()}</td>
      <td className="whitespace-pre-wrap" style={{ color: currency['price_change_percentage_24h'] > 0 ? 'lime' : 'red' }}>{currency.price_change_percentage_24h >= 0 ? '🚀' : '😭'} {Math.abs(currency.price_change_percentage_24h.toFixed(2))}%</td>
    </tr>
  )
}

export default TableRow