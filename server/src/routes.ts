import express from 'express';
import knex from './database/connection';

const routes = express.Router(); //desacoplar rotas do arquivo principal do servidor

routes.get('/items', async (request, response) =>{
    const items = await knex('items').select('*'); //SELECT * FROM items -- como a requisição pode demorar, utiliza-se o async/await na função

    const serializedItems = items.map(item => {
        return {
            title: item.title,
            image_url: `http://localhost:3333/uploads/${item.image}`
        }
    });
    return response.json(serializedItems);
}); 

export default routes;