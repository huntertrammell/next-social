import connectToDatabase from '../../../lib/db'

async function handler(req, res) {
	if (req.method !== 'POST') {
		res.status(401).json({ message: 'Nothing to see here' })
		return
	}
	const data = req.body
	const { username, content } = data

	if (!username || username.trim() === '' || typeof username !== 'string') {
		res.status(422).json({ message: `Username of ${username} is invalid` })
		return
	}

	if (!content || content.trim() === '' || typeof content !== 'string') {
		res.status(422).json({ message: 'A post is required' })
		return
	}

	const client = await connectToDatabase()

	const db = client.db()

	const result = await db.collection('posts').insertOne({
		content: content,
		meta: {
			username: username,
			likes: {
				totalLikes: 0,
				likedBy: [],
			},
		},
	})

	res.status(201).json({ message: 'Created post!' })
	client.close()
	return
}

export default handler
