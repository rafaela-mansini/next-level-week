import express, { request } from 'express';
import path from 'path';
import routes from './routes';

const app = express(); //criar a constante do tipo express

app.use(express.json()); //inserir uma funcionalidade falando que o express entende o corpo da requisição em formato json
app.use(routes);
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads'))); // cria rota para acessar arquivos estáticos no sistema

//porta a qual o servidor vai rodar, pode ser inserido qualquer porta...
app.listen(3333);