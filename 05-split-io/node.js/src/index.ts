import 'dotenv/config';
import express, { type Express } from 'express';
import morgan from 'morgan';
import { notFound, handleError } from './error-handler.js';
import homeRouter from './routes/home.js';
import featuresRouter from './routes/features.js';


const app: Express = express();
const port = process.env.PORT ?? 3000;
app.set('PORT', port);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', homeRouter);
app.use('/features', featuresRouter);

app.use(notFound);
app.use(handleError);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
