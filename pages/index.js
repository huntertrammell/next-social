import { Fragment } from 'react'
import { useSession } from 'next-auth/client'
import CreatePost from '../components/posts/create-post'
import Feed from '../components/ui/feed'

function Home(props) {
	const [session, loading] = useSession()

	return (
		<Fragment>
			{session && <CreatePost />}
			<section>
				<h1 className="center">Latest Posts</h1>
			</section>
			<Feed posts={props.posts} />
		</Fragment>
	)
}

export async function getStaticProps() {
	const response = await fetch(`${process.env.baseurl}/api/post`)
	const data = await response.json()
	return {
		props: {
			posts: data,
		},
	}
}

export default Home
