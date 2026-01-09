import { Metadata } from "next"
import { resolveProductFilters } from "@lib/util/get-product-filters"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Store",
  description: "Explore all of our products.",
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
    view?: string
    type?: string
    category?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { sortBy, page, view} = searchParams
  const { typeId, tagId, categoryId } = await resolveProductFilters(props.searchParams)

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
      typeId={typeId}
      tagId={tagId}
      view={view as string}
      categoryId={categoryId}
    />
  )
}
