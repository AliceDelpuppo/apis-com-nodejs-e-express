import { Request, Response } from 'express'
import { autoresBanco } from '../models/autor'

export async function getAutores(request: Request, response: Response) {
	try {
		const autores = await autoresBanco.find({})
		response.status(200).json(autores)
	} catch (error) {
		response.status(500).json({ message: `${error} - falha requisição` })
		response.send(error)
	}
}

export async function getAutorById(request: Request, response: Response) {
	try {
		const id = request.params.id
		const autor = await autoresBanco.findById(id)
		response.status(200).json(autor)
	} catch (error) {
		response.status(500).json({ message: `${error} - falha requisição do autor` })
		response.send(error)
	}
}

export async function cadastrarAutor(request: Request, response: Response) {
	try {
		const newAutor = await autoresBanco.create(request.body)
		response.status(201).json({ message: 'Criado com sucesso', autor: newAutor })
	} catch (error) {
		response.status(500).json({ message: `${error} - falha ao cadastrar autor` })
		response.send(error)
	}
}

export async function atualizarAutor(request: Request, response: Response) {
	try {
		const id = request.params.id
		await autoresBanco.findByIdAndUpdate(id, request.body)
		response.status(200).json({ message: 'Autor atualizado com sucesso' })
	} catch (error) {
		response.status(500).json({ message: `${error} - falha na atualização do autor` })
		response.send(error)
	}
}

export async function deletarAutor(request: Request, response: Response) {
	try {
		const id = request.params.id
		await autoresBanco.findByIdAndDelete(id)
		response.status(200).json({ message: 'Autor excluído com sucesso' })
	} catch (error) {
		response.status(500).json({ message: `${error} - falha na exclusão do autor` })
		response.send(error)
	}
}
