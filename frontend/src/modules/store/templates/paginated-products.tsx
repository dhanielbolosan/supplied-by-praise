import { listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductGrid from "@modules/store/components/product-grid"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const PRODUCT_LIMIT = 200

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
  type_id?: string[]
  tag_id?: string[]
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
  typeId,
  tagId,
  view,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
  typeId?: string
  tagId?: string
  view?: string
}) {
  const queryParams: PaginatedProductsParams = {
    limit: view === "new" ? 10 : PRODUCT_LIMIT,
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  if (typeId) {
    queryParams["type_id"] = [typeId]
  }

  if (tagId) {
    queryParams["tag_id"] = [tagId]
  }

  if (sortBy === "created_at" || view === "new") {
    queryParams["order"] = "created_at"
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  let {
    response: { products, count },
  } = await listProductsWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  })

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  return (
    <>
      <div className="h-full overflow-y-auto w-full custom-scrollbar pr-2">
        <ProductGrid products={products} region={region} />
      </div>
    </>
  )
}
