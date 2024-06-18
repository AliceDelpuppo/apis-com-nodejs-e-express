import { Response } from 'express'
import { ErroBaseProps } from './ErroBase'

interface ValidacaoProps extends ErroBaseProps {
	error: any
}

const Validacao = {
	enviarResposta: ({
		message = 'Um ou mais dados fornecidos estão incorretoss',
		status = 400,
		response,
		error,
	}: ValidacaoProps) => {
		const mensagensError = Object.values(error.errors)
			.map((erro: any) => {
				return erro.message
			})
			.join('; ')

		response.status(status).send({
			message: `Erros encontrados: ${mensagensError}`,
			status: 400,
		})
	},
}

export default Validacao
