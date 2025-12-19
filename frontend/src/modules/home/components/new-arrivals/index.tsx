import { listProducts } from "@lib/data/products"
import { Heading } from "@medusajs/ui"
import ProductGridItem from "@modules/products/components/product-grid-item"
import { getRegion } from "@lib/data/regions"

export default async function NewArrivals({ countryCode }: { countryCode: string }) {
  const { response: { products } } = await listProducts({
    countryCode,
    queryParams: {
      limit: 6,
      order: "-created_at",
    },
  })

  const region = await getRegion(countryCode)

  if (!products || !region) {
    return null
  }

  return (
    <div className="content-container py-12 small:py-24">
      <div className="flex flex-col items-center mb-12">
        <Heading level="h2" className="text-2xl small:text-3xl text-center mb-4">
          New Arrivals
        </Heading>
      </div>
      
      <ul className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <li key={product.id}>
            <ProductGridItem product={product} region={region} />
          </li>
        ))}
      </ul>
    </div>
  )
}
