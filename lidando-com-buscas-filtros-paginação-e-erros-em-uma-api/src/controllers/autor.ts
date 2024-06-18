import { Request, Response } from 'express'
import ErroBase from '../erros/ErroBase'
import { autoresBanco } from '../models'

export async function getAutores(request: Request, response: Response, next: any) {
	try {
		const autores = await autoresBanco.find({})
		response.status(200).json(autores)
	} catch (error) {
		next(error)
	}
}

export async function getAutorById(request: Request, response: Response, next: any) {
	try {
		const id = request.params.id
		const autor = await autoresBanco.findById(id)
		if (autor) {
			response.status(200).json(autor)
		} else {
			ErroBase.enviarResposta({ message: 'ID do autor não localizado', status: 404, response })
		}
	} catch (error) {
		next(error)
	}
}

export async function cadastrarAutor(request: Request, response: Response, next: any) {
	try {
		const newAutor = await autoresBanco.create(request.body)
		response.status(201).json({ message: 'Criado com sucesso', autor: newAutor })
	} catch (error) {
		next(error)
	}
}

export async function atualizarAutor(request: Request, response: Response, next: any) {
	try {
		const id = request.params.id
		const autorResult = await autoresBanco.findByIdAndUpdate(id, request.body)

		if (autorResult !== null) {
			response.status(200).json({ message: 'Autor atualizado com sucesso' })
		} else {
			ErroBase.enviarResposta({ message: 'ID do autor não localizado', status: 404, response })
		}
	} catch (error) {
		next(error)
	}
}

export async function deletarAutor(request: Request, response: Response, next: any) {
	try {
		const id = request.params.id
		const autorResult = await autoresBanco.findByIdAndDelete(id)

		if (autorResult !== null) {
			response.status(200).json({ message: 'Autor excluído com sucesso' })
		} else {
			ErroBase.enviarResposta({ message: 'ID do autor não localizado', status: 404, response })
		}
	} catch (error) {
		next(error)
	}
}
