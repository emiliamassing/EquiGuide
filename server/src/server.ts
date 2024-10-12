import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import connection from './routes/conn';
import { QueryError } from 'mysql2';

import indexRouter from './routes';
import userRouter from './routes/users';
import horseRouter from './routes/horses';
import ridingSessionRouter from './routes/ridingSessions';

const app = express();

connection.connect(function(err: QueryError | null) {
    if(err) {
        console.log('Error', err);
    }

    console.log('Connected to database');
});


app.use(cors({origin: [
    'https://emiliamassing.github.io',
    'http://localhost:5173'
]}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded( {extended: false} ));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/horses', horseRouter);
app.use('/ridingSessions', ridingSessionRouter);

app.listen(3000, () => {
    console.log('App started on port 3000');
});