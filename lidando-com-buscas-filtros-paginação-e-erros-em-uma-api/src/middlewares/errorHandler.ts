import mongoose from 'mongoose'

import { Request, Response } from 'express'
import ErroBase from '../erros/ErroBase'
import RequisicaoIncorreta from '../erros/RequisicaoIncorreta'
import Validacao from '../erros/Validacao'
import NaoEncontrado from '../erros/NaoEncontrado'

export default function errorHandler(error: any, _request: Request, response: Response, _next: () => void) {
	if (error instanceof mongoose.Error.CastError) {
		console.log('log 01')
		// RequisicaoIncorreta.enviarResposta({ response })
		ErroBase.enviarResposta({ message: 'Um ou mais dados fornecidos estão incorretosas', status: 400, response })
	} else if (error instanceof mongoose.Error.ValidationError) {
		console.log('log 02')
		Validacao.enviarResposta({ status: 400, response, error })
	} else if (error instanceof NaoEncontrado.enviarResposta) {
		console.log('log 03')
		ErroBase.enviarResposta({ response })
	} else {
		console.log('log 04')
		ErroBase.enviarResposta({ response })
	}
}
