import { listProductTypes } from "@lib/data/product-types"
import { listTags } from "@lib/data/tags"
import { getCategoryByHandle } from "@lib/data/categories"

export const resolveProductFilters = async (searchParams: Promise<{ [key: string]: string | string[] | undefined }>) => {
  const params = await searchParams
  const typeValue = params?.type as string | undefined
  const tagValue = params?.tag as string | undefined
  const categoryHandle = params?.category as string | undefined

  let typeId: string | undefined
  let tagId: string | undefined
  let categoryId: string | undefined

  if (typeValue) {
    const { product_types } = await listProductTypes({ limit: "100" })
    const matchedType = product_types.find(
      (t) => t.value.toLowerCase() === typeValue.toLowerCase()
    )
    if (matchedType) {
      typeId = matchedType.id
    }
  }

  if (tagValue) {
    const { tags } = await listTags({ limit: "100" })
    const matchedTag = tags.find(
      (t) => t.value.toLowerCase() === tagValue.toLowerCase()
    )
    if (matchedTag) {
      tagId = matchedTag.id
    }
  }

  if (categoryHandle) {
    const category = await getCategoryByHandle([categoryHandle])
    if (category) {
      categoryId = category.id
    }
  }

  return {
    typeId,
    tagId,
    categoryId,
  }
}
