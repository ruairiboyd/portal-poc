import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { queryClient } from '@/lib/ReactQuery'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

type AppProviderProps = {
    children: React.ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
    return (
        <React.Suspense fallback={<div className="">Loading...</div>}>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools />
                {children}
            </QueryClientProvider>
        </React.Suspense>
    )
}
