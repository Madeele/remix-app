import { redirect } from 'remix';
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

export const action = async function({request, params}) {
    const form = await request.formData();
    if(form.get('_method') === 'delete'){
        const db = await createDb();
        db.data.posts = db.data.posts.filter((p) => p.id !== params.postId);
        db.write();
        return redirect("/posts");
    }
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
            <div className="page-footer">
                <form method="POST">
                    <input type="hidden" name="_method" value="delete" />
                    <button className="btn btn-delete">Delete</button>
                </form>
            </div>
        </div>
    )
}

export default Post