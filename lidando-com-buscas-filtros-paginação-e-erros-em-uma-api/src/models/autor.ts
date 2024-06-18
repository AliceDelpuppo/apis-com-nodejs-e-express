import mongoose from 'mongoose'

const autorSchema = new mongoose.Schema(
	{
		id: { type: mongoose.Schema.Types.ObjectId },
		name: {
			type: String,
			require: [true, 'O nome do autor é obrigatório'],
		},
		nacionalidade: { type: String },
	},
	{ versionKey: false }
)

const autoresBanco = mongoose.model('autores', autorSchema)

export { autoresBanco, autorSchema }
