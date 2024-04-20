import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import route from './route/index.js';
import database from './database/index.js';

const app = express();
const PORT = process.env.PORT || 8000;
//app config
app.use(cookieParser());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded());
//monggo database
database.connect();
// router
route(app);

app.listen(PORT, () =>
    console.log(`Listening on port ${PORT} : http://${process.env.HOST}:${PORT} : mode ${process.env.NODE_ENV}`),
);
