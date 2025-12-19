import { getCollectionByHandle } from "@lib/data/collections"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { Metadata } from "next"
import Hero from "@modules/home/components/hero"
import HomeSlider from "@modules/home/components/home-slider" 
import NewArrivals from "@modules/home/components/new-arrivals"

export const metadata: Metadata = {
  title: "Supplied By Praise",
  description: "The Supplied By Praise storefront",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const collectionOrder = ["made", "found", "custom"]
  
  // Fetch ID and Title for in the collection order
  const collections = (
    await Promise.all(
      collectionOrder.map((handle) => getCollectionByHandle(handle))
    )
  ).filter(Boolean)

  if (!collections || !region || collections.length === 0) {
    return null
  }

  // Fetch products for each collection
  const products = await Promise.all(
    collections.map(async (collection) => {
      const {
        response: { products },
      } = await listProducts({
        countryCode,
        queryParams: { collection_id: [collection.id], limit: 4 },
      })
      
      return products.map((p) => ({
        ...p,
        collectionTitle: collection.title,
      }))
    })
  )

  const flattenedProducts = products.flat()

  return (
    <>
      <Hero />
      <HomeSlider products={flattenedProducts} />
      <NewArrivals countryCode={countryCode} />
    </>
  )
}
