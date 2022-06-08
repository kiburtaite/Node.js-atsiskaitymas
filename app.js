import 'dotenv/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import register from './routes/api/register.js';
import login from './routes/api/login.js';
import groups from './routes/api/groups.js';
import { engine } from 'express-handlebars';
import cookieParser from 'cookie-parser';
import register_page from './routes/ui/register_page.js';
import login_page from './routes/ui/login_page.js';
import groups_page from './routes/ui/groups_page.js';

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
app.use('/login', login_page);
app.use('/groups', groups_page);
app.use('/api/register', register);
app.use('/api/login', login);
app.use('/api/groups', groups)

app.listen(PORT, () => console.log(`Serveris veikia ant ${PORT} porto`))