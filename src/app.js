import express from "express";
import ConectaNaDataBase from "./config/dbConnect.js";
import routes from "./routes/index.js";

const conexao = await ConectaNaDataBase();

conexao.on('error', (erro) => {
    console.error('Erro de conexao', erro);
});

conexao.once('open', () => {
    console.log('Conectado ao banco com sucesso!')
})

const app = express();
routes(app);

app.get('/livros/:id', (req, res) => {
    const index = buscaLivro(req.params.id);
    res.status(200).json(livros[index]);
});

app.post('/livros', (req, res) => {
    livros.push(req.body);
    res.status(201).send('Livro cadastrado com sucesso!');
});

app.put('/livros/:id', (req, res) => {
    const index = buscaLivro(req.params.id);
    livros[index].name = req.body.name;
    res.status(201).json(livros);
});

app.delete('/livros/:id', (req, res) => {
    const index = buscaLivro(req.params.id);
    livros.splice(index, 1)
    res.status(200).send('Livro removido com sucesso!');
});

export default app;