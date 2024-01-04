import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import connection from './routes/conn';
import { QueryError } from 'mysql2';

const app = express();

connection.connect(function(err: QueryError | null) {
    if(err) {
        console.log('Error', err);
    }

    console.log('Connected to database');
});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded( {extended: false} ));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req: Request, res: Response) => {
    res.send('Application works');
});

app.listen(3000, () => {
    console.log('App started on port 3000');
});