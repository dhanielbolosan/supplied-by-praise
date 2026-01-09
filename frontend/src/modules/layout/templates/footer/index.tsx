import { listProductTypes } from "@lib/data/product-types"
import { getCollectionByHandle } from "@lib/data/collections"
import { listTags } from "@lib/data/tags"
import { clx } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const collectionHandles = ["made", "found", "custom"]
  const collections = (
    await Promise.all(
      collectionHandles.map((handle) => getCollectionByHandle(handle))
    )
  ).filter(Boolean)
  const { product_types } = await listProductTypes()
  const { tags } = await listTags()

  return (
    <footer className="border-t border-ui-border-base w-full h-[200px] overflow-hidden bg-white">
      <div className="content-container flex flex-col w-full h-full">
        <div className="flex flex-row items-start justify-between h-full py-12">
          <div className="flex flex-col gap-2">
            <LocalizedClientLink
              href="/"
              className="custom-link txt-compact-xlarge-plus uppercase"
            >
              Supplied By Praise
            </LocalizedClientLink>
            <div className="flex flex-col gap-1 text-ui-fg-subtle txt-small">
              <span className="custom-link">Notify Me</span>
              <span className="custom-link">Contact Us</span>
            </div>
          </div>
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base uppercase">
                  Collections
                </span>
                <ul className="grid grid-cols-1 gap-2 text-ui-fg-subtle txt-small">
                  {collections.map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="custom-link"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {product_types && product_types.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base uppercase">
                  Products
                </span>
                <ul
                  className={clx(
                    "grid gap-2 text-ui-fg-subtle txt-small",
                    product_types.length > 6 ? "grid-cols-2 gap-x-8" : "grid-cols-1"
                  )}
                >
                  {product_types.map((t) => (
                    <li key={t.id}>
                      <LocalizedClientLink
                        className="custom-link"
                        href={`/store?type=${t.value}`}
                      >
                        {t.value}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {tags && tags.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base uppercase">
                  Tags
                </span>
                <ul className="grid grid-cols-1 gap-2 text-ui-fg-subtle txt-small">
                  {tags.map((t) => (
                    <li key={t.id}>
                      <LocalizedClientLink
                        className="custom-link"
                        href={`/store?tag=${t.value}`}
                      >
                        {t.value}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}

