"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()
    const timer = setTimeout(close, 5000)
    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }
    open()
  }

  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  return (
    <div
      className="h-full z-50"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        <PopoverButton className="h-full uppercase tracking-widest text-sm focus:outline-none">
          <LocalizedClientLink
            className="hover:text-ui-fg-muted transition-colors"
            href="/cart"
            data-testid="nav-cart-link"
          >
            {`BAG (${totalItems})`}
          </LocalizedClientLink>
        </PopoverButton>
        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-2"
        >
          <PopoverPanel
            static
            className="hidden small:block absolute top-[calc(100%)] right-0 bg-white w-[420px] text-black shadow-none rounded-none border border-ui-border-base"
            data-testid="nav-cart-dropdown"
          >
            <div className="p-4 flex items-center justify-between">
              <h3 className="text-lg uppercase tracking-tight">Shopping Bag</h3>
            </div>

            {cartState && cartState.items?.length ? (
              <>
                <div className="overflow-y-scroll max-h-[402px] no-scrollbar">
                  {cartState.items
                    .sort((a, b) => {
                      return (a.created_at ?? "") > (b.created_at ?? "")
                        ? -1
                        : 1
                    })
                    .map((item) => (
                      <div
                        className="grid grid-cols-[80px_1fr] last:border-b-0"
                        key={item.id}
                        data-testid="cart-item"
                      >
                        <LocalizedClientLink
                          href={`/products/${item.product_handle}`}
                          className="w-full h-full"
                        >
                          <div className="aspect-square relative overflow-hidden">
                            <Thumbnail
                              thumbnail={item.thumbnail}
                              images={item.variant?.product?.images}
                              size="square"
                              className="rounded-none object-cover"
                            />
                          </div>
                        </LocalizedClientLink>

                        <div className="flex flex-col justify-between p-3">
                          <div className="flex flex-col flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex flex-col mr-4">
                                <h3 className="text-sm uppercase tracking-tight leading-none mb-1">
                                  <LocalizedClientLink
                                    href={`/products/${item.product_handle}`}
                                    className="custom-link"
                                  >
                                    {item.title}
                                  </LocalizedClientLink>
                                </h3>
                                {/* OPTIONS: Smaller, monospace look */}
                                <div className="text-xs uppercase text-gray-500 font-mono -mb-1">
                                  <LineItemOptions
                                    variant={item.variant}
                                    data-testid="cart-item-variant"
                                    data-value={item.variant}
                                  />
                                </div>
                                <span className="text-xs font-mono uppercase">
                                  QTY: {item.quantity}
                                </span>
                              </div>

                              <div className="font-mono text-sm">
                                <LineItemPrice
                                  item={item}
                                  style="tight"
                                  currencyCode={cartState.currency_code}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end">
                            <DeleteButton
                              id={item.id}
                              className="text-[0.75rem] uppercase hover:text-ui-fg-error tracking-widest"
                            >
                              REMOVE
                            </DeleteButton>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="bg-white">
                  <div className="mx-4 border-t border-ui-border-base pt-4">
                    <div className="flex items-center justify-between text-sm font-mono uppercase">
                      <span>Subtotal</span>
                      <span
                        className=""
                      >
                        {convertToLocale({
                          amount: subtotal,
                          currency_code: cartState.currency_code,
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <LocalizedClientLink href="/cart" passHref>
                      <Button
                        variant="primary"
                        className="w-full h-[2rem] text-[1rem]"
                        data-testid="go-to-cart-button"
                      >
                        Buy Now
                      </Button>
                    </LocalizedClientLink>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <div className="flex py-12 flex-col gap-y-4 items-center justify-center">
                  <span className="text-xl uppercase tracking-tighter">
                    Your bag is empty
                  </span>
                  <div>
                    <LocalizedClientLink href="/store">
                      <Button onClick={close} variant="primary" className="w-[7rem] h-[2rem] text-[1rem]">
                        Shop All
                      </Button>
                    </LocalizedClientLink>
                  </div>
                </div>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
