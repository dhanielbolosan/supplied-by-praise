import { Text } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "../product-preview/price"

export default function ProductGridItem({
  product,
  region,
}: {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  const outOfStock = product.variants?.every((v) => v.inventory_quantity === 0)

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block"
    >
      <div className="relative aspect-square overflow-hidden mb-4 transition-transform duration-300 group-hover:scale-[1.02]">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="square"
          isFullImage
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white w-[6rem] h-[2rem] shadow-md flex items-center justify-center rounded-soft text-xsmall-regular small:text-small-regular">
            {outOfStock ? (
              <Text className="text-black font-medium uppercase tracking-widest">
                Sold Out
              </Text>
            ) : (
              cheapestPrice && (
                <div className="text-black font-semibold">
                  <PreviewPrice price={cheapestPrice} />
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <Text className="text-ui-fg-base font-normal text-center transition-transform duration-300 group-hover:scale-[1.02] text-small-regular small:text-base-regular" data-testid="product-title">
        {product.title}
      </Text>
    </LocalizedClientLink>
  )
}
