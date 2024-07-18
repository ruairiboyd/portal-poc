import { Suspense, useState } from 'react'
import { UserInfo } from './UserInfo'
import { ErrorBoundary } from 'react-error-boundary'
import UserErrorPage from './UserErrorPage'

export function UserSearch(): JSX.Element {
    const [userName, setUserName] = useState('')
    const [submittedUserName, setSubmittedUserName] = useState<string | null>(
        null
    )

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (userName.trim()) {
            setSubmittedUserName(userName.trim())
        }
    }

    return (
        <div>
            <h1>Get User</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    User Name:
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            <ErrorBoundary FallbackComponent={UserErrorPage}>
                <Suspense fallback={<div>Loading...</div>}>
                    {submittedUserName && (
                        <UserInfo submittedUserName={submittedUserName} />
                    )}
                </Suspense>
            </ErrorBoundary>
        </div>
    )
}
