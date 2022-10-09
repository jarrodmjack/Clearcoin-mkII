import TripleSectionContent from '../components/TripleSectionContent'
import Table from '../components/Table'
import GlobalCurrencyData from '../components/GlobalCurrencyData'



const Home = () => {
 return(
  <div className="container mx-auto">
            <GlobalCurrencyData />
            <TripleSectionContent />
            <Table />
        </div>
 )
}

export default Home