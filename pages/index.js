import { Fragment } from 'react'

import CreatePost from '../components/posts/create-post'
import Feed from '../components/ui/feed'

export default function Home() {
	return (
		<Fragment>
			<CreatePost />
			<Feed />
		</Fragment>
	)
}
