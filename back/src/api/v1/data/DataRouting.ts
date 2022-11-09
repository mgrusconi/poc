import { Router } from 'express';
import { DataController } from './DataController';

const DataRouting = Router();

DataRouting.route('/').get(DataController.get);

export { DataRouting };
