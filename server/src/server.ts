import express from 'express';

const app = express(); //criar a constante do tipo express

//função get utiliza dois parametros, a url e a função que vai realizar o que deseja
app.get('/users', (request, response) =>{
    //request obtem dados da requisição | response devolver resposta para a aplicação
    console.log('Listagem de usuários');

    //response.send('Hello World'); //enviar resposta simples (string) para aplicação
    response.json([
        'Rafaela', 'Ederson', 'Chewie', 'Leia', 'Han', 'Luke'
    ]); //retorna json para aplicação
});

//porta a qual o servidor vai rodar, pode ser inserido qualquer porta...
app.listen(3333);