"use client"

import { useState } from "react"
import RefinementList from "@modules/store/components/refinement-list"
import ZoomToggle from "@modules/store/components/zoom-toggle"
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons"
import { filterOptions } from "../refinement-list/store-filters"
import { useSearchParams } from "next/navigation"

type MobileStoreHeaderProps = {
    view?: string
}

const MobileStoreHeader = ({ view }: MobileStoreHeaderProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const searchParams = useSearchParams()

    const toggle = () => setIsOpen((prev) => !prev)

    const categoryHandle = searchParams.get("category")
    const currentFilter = view === "new" ? "new" : categoryHandle || "all"
    const currentLabel = filterOptions.find((o) => o.value === currentFilter)?.label || "Refine"

    return (
        <div className="flex flex-col w-full mb-6 md:hidden">
            <div className="flex w-full justify-between items-center gap-x-4">
                <button
                    onClick={toggle}
                    className="flex-1 flex items-center justify-between bg-transparent border border-ui-border-base rounded-rounded px-4 py-2 text-small-regular hover:bg-ui-bg-subtle transition-colors"
                    data-testid="mobile-filter-button"
                >
                    <span className="flex items-center gap-x-2">
                        {currentLabel}
                    </span>
                    {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </button>

                <ZoomToggle className="flex items-center gap-x-2" />
            </div>

            {isOpen && (
                <div className="flex flex-col w-full mt-4 p-4 border border-ui-border-base rounded-rounded animate-in fade-in slide-in-from-top-2">
                    <RefinementList view={view} />
                </div>
            )}
        </div>
    )
}

export default MobileStoreHeader
