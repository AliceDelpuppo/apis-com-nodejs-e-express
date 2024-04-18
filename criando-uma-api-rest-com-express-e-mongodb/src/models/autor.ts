import mongoose from 'mongoose'

const autorSchema = new mongoose.Schema(
	{
		id: { type: mongoose.Schema.Types.ObjectId },
		name: { type: String, require: true },
		nacionalidade: { type: String },
	},
	{ versionKey: false }
)

const listaAutorBanco = mongoose.model('autores', autorSchema)

export { listaAutorBanco, autorSchema }
