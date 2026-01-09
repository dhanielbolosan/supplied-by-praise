import { Suspense } from "react"

import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"
import { StoreProvider } from "@modules/store/context/store-context"
import ZoomToggle from "@modules/store/components/zoom-toggle"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  view,
  categoryId,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  typeId?: string
  tagId?: string
  view?: string
  categoryId?: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div
      className="flex h-[calc(100vh-64px-200px)] w-full max-w-[1440px] mx-auto px-8 py-12 md:px-16 md:py-20 gap-x-12"
      data-testid="category-container"
    >
      <StoreProvider>
        <div className="w-[250px] flex flex-col shrink-0 pt-4 pb-2">
          <div className="flex-1 overflow-y-auto no-scrollbar pl-6 pr-4">
            <RefinementList view={view} />
          </div>
          <ZoomToggle />
        </div>
        <div className="flex-1 h-full overflow-hidden ">
          <Suspense fallback={null}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              countryCode={countryCode}
              view={view}
              categoryId={categoryId}
            />
          </Suspense>
        </div>
      </StoreProvider>
    </div>
  )
}

export default StoreTemplate
