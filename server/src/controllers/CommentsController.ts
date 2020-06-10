import { Request, Response, json } from 'express';
import knex from '../database/connection';

class CommentsController {
    
    async create(request: Request, response: Response){
        const {
            name, comment, stars, point_id 
        } = request.body;

        const queryComment = { client_name:name, comment, stars, point_id }
        try {
            const insertedId = await knex('comments').insert( queryComment );
            return response.json({"success": true, "result": {...queryComment, id: insertedId[0]}});
        } catch (error) {
            return response.json({"error":true, "result": error});
        }
    }

    async index(request: Request, response: Response){
        const { point_id } = request.params;
        const result = await knex('comments').where('point_id', '=', point_id);

        return response.json( result );
    }
}

export default CommentsController;