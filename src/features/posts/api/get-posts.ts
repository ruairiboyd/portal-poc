import { api } from '@/lib/ApiClient'
import { queryConfig } from '@/lib/ReactQuery'
import { Post } from '@/types/post/post'
import {
    useQuery,
    UseQueryOptions,
    UseQueryResult,
} from '@tanstack/react-query'

export async function getPosts(): Promise<Post[]> {
    try {
        const response = await api.get('/posts')
        await new Promise((resolve) => setTimeout(resolve, 2000))
        console.log('response', response)
        return response.data
    } catch (error) {
        throw new Error('Failed to fetch posts')
    }
}

export async function getPostById(postId: number): Promise<Post> {
    try {
        const response = await api.get(`/posts/${postId}`)
        await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate delay
        console.log('response', response)
        return response.data
    } catch (error) {
        throw new Error(`Failed to fetch post with id ${postId}`)
    }
}

export function getPostsQueryOptions(): UseQueryOptions<Post[], Error> {
    return {
        queryKey: ['posts'],
        queryFn: async () => getPosts(),
    }
}

export function getPostByIdQueryOptions(
    postId: number
): UseQueryOptions<Post, Error> {
    return {
        queryKey: ['post', postId],
        queryFn: async () => getPostById(postId),
    }
}

export function useGetPostByIdQuery(
    postId: number,
    options: {
        enabled: boolean
        suspense: boolean
    }
): UseQueryResult<Post, Error> {
    return useQuery<Post, Error>({
        ...getPostByIdQueryOptions(postId),
        ...queryConfig,
        ...options,
    })
}

export function useGetPostQuery(options: {
    enabled: boolean
    suspense: boolean
}): UseQueryResult<Post[], Error> {
    return useQuery<Post[], Error>({
        ...getPostsQueryOptions(),
        ...queryConfig,
        ...options,
    })
}
