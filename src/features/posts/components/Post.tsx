import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { PostInfo } from './PostInfo'

export function Post(): JSX.Element {
    return (
        <ErrorBoundary fallback={<div>Failed to load post</div>}>
            <Suspense fallback={<div>Loading post...</div>}>
                <PostInfo />
            </Suspense>
        </ErrorBoundary>
    )
}
