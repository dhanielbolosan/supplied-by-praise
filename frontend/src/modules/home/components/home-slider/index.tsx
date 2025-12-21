"use client"

import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons"

type SliderProduct = HttpTypes.StoreProduct & {
  collectionTitle: string
}

export default function HomeSlider({ products }: { products: SliderProduct[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [currentIndex, setCurrentIndex] = useState(0)
  const total = products.length

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCurrentIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, onSelect])

  const next = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const prev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  if (!products || products.length === 0) {
    return null
  }

  return (
    <div className="w-full min-h-[calc(100vh-64px)] flex flex-col items-center justify-start bg-ui-bg-base overflow-hidden">
      <div className="w-[75%] h-[85vh] flex flex-col bg-ui-bg-base">
        {/* Full width image container*/}
        <div className="relative w-full flex-1 overflow-hidden" ref={emblaRef}>
          <div className="flex h-full touch-pan-y">
            {products.map((product, index) => (
              <div key={product.id} className="relative w-full h-full flex-[0_0_100%] min-w-0">
                {product.thumbnail ? (
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    className="object-contain pointer-events-none select-none"
                    fill
                    priority={index === 0}
                    sizes="75vw"
                  />
                ) : (
                  <div className="w-full h-full bg-ui-bg-subtle flex items-center justify-center">
                    No Image
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full p-6 grid grid-cols-2 h-48">

          <div className="flex flex-col justify-start items-start gap-1">
            <span className="text-sm uppercase tracking-widest text-ui-fg-muted font-mono italic">
              {products[currentIndex].collectionTitle}
            </span>
            <h2 className="text-xl font-bold uppercase">
              <Link href={`/products/${products[currentIndex].handle}`}>
                {products[currentIndex].title}
              </Link>
            </h2>
            <p className="text-sm text-ui-fg-subtle max-w-md mt-2 font-mono break-words">
              {products[currentIndex].description ? products[currentIndex].description : "N/A"}
            </p>
          </div>

          <div className="flex flex-col justify-start items-end gap-2">
            <div className="flex flex-col items-center gap-1 w-fit">
              <div className="flex gap-6">
                <button
                  onClick={prev}
                  className="p-2 hover:opacity-50 transition-opacity"
                  aria-label="Previous product"
                >
                  <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <button
                  onClick={next}
                  className="p-2 hover:opacity-50 transition-opacity"
                  aria-label="Next product"
                >
                  <ArrowRightIcon className="w-6 h-6" />
                </button>
              </div>
              <span className="font-mono text-sm text-ui-fg-muted">
                {currentIndex + 1} / {total}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
