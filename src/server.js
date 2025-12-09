import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import routes from './routes/app.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/public', express.static('public'));

app.use('/', routes);

app.use((req, res) => {
  res.status(404).send('404 - Página não encontrada');
});

app.listen(3000, () => {
  console.log(`API running in port 3000`);
});

export default app;
