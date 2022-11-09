require('dotenv').config();

import axios from 'axios';
import { CustomError } from '../../../customs-errors/Custom-error';
import logger from '../../../libs/logger';
import { DataModel } from './DataModel';

const { DATA_URL } = process.env;

export class DataService {
  static async get() {
    try {
      const rs = await axios({
        method: 'get',
        url: DATA_URL,
      });
      const data: DataModel = rs.data;
      const formatData = {
        labels: data.chart_one.data1.labels,
        datasets: [
          data.chart_one.data1.data,
          data.chart_one.data2.data
        ]
      }
      return formatData;
    } catch (err: any) {
      logger.info(`[DataService][get] ${err.message}`);
      throw new CustomError('Error al intentar procesar los datos');
    }
  }
}
