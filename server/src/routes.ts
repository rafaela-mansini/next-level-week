import express from 'express';

const routes = express.Router(); //desacoplar rotas do arquivo principal do servidor

routes.get('/', (request, response) =>{
    return response.json({ message: 'Hello World'});
}); 

export default routes;