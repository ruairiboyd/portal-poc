import { useParams } from 'react-router-dom'
import { useGetPostByIdQuery } from '../api/get-posts'

export function PostInfo(): JSX.Element {
    const { postId } = useParams<{ postId: string }>()

    const postQuery = useGetPostByIdQuery(Number(postId), {
        enabled: !!postId,
        suspense: true,
    })

    if (!postQuery.data) return <div>Post not found</div>

    const post = postQuery.data

    return (
        <>
            <h1>
                {post.id} - {post.title}
            </h1>
            <p>{post.body}</p>
        </>
    )
}
