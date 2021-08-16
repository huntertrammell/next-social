import { Fragment } from 'react'
import { useSession } from 'next-auth/client'
import CreatePost from '../components/posts/create-post'
import Feed from '../components/ui/feed'

export default function Home() {
	const [session, loading] = useSession()

	return (
		<Fragment>
			{session && <CreatePost />}
			<section>
				<h1 className="center">Latest Posts</h1>
			</section>
			<Feed />
		</Fragment>
	)
}
