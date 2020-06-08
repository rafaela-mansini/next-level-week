import express, { request } from 'express';
import path from 'path';
import cors from 'cors';
import routes from './routes';
import { errors } from 'celebrate';

const app = express(); //criar a constante do tipo express

app.use(cors()); //informar qual url das aplicações podem acessar o sistema
app.use(express.json()); //inserir uma funcionalidade falando que o express entende o corpo da requisição em formato json
app.use(routes);
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads'))); // cria rota para acessar arquivos estáticos no sistema

app.use(errors()); // forma que lida com os erros no front-end

//porta a qual o servidor vai rodar, pode ser inserido qualquer porta...
app.listen(3333);