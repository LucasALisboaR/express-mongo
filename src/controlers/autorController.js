import { autor } from '../models/Autor.js';

class AutorController {

  static listarAutores = async (req, res, next) => {
    try {
      const listaAutores = await autor.find({});
      res.status(200).json(listaAutores);
    } catch (erro) {
      next(erro);
    }
  };

  static listarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);
      res.status(200).json(autorEncontrado);
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      await autor.findByIdAndUpdate(id, req.body);
      res.status(200).json({
        message: 'Alterado com sucesso!'
      });
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({
        message: 'Criado com sucesso!',
        livro: novoAutor
      });
    } catch (erro) {
      next(erro);
    }
  };

  static deletarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      await autor.findByIdAndDelete(id);
      res.status(200).json({
        message: 'Deletado com sucesso!'
      });
    } catch (erro) {
      next(erro);
    }
  };

}

export default AutorController;