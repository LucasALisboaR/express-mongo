import express from 'express';
import LivroController from '../controlers/livroController.js';
import paginar from '../middlewares/paginar.js';

const routes = express.Router();

routes.get('/livros', LivroController.listarLivros, paginar);
routes.get('/livros/busca', LivroController.listarLivrosPorFiltro);
routes.get('/livros/:id', LivroController.listarLivro);
routes.post('/livros', LivroController.cadastrarLivro);
routes.put('/livros/:id', LivroController.atualizarLivro);
routes.delete('/livros/:id', LivroController.deletarLivro);

export default routes;