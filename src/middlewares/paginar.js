import RequisicaoIncorreta from '../erros/RequisicaoIncorreta.js';

async function paginar(req, res, next) {
  try {
    let { limit = 5, page = 1, ordenacao= '_id:-1' } = req.query;

    let [campoOrdenacao, ordem] =ordenacao.split(':');
    limit = parseInt(limit);
    page = parseInt(page);
    ordem = parseInt(ordem);

    const resultado = req.resultado;
    if (limit > 0 && page > 0) {
      const resultadoPaginado = await resultado.find()
        .sort({ [campoOrdenacao]: ordem })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('autor')
        .exec();
      res.status(200).json(resultadoPaginado);
    } else {
      next(new RequisicaoIncorreta());
    }
  } catch (error) {
    next(error);
  }
}

export default paginar;