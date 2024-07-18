import { useQueryClient } from '@tanstack/react-query'
import { createRouter } from './app/routes'
import { AppProvider } from './app/routes/AppProvider'
import { RouterProvider } from 'react-router-dom'
import { useMemo } from 'react'

function AppRouter() {
    const queryClient = useQueryClient()
    const router = useMemo(() => createRouter(queryClient), [queryClient])
    return <RouterProvider router={router} />
}

function App() {
    return (
        <AppProvider>
            <AppRouter />
        </AppProvider>
    )
}
export default App
