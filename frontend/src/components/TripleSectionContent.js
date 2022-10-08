import TrendingSection from "./TrendingSection"
import TopExchangesSection from "./TopExchangesSection"

const TripleSectionContent = () => {


  return (
    <div className="w-full flex justify-between my-20">
      <TrendingSection />
      <TopExchangesSection />
      {/* <TripleSection />
      <TripleSection /> */}
    </div>
  )
}

export default TripleSectionContent