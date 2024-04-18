import { Router } from 'express'
import { atualizarAutor, cadastrarAutor, deletarAutor, getAutorById, getAutores } from '../controllers/autor'

const routerAutores = Router()

routerAutores.get('/autores', getAutores)
routerAutores.get('/autores/:id', getAutorById)
routerAutores.post('/autores', cadastrarAutor)
routerAutores.put('/autores/:id', atualizarAutor)
routerAutores.delete('/autores/:id', deletarAutor)

export default routerAutores
