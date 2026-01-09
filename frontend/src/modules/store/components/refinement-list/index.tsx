"use client"

import StoreFilters from "./store-filters"

type RefinementListProps = {
  sortBy?: string
  search?: boolean
  'data-testid'?: string
  view?: string
}

const RefinementList = ({ view }: RefinementListProps) => {

  return (
    <div className="flex flex-col gap-12 py-4 mb-8">
      <StoreFilters view={view} />
    </div>
  )
}

export default RefinementList
