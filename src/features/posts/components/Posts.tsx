import { ErrorBoundary } from 'react-error-boundary'
import { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { useGetPostQuery } from '../api/get-posts'

function PostList(): JSX.Element {
    const posts = useGetPostQuery({ enabled: true, suspense: true }).data
    return (
        <ul>
            {posts?.map((post) => (
                <li key={post.id}>
                    <Link to={post.id.toString()}>View: {post.id}</Link>
                    <p>Title: {post.title}</p>
                    <p>Body: {post.body}</p>
                </li>
            ))}
        </ul>
    )
}

export function Posts(): JSX.Element {
    return (
        <>
            <h1>Posts</h1>
            <ErrorBoundary
                fallback={<div>Failed to load posts Error Boundary</div>}
            >
                <Suspense fallback={<div>Loading Posts (Posts.tsx)...</div>}>
                    <PostList />
                </Suspense>
            </ErrorBoundary>
        </>
    )
}
