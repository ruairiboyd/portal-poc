import { api } from '@/lib/ApiClient'
import { queryConfig } from '@/lib/ReactQuery'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { User } from '@/types/user/user'

export async function getUser(userName: string): Promise<User> {
    const response = await api.get(`/user/getuser/${userName}`)
    // await new Promise((resolve) => setTimeout(resolve, 2000))
    return response.data
    // return {
    //     userId: 1,
    //     userName: 'rboyv',
    //     roles: [
    //         {
    //             roleId: 1,
    //             role: 'Admin',
    //             roleDescription: 'Admin role',
    //         },
    //         {
    //             roleId: 2,
    //             role: 'User',
    //             roleDescription: 'User role',
    //         },
    //     ],
    // }
}

export function getUserQueryOptions(userName: string) {
    return {
        queryKey: ['user', userName],
        queryFn: async () => getUser(userName),
    }
}

export function useGetUserQuery(
    userName: string,
    options: { enabled: boolean; suspense: boolean }
): UseQueryResult<User, Error> {
    return useQuery<User, Error>({
        ...getUserQueryOptions(userName),
        ...queryConfig,
        ...options,
    })
}
