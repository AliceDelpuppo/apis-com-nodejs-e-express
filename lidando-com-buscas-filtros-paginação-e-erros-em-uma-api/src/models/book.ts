import mongoose from 'mongoose'
import { autorSchema } from './autor'

const bookSchema = new mongoose.Schema(
	{
		id: { type: mongoose.Schema.Types.ObjectId },
		title: { type: String, required: [true, 'O título do livro é obrigatório'] },
		editora: {
			type: String,
			required: [true, 'A editora é obrigatório'],
			enum: { values: ['Casa do código', 'Alura'], message: 'A editora {VALUE} não é um valor permitido' },
		},
		price: { type: Number },
		pages: {
			type: Number,
			// min: [10, 'O número de páginas deve estar entre 10 e 5000'],
			// max: [5000, 'O número de páginas deve estar entre 10 e 5000'],
			validate: {
				validator: (valor: number) => {
					return valor >= 10 && valor <= 5000
				},
				message: 'O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}',
			},
		},
		// autor: autorSchema,
		autor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'autores',
			required: [true, 'O autor é obrigatório!!'],
		},
	},
	{ versionKey: false }
)

const livrosBanco = mongoose.model('livros', bookSchema)

export { livrosBanco, bookSchema }
