import TrendingSection from "./TrendingSection"
import TopExchangesSection from "./TopExchangesSection"

const TripleSectionContent = () => {


  return (
    <div className="w-full flex justify-around my-20 flex-wrap gap-10">
      <TrendingSection />
      <TopExchangesSection />
    </div>
  )
}

export default TripleSectionContent