import { useGetUserQuery } from '../api/get-users'

export function UserInfo({
    submittedUserName,
}: {
    submittedUserName: string | null
}) {
    const { data, error } = useGetUserQuery(submittedUserName as string, {
        enabled: !!submittedUserName,
        suspense: true,
    })

    if (error) {
        return <div>Failed to fetch data: {error.message}</div>
    }

    if (!data) {
        return <p>No users found</p>
    }

    return (
        <div key={data.userId}>
            <p>Name: {data.userName}</p>
            <ul>
                {data.roles.map((role) => (
                    <li key={role.roleId}>
                        <p>Role: {role.role}</p>
                        <p>Description: {role.roleDescription}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
