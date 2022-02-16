import {useLoaderData, Link} from 'remix';
import createDb from '~/db/db.server';

export const loader = async function ({params}) {
    const db = await createDb();
    const post = db.data.posts.find((p) => p.id === params.postId);

    if (!post) {
        throw new Error("Post not found");
    }
    return {
        post,
    };
}

function Post() {

    const {post} = useLoaderData();

    return (
        <div>
            <div className="page-header">
                <h1>{post.title}</h1>
                <Link to='/posts' className='btn btn-reverse'>
                    Back
                </Link>
            </div>
            <div className="page-content">
                {post.body}
            </div>
        </div>
    )
}

export default Post