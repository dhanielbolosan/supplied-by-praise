"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

interface StoreContextProps {
    columns: number
    setColumns: (columns: number) => void
}

const StoreContext = createContext<StoreContextProps | null>(null)

export const useStore = () => {
    const context = useContext(StoreContext)
    if (!context) {
        throw new Error("useStore must be used within a StoreProvider")
    }
    return context
}

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    const [columns, setColumns] = useState(3)

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth

            if (width < 640) {
                setColumns((prev) => Math.min(Math.max(prev, 2), 2))
            } else if (width < 1024) {
                setColumns((prev) => Math.min(Math.max(prev, 2), 3))
            } else {
                setColumns((prev) => Math.max(prev, 2))
            }
        }

        handleResize()

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <StoreContext.Provider value={{ columns, setColumns }}>
            {children}
        </StoreContext.Provider>
    )
}
