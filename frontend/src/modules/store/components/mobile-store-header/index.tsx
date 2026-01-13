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
        <div className="flex w-full mb-6 md:hidden gap-x-4 items-start relative z-50">
            <div className="flex-1 flex flex-col relative group">
                <button
                    onClick={toggle}
                    className={`w-full flex items-center justify-between bg-transparent border border-ui-border-base rounded-rounded px-4 py-2 text-small-regular hover:bg-ui-bg-subtle transition-colors relative z-10 bg-ui-bg-base ${isOpen ? "rounded-b-none border-b-transparent" : ""}`}
                    data-testid="mobile-filter-button"
                >
                    <span className="flex items-center gap-x-2">
                        {currentLabel}
                    </span>
                    {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </button>

                {isOpen && (
                    <div className="absolute top-full left-0 w-full px-4 pb-4 border border-t-0 border-ui-border-base rounded-b-rounded animate-in fade-in slide-in-from-top-2 bg-ui-bg-base z-0">
                        <RefinementList view={view} excludeCurrent className="pt-2 pb-0 mb-0" />
                    </div>
                )}
            </div>

            <ZoomToggle className="flex items-center gap-x-2 mt-2" />
        </div>
    )
}

export default MobileStoreHeader
