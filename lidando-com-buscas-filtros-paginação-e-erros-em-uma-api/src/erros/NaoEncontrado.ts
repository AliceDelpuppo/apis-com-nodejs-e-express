import { Response } from 'express'
import { ErroBaseProps } from './ErroBase'

interface NaoEncontradoProps extends ErroBaseProps {}
// { message = 'erro interno do servidor', status = 500 }: ErroBaseProps
const NaoEncontrado = {
	enviarResposta: ({ message = 'Página não encontrada', status = 404, response }: NaoEncontradoProps) => {
		console.log('NaoEncontrado.enviarResposta')
		response.status(status).send({
			message,
			status,
		})
	},
}

export default NaoEncontrado
