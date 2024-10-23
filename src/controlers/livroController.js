import livro from '../models/Livro.js';
import { autor } from '../models/Autor.js';
import RequisicaoIncorreta from '../erros/RequisicaoIncorreta.js';

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      let { limit = 5, page = 1, ordenacao= '_id:-1' } = req.query;

      let [campoOrdenacao, ordem] =ordenacao.split(':');
      limit = parseInt(limit);
      page = parseInt(page);
      ordem = parseInt(ordem);

      if (limit > 0 && page > 0) {
        const listaLivros = await livro.find()
          .sort({ [campoOrdenacao]: ordem })
          .skip((page - 1) * limit)
          .limit(limit)
          .populate('autor')
          .exec();
        res.status(200).json(listaLivros);
      } else {
        next(new RequisicaoIncorreta());
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      res.status(200).json(livroEncontrado);
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({
        message: 'Alterado com sucesso!'
      });
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      const livroCompleto = {
        ...novoLivro,
        autor: { ...autorEncontrado._doc }
      };
      const livroCriado = await livro.create(livroCompleto);
      res.status(201).json({
        message: 'Criado com sucesso!',
        livro: livroCriado
      });
    } catch (erro) {
      next(erro);
    }
  };

  static deletarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id);
      res.status(200).json({
        message: 'Deletado com sucesso!'
      });
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivrosPorFiltro = async (req, res, next) => {
    try {
      const { editora, titulo } = req.query;

      const busca = {};
      if (editora) busca.editora = editora;
      if (titulo) busca.titulo = { $regex: titulo, $options: 'i' };

      const livrosPorEditora = await livro.find(busca);
      res.status(200).json(livrosPorEditora);
    } catch (erro) {
      next(erro);
    }
  };

}

export default LivroController;