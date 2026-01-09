"use client"

import { useStore } from "@modules/store/context/store-context"
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons"

const ZoomToggle = () => {
    const { columns, setColumns } = useStore()

    const handleZoomIn = () => {
        if (columns > 2) setColumns(columns - 1)
    }

    const handleZoomOut = () => {
        if (columns < 5) setColumns(columns + 1)
    }

    return (
        <div className="flex items-center gap-x-2 mt-4 pl-6 pr-4">
            <button
                onClick={handleZoomOut}
                disabled={columns >= 5}
                className="custom-link disabled:!text-ui-fg-muted p-1"
                aria-label="Zoom out"
            >
                <MinusIcon width={20} height={20} />
            </button>
            <button
                onClick={handleZoomIn}
                disabled={columns <= 2}
                className="custom-link disabled:!text-ui-fg-muted p-1"
                aria-label="Zoom in"
            >
                <PlusIcon width={20} height={20} />
            </button>
        </div>
    )
}

export default ZoomToggle
