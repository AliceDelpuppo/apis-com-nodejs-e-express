import mongoose from 'mongoose'
import { autorSchema } from './autor'

const bookSchema = new mongoose.Schema(
	{
		id: { type: mongoose.Schema.Types.ObjectId },
		title: { type: String, required: true },
		editora: { type: String },
		price: { type: Number },
		pages: { type: Number },
		autor: autorSchema,
	},
	{ versionKey: false }
)

const listaLivrosBanco = mongoose.model('livros', bookSchema)

export default listaLivrosBanco
