import TripleSectionContent from '../components/TripleSectionContent'
import Table from '../components/CurrenciesTable'
import GlobalCurrencyData from '../components/GlobalCurrencyData'



const Home = () => {
    return (
        <div className="container mx-auto">
            <GlobalCurrencyData />
            <TripleSectionContent />
            <Table />
            <h4 className='py-4 text-center'>Why did you scroll all the way down? You can just sort the table 😉</h4>
        </div>
    )
}

export default Home