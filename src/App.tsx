import './App.css'
import './yearTransition.css'
import MainTops from './components/MainTops'
import { availableYears, disabledYears, isYearNavigable, yearLists } from './data/lists'
import { useSelectedYear } from './hooks/useSelectedYear'
import { prefetchListImages } from './utils/listImages'

/** Warm up a year's above-the-fold images before it's picked */
function previewYear(year: string) {
  if (isYearNavigable(year)) prefetchListImages(yearLists[year].items)
}

function App() {
  const [year, selectYear] = useSelectedYear()
  const { config, items } = yearLists[year]

  return (
    <>
      {/* key resets expanded cards and refs per year */}
      <MainTops
        key={year}
        config={config}
        items={items}
        years={availableYears}
        disabledYears={disabledYears}
        activeYear={year}
        onSelectYear={selectYear}
        onPreviewYear={previewYear}
      />
    </>
  )
}

export default App
