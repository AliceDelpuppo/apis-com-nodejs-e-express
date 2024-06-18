import 'dotenv/config'
import express, { Request, Response } from 'express'
import { connectDataBase } from './config/mongoConnect'
import routes from './routes'
import errorHandler from './middlewares/errorHandler'
// import manipulador404 from './middlewares/manipulador404'
;(async () => {
	const connect = await connectDataBase()

	connect.on('error', (error) => {
		console.error('Erro de conexão', error)
	})

	connect.once('open', () => {
		console.log('Conexão com o banco feita com sucesso')
	})
})()

const PORT = 9000

const app = express()

app.use(express.json())

routes(app)

// app.use(manipulador404)

app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`Local: http://localhost:${PORT}/`)
})
