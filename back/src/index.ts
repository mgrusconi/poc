require('dotenv').config();

import express, { Request, Response } from 'express';
import { readFileSync } from 'fs'
import { JsonObject, serve, setup } from "swagger-ui-express";
import { parse } from 'yaml'
import path from 'path';

import {
    errorHandler,
    customErrorHandler,
} from './middleware/error-handler';

import { DataRouting } from './api/v1/data/DataRouting';

const { PORT, FRONT } = process.env;
const app = express();
const swaggerYaml = readFileSync('./swagger.yaml', 'utf8');
const swaggerDocument: JsonObject = parse(swaggerYaml);

app.use('/v1/data', DataRouting);
app.use('/api-docs', serve, setup(swaggerDocument));

const pathUI = `${__dirname}${FRONT}`;
app.use(express.static(pathUI));
app.get("/*", (req: Request, res: Response) => res.sendFile(path.join(pathUI, "index.html")));

app.use(errorHandler);
app.use(customErrorHandler);

app.listen(PORT, () => {
    console.log(`The application is listening on port ${PORT}!`);
});