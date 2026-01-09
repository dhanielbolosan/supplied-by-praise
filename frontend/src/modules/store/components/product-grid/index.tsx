"use client"

import { useStore } from "@modules/store/context/store-context"
import ProductGridItem from "@modules/products/components/product-grid-item"
import { HttpTypes } from "@medusajs/types"
import { motion, AnimatePresence } from "framer-motion"

const ProductGrid = ({
    products,
    region,
}: {
    products: HttpTypes.StoreProduct[]
    region: HttpTypes.StoreRegion
}) => {
    const { columns } = useStore()

    const gridClass = {
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        5: "grid-cols-5",
    }[columns] || "grid-cols-3"

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    }

    const item = {
        hidden: { opacity: 0, scale: 0.5 },
        show: { opacity: 1, scale: 1 }
    }

    const listId = products.map((p) => p.id).join("")

    return (
        <motion.ul
            className={`grid ${gridClass} gap-x-6 gap-y-8 w-full overflow-hidden`}
            data-testid="products-list"
            variants={container}
            initial="hidden"
            animate="show"
        >
            <AnimatePresence mode="wait">
                {products.map((p) => {
                    return (
                        <motion.li
                            key={`${p.id}-${listId}`}
                            variants={item}
                            layout
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        >
                            <ProductGridItem product={p} region={region} />
                        </motion.li>
                    )
                })}
            </AnimatePresence>
        </motion.ul>
    )
}

export default ProductGrid
