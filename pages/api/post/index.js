import connectToDatabase from '../../../lib/db'
async function handler(req, res) {
	if (req.method !== 'GET') {
		res.status(401).json({ message: 'Nothing to see here' })
		return
	}
	const client = await connectToDatabase()

	const db = client.db()

	const result = await db
		.collection('posts')
		.find({})
		.sort({ _id: -1 })
		.toArray()
	res.status(200).json(result)
	client.close()
}

export default handler
