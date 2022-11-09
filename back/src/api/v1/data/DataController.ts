import { Request, Response } from 'express';
import { CustomError } from '../../../customs-errors/Custom-error';
import logger from '../../../libs/logger';
import { DataService } from './DataService';

export class DataController {
  static async get(req: Request, res: Response) {
    try {
      const data = await DataService.get()
      res.status(200).json(data);
    } catch (err: any) {
      logger.error(`[DataController][get] ${err.message}`);
      throw new CustomError('Error al intentar procesar los datos');
    }
  }
}
