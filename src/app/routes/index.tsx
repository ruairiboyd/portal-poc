import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from './ErrorPage'
import { AppLayout } from '../AppLayout'
import { HomeRoute } from './HomeRoute'
import { UserRoute } from './UserRoute'
import { QueryClient } from '@tanstack/react-query'
import { PostsRoute } from './Posts/PostsRoute'
import { PostRoute } from './Posts/PostRoute'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createRouter = (queryClient: QueryClient) =>
    createBrowserRouter([
        {
            path: '/',
            element: <AppLayout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: '/',
                    element: <HomeRoute />,
                },
                {
                    path: '/user',
                    element: <UserRoute />,
                },
                {
                    path: '/posts',
                    element: <PostsRoute />,
                },
                {
                    path: '/posts/:postId',
                    element: <PostRoute />,
                },
            ],
        },
    ])
