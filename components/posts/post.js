import PostMeta from './post-meta'

import css from './post.module.css'

function Post(props) {
	const { content, meta, _id } = props.post

	return (
		<article className={css.post}>
			<div className={css.content}>
				<p>{content}</p>
			</div>
			<div>
				<PostMeta meta={meta} _id={_id} />
			</div>
		</article>
	)
}

export default Post
