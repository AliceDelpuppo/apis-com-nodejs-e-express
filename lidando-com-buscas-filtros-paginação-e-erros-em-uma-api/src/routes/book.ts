import { Router } from 'express'
import {
	atualizarBook,
	cadastrarBook,
	deletarBook,
	getBookById,
	getBooks,
	listarLivrosPorFiltro,
} from '../controllers/book'

const routerBooks = Router()

routerBooks.get('/livros', getBooks)
routerBooks.get('/livros/busca', listarLivrosPorFiltro)
routerBooks.get('/livros/:id', getBookById)
routerBooks.post('/livros', cadastrarBook)
routerBooks.put('/livros/:id', atualizarBook)
routerBooks.delete('/livros/:id', deletarBook)

export default routerBooks
