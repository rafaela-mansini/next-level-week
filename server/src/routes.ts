import express from 'express';
import { celebrate, Joi } from 'celebrate';
import multer from 'multer';
import multerConfig from './config/multer';
import ItemsController from './controllers/ItemsController';
import PointsController from './controllers/PointsController';
import CommentsController from './controllers/CommentsController';

const routes = express.Router(); //desacoplar rotas do arquivo principal do servidor
const upload = multer(multerConfig); // criando um objeto multer passando as configurações multerConfig

const pointsController = new PointsController();
const itemsController = new ItemsController();
const commentsController = new CommentsController();

routes.get('/items', itemsController.index);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

routes.post('/comments', commentsController.create);
routes.get('/comments/:point_id', commentsController.index);

routes.post(
    '/points',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(), //regex ver como faz para validação de virgula
            // validar imagem também com filter
        })
    }, {
        abortEarly: false
    }),
    pointsController.create
); // passando o upload para o campo image (que é o campo que estou usando agora)

export default routes;