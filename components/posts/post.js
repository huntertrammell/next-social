import PostMeta from './post-meta'

import css from './post.module.css'

function Post(props) {
	const { content, meta } = props.post

	return (
		<article className={css.post}>
			<div className={css.content}>
				<p>{content}</p>
			</div>
			<div>
				<PostMeta meta={meta} />
			</div>
		</article>
	)
}

export default Post
