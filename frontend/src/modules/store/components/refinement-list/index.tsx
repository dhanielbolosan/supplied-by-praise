"use client"

import StoreFilters from "./store-filters"
import { clx } from "@medusajs/ui"

type RefinementListProps = {
  sortBy?: string
  search?: boolean
  'data-testid'?: string
  view?: string
  className?: string
  excludeCurrent?: boolean
}

const RefinementList = ({ view, className, excludeCurrent }: RefinementListProps) => {

  return (
    <div className={clx("flex flex-col gap-12 py-4 mb-8", className)}>
      <StoreFilters view={view} excludeCurrent={excludeCurrent} />
    </div>
  )
}

export default RefinementList
