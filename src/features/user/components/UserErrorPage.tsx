export default function UserErrorPage({
    error,
}: {
    error: Error
    resetErrorBoundary?: () => void
}): JSX.Element {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
        </div>
    )
}
