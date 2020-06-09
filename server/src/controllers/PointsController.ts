import { Request, Response } from 'express';
import knex from '../database/connection';
import config from '../config/configuration';

class PointsController {

    async index(request: Request, response: Response){
        const { city, uf, items } = request.query;
        const { urlService } = config;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));
        
        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        const serializedPoints = points.map(point => {
            return {
                ...point, image_url: `${urlService}/uploads/${point.image}`,
            }
        });

        return response.json(serializedPoints);
    }

    async show(request: Request, response: Response){
        // const id = request.params.id; //pode-se utilizar a desestruturação do código
        const { id } = request.params;
        const { urlService } = config;
        const point = await knex('points').where('id', id).first(); //seleciona do banco o primeiro item
        
        if(!point){ //se não existir nenhum point retorna status 400
            response.status(400).json({ message: 'Point not found.' });
        }

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');

        const serializedPoint = {
            ...point, image_url: `${urlService}/uploads/${point.image}`,
        };

        return response.json({ point: serializedPoint, items });
    }

    async create(request: Request, response: Response){
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
        const point = {
            image: request.file.filename,
            name, 
            email, 
            whatsapp, 
            latitude, 
            longitude, 
            city,
            uf,
        }
        const isertedIds = await trx('points').insert( point );
        const point_id = isertedIds[0];
        const point_items = items
        .split(',') // quebra nas virgulas para tranformar em array
        .map((item: string) => Number(item.trim())) // percorre o array e remove os espaços
        .map((item_id: number) => { //mapeia a variável dos items para inserir na tabela
            return { item_id, point_id };
        });

        await trx('point_items').insert( point_items );
        await trx.commit();

        return response.json({ 
            id: point_id,
            ...point, 
         });
    }
}

export default PointsController;