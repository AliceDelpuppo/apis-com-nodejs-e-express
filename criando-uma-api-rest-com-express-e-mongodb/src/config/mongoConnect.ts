import mongoose from 'mongoose'

const CONNECT = process.env.MONGO_CONNECT_STRING ?? ''

export async function connectDataBase() {
	await mongoose.connect(CONNECT)

	return mongoose.connection
}
