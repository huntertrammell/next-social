import { MongoClient } from 'mongodb'

async function connectToDatabase() {
	const client = await MongoClient.connect(
		`mongodb+srv://${process.env.mongo_user}:${process.env.mongo_pass}@${process.env.mongo_cluster}.v0ymo.mongodb.net/${process.env.mongo_database}?retryWrites=true&w=majority`
	)
	return client
}

export default connectToDatabase
