import React from 'react'

const ExchangesTableRow = ({ exchange }) => {
    return (
        <tr>
            <td>
                <img className='w-10 h-10' src={exchange.image} />
            </td>
            <td>
                <a className='text-white' href={exchange.url} target="_blank">{exchange.name}</a>
            </td>
            <td>{!exchange.country ? "N/A" : exchange.country}</td>
            <td className=''>
                <progress  className="progress progress-accent w-32 mr-2" value={exchange.trust_score} max={10}></progress>
                {exchange.trust_score}
            </td>
            <td>{exchange.trade_volume_24h_btc.toFixed(3)}</td>
        </tr>
    )
}

export default ExchangesTableRow