import express, { Request, Response } from 'express'
import routerBooks from './book'
import routerAutores from './autor'

export default function routes(app: any) {
	app.route('/').get((request: Request, response: Response) => response.status(200).send('Curso de Node.js'))

	app.use(express.json(), routerBooks, routerAutores)
}
