import express, { Request, Response, Router } from 'express';
import connection from './conn';
import { QueryError, ResultSetHeader } from 'mysql2';

const userRouter: Router = express.Router();

userRouter.get('/', function(req: Request, res: Response) {
    connection.connect(function(err: QueryError | null) {
        if(err) {
            console.log('Error: ', err);
        };

        connection.query('SELECT * FROM users', function(err: QueryError | null, result: ResultSetHeader) {
            if(err) {
                console.log('Error', err);
            };

            res.send(result);
        });
    });
});

userRouter.post('/add', function(req: Request, res: Response) {
    connection.connect(function(err: QueryError | null) {
        if(err) {
            console.log('Error: ', err);
        };

        let newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        };

        let sql: string = `INSERT INTO users (first_name, last_name, email, password) VALUES('${newUser.first_name}', '${newUser.last_name}', '${newUser.email}', '${newUser.password}')`;

        connection.query(sql, function(err: QueryError | null, result: ResultSetHeader) {
            if(err) {
                console.log('Error: ', err);
            };

            console.log('New user', result);
            res.status(200).json(result);
        });
    });
});

userRouter.post('/login', function(req: Request, res: Response) {
    connection.connect(function(err: QueryError | null) {
        if(err) {
            console.log('Error: ', err);
        };

       
    });
});

export default userRouter;