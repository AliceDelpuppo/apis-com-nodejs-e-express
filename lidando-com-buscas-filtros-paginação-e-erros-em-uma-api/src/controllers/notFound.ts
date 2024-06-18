import { Request, Response } from 'express'
import ErroBase from '../erros/ErroBase'

export async function getNotFound(request: Request, response: Response, next: any) {
	console.log('AQUI getNotFound')
	const erro404 = ErroBase.enviarResposta({ message: 'Página não encontradaa', status: 404, response })

	console.log({ erro404 })
	next(erro404)
}
