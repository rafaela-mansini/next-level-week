import express, { request, response } from 'express';
import knex from './database/connection';

const routes = express.Router(); //desacoplar rotas do arquivo principal do servidor

routes.get('/items', async (request, response) =>{
    const items = await knex('items').select('*'); //SELECT * FROM items -- como a requisição pode demorar, utiliza-se o async/await na função

    const serializedItems = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `http://localhost:3333/uploads/${item.image}`
        }
    });
    return response.json(serializedItems);
}); 

routes.post('/points', async (request, response) => {
    //desestruturação de código, quando se sabe os campos da variavel (no caso request.body)
    const {
        name, 
        email, 
        whatsapp, 
        latitude, 
        longitude, 
        city,
        uf,
        items
    } = request.body;

    const trx = await knex.transaction(); //variavel trx é um padrão para transaction

    const isertedIds = await trx('points').insert({
        image: 'default',
        name, 
        email, 
        whatsapp, 
        latitude, 
        longitude, 
        city,
        uf,
    });
    const point_id = isertedIds[0];
    const point_items = items.map((item_id: number) => { //mapeia a variável dos items para inserir na tabela
        return { item_id, point_id };
    });

    await trx('point_items').insert( point_items );

    response.json({ success: true });
});

export default routes;