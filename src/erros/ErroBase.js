class ErroBase extends Error {
  constructor(mensagem = 'Erro interno do servido', status = 500) {
    super();
    this.mensagem = mensagem;
    this.status = status;
  }

  enviarResposta(res) {
    res.status(this.status).send({
      mensagem: this.mensagem,
      status: this.status
    });
  }
}

export default ErroBase;