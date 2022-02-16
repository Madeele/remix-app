import {useLoaderData, Link} from 'remix'
import createDb from '~/db/db.server.js'

export const loader = async () => {
    const db = await createDb();
    return db.data.posts;
}

function PostItems() {
    const posts = useLoaderData();

    return(
        <div>
            <div className="page-header">
                <h1>Posts</h1>
                <Link to='/posts/new' className='btn'>
                    New Post
                </Link>
            </div>
            <ul className="posts-list">
            {posts.map((post) =>(
                <li key={post.id}>
                    <Link to={post.id}>
                        <h3>{post.title}</h3>
                    </Link>
                </li>
            ))}
            </ul>
        </div>
    )
}

export default PostItems