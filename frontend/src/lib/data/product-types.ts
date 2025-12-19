"use server"

import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

export const listProductTypes = async (
  queryParams: Record<string, string> = {}
): Promise<{ product_types: HttpTypes.StoreProductType[]; count: number }> => {
  const next = {
    ...(await getCacheOptions("product-types")),
    revalidate: 600,
  }

  queryParams.limit = queryParams.limit || "100"
  queryParams.offset = queryParams.offset || "0"

  return sdk.client
    .fetch<{ product_types: HttpTypes.StoreProductType[]; count: number }>(
      "/store/product-types",
      {
        query: queryParams,
        next,
        cache: "force-cache",
      }
    )
    .then(({ product_types, count }) => ({ product_types, count }))
}
