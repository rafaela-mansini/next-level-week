import express, { request } from 'express';

const app = express(); //criar a constante do tipo express
app.use(express.json()); //inserir uma funcionalidade falando que o express entende o corpo da requisição em formato json

const users = ['Rafaela', 'Ederson', 'Chewie', 'Leia', 'Han', 'Luke'];

//função get utiliza dois parametros, a url e a função que vai realizar o que deseja
app.get('/users', (request, response) =>{
    //request obtem dados da requisição | response devolver resposta para a aplicação
    //response.send('Hello World'); //enviar resposta simples (string) para aplicação

    const search = String(request.query.search); //query que vem do request que pode ou não ser opcional
    //filter recebe um parametro a ser utilizado como item unico | includes verifica se o parametro passado (search) está icluido dentro da variavel verificada (user)
    const filteredUsers = search ? users.filter(user => user.includes(search)) : users; 

    return response.json(filteredUsers); //retorna json para aplicação
});

app.get('/users/:id', (request, response) => { //busca apenas um usuário na requisição
    const id = Number(request.params.id); //por utilizar o typescript é necessário informar que é um number, pois os requests vem como parametro strings
    const user = users[id];
    
    return response.json(user);
});

app.post('/users', (request, response) => { 
    const data = request.body;

    const user = {
        name: data.name,
        email: data.email
    };

    console.log(user);
    
    return response.json(user);
});

//porta a qual o servidor vai rodar, pode ser inserido qualquer porta...
app.listen(3333);

/*Additional documentation 
*   Request Parm: Parametros da rota que identificam um recurso (parametro obrigatório);
*   Query Param: Parametros enviados para a rota --informações do request que vem depois de ?params(parametros opicionais);
*   Request body: Parametros que vem com o corpo da requisição
*/