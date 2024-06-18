import { Response } from 'express'

export interface ErroBaseProps {
	message?: string
	status?: number
	response: Response
}

const ErroBase = {
	enviarResposta: ({ message = 'erro interno do servidor', status = 500, response }: ErroBaseProps) => {
		response.status(status).send({
			message,
			status,
		})
	},
}

export default ErroBase
