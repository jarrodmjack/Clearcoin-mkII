import ExchangesTableRow from './ExchangesTableRow'


const ExchangesTable = ({ exchanges }) => {
    console.log(exchanges)
    return (
        <div className="overflow-x-auto mb-10">
            <table
                className="table table-zebra w-full"
            >
                <thead>
                    <tr>
                        <th>Symb</th>
                        <th>Exchange</th>
                        <th>Trust Score</th>
                        <th>24h Volume (BTC)</th>
                        <th>24h Volume (BTC)</th>
                    </tr>
                </thead>
                <tbody>
                    {exchanges.map((exchange, i) => (
                        <ExchangesTableRow key={exchange.id} exchange={exchange} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ExchangesTable