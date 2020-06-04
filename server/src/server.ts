import express, { request } from 'express';
import routes from './routes';

const app = express(); //criar a constante do tipo express

app.use(express.json()); //inserir uma funcionalidade falando que o express entende o corpo da requisição em formato json
app.use(routes);

//porta a qual o servidor vai rodar, pode ser inserido qualquer porta...
app.listen(3333);