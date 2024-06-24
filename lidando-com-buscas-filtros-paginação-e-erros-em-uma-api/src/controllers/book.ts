import { Request, Response } from 'express'
import ErroBase from '../erros/ErroBase'
import { autoresBanco, livrosBanco } from '../models'

export async function getBooks(request: Request, response: Response, next: any) {
	try {
		// throw new Error()

		let { limite = 5, pagina = 1, ordenacao = 'title:1' } = request.query

		console.log('query', request.query)

		limite = parseInt(String(limite))
		pagina = parseInt(String(pagina))
		// ordem = parseInt(String(ordem))

		const [campoOrdenacao, ordem] = String(ordenacao).split(':')

		if (limite > 0 && pagina > 0) {
			const books = await livrosBanco
				.find({})
				.sort({ [campoOrdenacao]: 1 })
				.skip((pagina - 1) * limite)
				.limit(limite)
			// .populate('autor')
			response.status(200).json(books)
		} else {
			ErroBase.enviarResposta({ message: 'Um ou mais dados fornecidos estão incorretos', status: 400, response })
		}
	} catch (error) {
		next(error)
	}
}

export async function getBookById(request: Request, response: Response, next: any) {
	try {
		const id = request.params.id
		const book = await livrosBanco.findById(id)
		if (book !== null) {
			response.status(200).json(book)
		} else {
			ErroBase.enviarResposta({ message: 'Livro não localizado', status: 404, response })
		}
	} catch (error) {
		next(error)
	}
}

export async function cadastrarBook(request: Request, response: Response, next: any) {
	const newBookReq = request.body

	try {
		// const foundAutor = await autoresBanco.findById(newBookReq.autor)
		// const completeBook = { ...newBookReq, autor: foundAutor }
		const newBook = await livrosBanco.create(request.body)

		response.status(201).json({ message: 'Criado com sucesso', livro: newBook })
	} catch (error) {
		next(error)
	}
}

export async function atualizarBook(request: Request, response: Response, next: any) {
	try {
		const id = request.params.id
		const livro = await livrosBanco.findByIdAndUpdate(id, request.body)
		response.status(200).json({ message: 'Livro atualizado com sucesso', livro: livro })
	} catch (error) {
		next(error)
	}
}

export async function deletarBook(request: Request, response: Response, next: any) {
	try {
		const id = request.params.id
		await livrosBanco.findByIdAndDelete(id)
		response.status(200).json({ message: 'Livro excluído com sucesso' })
	} catch (error) {
		next(error)
	}
}

export async function listarLivrosPorFiltro(request: Request, response: Response, next: any) {
	interface BuscaProps {
		editora?: unknown
		titulo?: unknown
		pages?: {
			$gte?: unknown
			$lte?: unknown
		}
		autor?: unknown
	}

	try {
		const { editora, titulo, nomeAutor, minPaginas, maxPaginas } = request.query

		let busca: BuscaProps | null = {}

		if (editora) busca.editora = { $regex: editora, $options: 'i' }
		if (titulo) busca.titulo = { $regex: titulo, $options: 'i' }
		if (minPaginas || maxPaginas) {
			busca.pages = {}
			if (minPaginas) busca.pages.$gte = minPaginas
			if (maxPaginas) busca.pages.$lte = maxPaginas
		}
		if (nomeAutor) {
			const autor = await autoresBanco.findOne({ name: nomeAutor })

			if (autor !== null) {
				busca.autor = autor?._id
			} else {
				busca = null
			}
		}

		if (busca !== null) {
			const livrosPorEditora = await livrosBanco.find(busca)
			// .populate('autor')
			response.status(200).json(livrosPorEditora)
		} else {
			response.status(200).send([])
		}
	} catch (error) {
		next(error)
	}
}
