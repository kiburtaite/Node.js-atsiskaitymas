import 'dotenv/config';
import express from 'express';
import path from 'path';
import cors from 'cors';

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

app.listen(PORT, () => console.log(`Serveris veikia ant ${PORT} porto`))