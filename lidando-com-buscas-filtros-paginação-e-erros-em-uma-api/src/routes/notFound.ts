import { Router } from 'express'
import { getNotFound } from '../controllers/notFound'

const routerNotFound = Router()

routerNotFound.all('/*', getNotFound)
// routerAutores.get('/autores/:id', getAutorById)
// routerAutores.post('/autores', cadastrarAutor)
// routerAutores.put('/autores/:id', atualizarAutor)
// routerAutores.delete('/autores/:id', deletarAutor)

export default routerNotFound
