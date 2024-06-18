import { Request, Response } from 'express'
import ErroBase from '../erros/ErroBase'
import { livrosBanco } from '../models'

export async function getBooks(request: Request, response: Response, next: any) {
	try {
		// throw new Error()
		const books = await livrosBanco.find({})
		response.status(200).json(books)
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

export async function listarLivrosPorEditora(request: Request, response: Response, next: any) {
	const editoraReq = request.query.editora

	try {
		const livrosPorEditora = await livrosBanco.find({ editora: editoraReq })
		response.status(200).json(livrosPorEditora)
	} catch (error) {
		next(error)
	}
}
