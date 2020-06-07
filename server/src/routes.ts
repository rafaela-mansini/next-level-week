import express from 'express';
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
import multer from 'multer';
import multerConfig from './config/multer';

const routes = express.Router(); //desacoplar rotas do arquivo principal do servidor
const upload = multer(multerConfig); // criando um objeto multer passando as configurações multerConfig

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);


routes.post('/points', upload.single('image'), pointsController.create); // passando o upload para o campo image (que é o campo que estou usando agora)

export default routes;