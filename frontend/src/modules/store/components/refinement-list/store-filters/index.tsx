"use client"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

type StoreFiltersProps = {
    view?: string;
}

export const filterOptions = [
    {
        value: "new",
        label: "NEW",
    },
    {
        value: "shirts",
        label: "SHIRTS",
    },
    {
        value: "sweatshirts",
        label: "SWEATSHIRTS",
    },
    {
        value: "longsleeve",
        label: "LONGSLEEVE",
    },
    {
        value: "hoodies",
        label: "HOODIES",
    },
    {
        value: "pants",
        label: "PANTS",
    },
    {
        value: "shorts",
        label: "SHORTS",
    },
    {
        value: "bags",
        label: "BAGS",
    },
    {
        value: "shoes",
        label: "SHOES",
    },
    {
        value: "accessories",
        label: "ACCESSORIES",
    },
    {
        value: "all",
        label: "ALL",
    },
]

const StoreFilters = ({ view }: StoreFiltersProps) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const categoryHandle = searchParams.get("category")
    const currentFilter = view === "new" ? "new" : categoryHandle || "all"

    const handleChange = (value: string) => {
        const params = new URLSearchParams(searchParams)

        if (value === "new") {
            params.delete("category")
            params.set("view", "new")
        } else if (value === "all") {
            params.delete("category")
            params.delete("view")
        } else {
            params.delete("view")
            params.set("category", value)
        }

        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <FilterRadioGroup
            items={filterOptions}
            value={currentFilter}
            handleChange={handleChange}
        />
    )
}

export default StoreFilters
