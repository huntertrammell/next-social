import Post from '../posts/post'

function Feed(props) {
	const { posts } = props
	return (
		<section>
			{posts.map((post) => (
				<Post post={post} key={post._id} />
			))}
		</section>
	)
}

export default Feed
