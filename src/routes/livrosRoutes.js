import express from "express";
import LivroController from "../controlers/livroController.js";

const routes = express.Router();

routes.get('/livros', LivroController.listarLivros);

export default routes;