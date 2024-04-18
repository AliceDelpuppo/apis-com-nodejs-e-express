import { Request, Response } from 'express'
import listaLivrosBanco from '../models/book'
import { listaAutorBanco } from '../models/autor'

export async function getBooks(request: Request, response: Response) {
	try {
		const books = await listaLivrosBanco.find({})
		response.status(200).json(books)
	} catch (error) {
		response.status(500).json({ message: `${error}` })
		response.send(error)
	}
}

export async function getBookById(request: Request, response: Response) {
	try {
		const id = request.params.id
		const book = await listaLivrosBanco.findById(id)
		response.status(200).json(book)
	} catch (error) {
		response.status(500).json({ message: `${error}` })
		response.send(error)
	}
}

export async function cadastrarBook(request: Request, response: Response) {
	const newBookReq = request.body

	try {
		const foundAutor = await listaAutorBanco.findById(newBookReq.autor)
		const completeBook = { ...newBookReq, autor: foundAutor }
		const newBook = await listaLivrosBanco.create(completeBook)

		response.status(201).json({ message: 'Criado com sucesso', livro: newBook })
	} catch (error) {
		response.status(500).json({ message: `${error}` })
		response.send(error)
	}
}

export async function atualizarBook(request: Request, response: Response) {
	try {
		const id = request.params.id
		const livro = await listaLivrosBanco.findByIdAndUpdate(id, request.body)
		response.status(200).json({ message: 'Livro atualizado com sucesso', livro: livro })
	} catch (error) {
		response.status(500).json({ message: `${error}` })
		response.send(error)
	}
}

export async function deletarBook(request: Request, response: Response) {
	try {
		const id = request.params.id
		await listaLivrosBanco.findByIdAndDelete(id)
		response.status(200).json({ message: 'Livro excluído com sucesso' })
	} catch (error) {
		response.status(500).json({ message: `${error}` })
		response.send(error)
	}
}

export async function listarLivrosPorEditora(request: Request, response: Response) {
	const editoraReq = request.query.editora

	try {
		const livrosPorEditora = await listaLivrosBanco.find({ editora: editoraReq })
		response.status(200).json(livrosPorEditora)
	} catch (error) {
		response.status(500).json({ message: `${error}` })
		response.send(error)
	}
}
