import connectToDatabase from '../../../lib/db'
import { getSession } from 'next-auth/client'
import { ObjectId } from 'mongodb'

async function handler(req, res) {
	if (req.method !== 'PATCH') {
		res.status(401).json({ message: 'Nothing to see here' })
		return
	}

	const session = await getSession({ req: req })

	if (!session) {
		res.json(401).json({ message: 'Not Authenticated!' })
		return
	}

	const { postId, username, type } = req.body

	if (!username || username.trim() === '' || typeof username !== 'string') {
		res.status(422).json({ message: `Username of ${username} is invalid` })
		return
	}

	if (!postId || postId.trim() === '' || typeof postId !== 'string') {
		res.status(422).json({ message: 'A post ID is required' })
		return
	}

	const client = await connectToDatabase()

	const db = client.db()

	const post_id = await ObjectId(postId)

	if (type === 'like') {
		const result = await db
			.collection('posts')
			.updateOne(
				{ _id: post_id },
				{ $push: { 'meta.likes.likedBy': username } }
			)
		res.status(201).json({ message: 'Like Added!' })
	} else if (type === 'unlike') {
		const result = await db
			.collection('posts')
			.updateOne(
				{ _id: post_id },
				{ $pull: { 'meta.likes.likedBy': username } }
			)
		res.status(201).json({ message: 'Like Removed!' })
	} else {
		res.status(422).json({ message: 'Invalid Parameters using ' + type })
	}

	// intentionally leaving client open,
	// likes will be the easiest request to spam,
	// don't want to open a new session for each like
	return
}

export default handler
