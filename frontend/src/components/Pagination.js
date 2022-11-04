
const Pagination = ({currenciesPerPage, totalCurrencies, paginate}) => {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalCurrencies / currenciesPerPage); i++){
        pageNumbers.push(i)
    }

    return (
        <div className="btn-group my-10 w-full flex justify-center">
            {pageNumbers.map((number, i) => (
                <button onClick={() => paginate(number)} key={i} className="btn">{number}</button>
            ))}
        </div>
    )
}

export default Pagination