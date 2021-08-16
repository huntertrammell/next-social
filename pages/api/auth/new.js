import { hashPassword } from '../../../lib/auth'
import connectToDatabase from '../../../lib/db'

async function handler(req, res) {
	if (req.method !== 'POST') {
		res.status(401).json({ message: 'Nothing to see here' })
		return
	}

	const data = req.body
	const { username, password } = data

	if (!username || username.trim() === '' || typeof username !== 'string') {
		res.status(422).json({ message: 'Username is required' })
		return
	}

	if (!password || password.trim() === '' || typeof password !== 'string') {
		res.status(422).json({ message: 'Password is required' })
		return
	}

	const client = await connectToDatabase()

	const db = client.db()

	const existingUser = await db
		.collection('users')
		.findOne({ username: username })

	if (existingUser) {
		res.status(422).json({ message: 'User exists already!' })
		client.close()
		return
	}

	const securePass = await hashPassword(password)

	const result = await db
		.collection('users')
		.insertOne({ username: username, password: securePass })

	res.status(201).json({ message: 'Created user!' })
	client.close()
}

export default handler
