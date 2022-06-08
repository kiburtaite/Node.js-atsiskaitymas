import 'dotenv/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import register from './routes/api/register.js';
import login from './routes/api/login.js';
import { engine } from 'express-handlebars';
import cookieParser from 'cookie-parser';
import register_page from './routes/ui/register_page.js';

const app = express();
const PORT = process.env.PORT || 8080;
const corsOptions = {
    origin: `localhost:${PORT}`,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.static(path.resolve('public')));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use('/register', register_page);
app.use('/api/login', login);
app.use('/api/register', register);

app.listen(PORT, () => console.log(`Serveris veikia ant ${PORT} porto`))