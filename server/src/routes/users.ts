import express, { Request, Response, Router } from 'express';
import connection from './conn';
import { QueryError, ResultSetHeader } from 'mysql2';
import bcrypt from 'bcrypt';

const userRouter: Router = express.Router();

userRouter.get('/', function(req: Request, res: Response) {
    connection.connect(function(err: QueryError | null) {
        if(err) {
            console.log('Error connecting to database: ', err);
            return res.status(500).json({ error: 'Database connection error' });
        };

        connection.query('SELECT * FROM users', function(err: QueryError | null, result: ResultSetHeader) {
            if(err) {
                console.log('Error getting users:', err);
                return res.status(500).json({ error: 'Error inserting user' });
            };

            res.send(result);
        });
    });
});

userRouter.post('/add', function(req: Request, res: Response) {
    let newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    };

    connection.connect(function(err: QueryError | null) {
        if(err) {
            console.log('Error connecting to database: ', err);
            return res.status(500).json({ error: 'Database connection error' });
        };

        bcrypt.hash(newUser.password, 10, function(err, hash) {
            if (err) {
                console.log('Error hashing password:', err);
                return res.status(500).json({ error: 'Error hashing password' });
            };

            let sql: string = `INSERT INTO users (first_name, last_name, email, password) VALUES('${newUser.first_name}', '${newUser.last_name}', '${newUser.email}', '${hash}')`;

            connection.query(sql, function(err: QueryError | null, result: ResultSetHeader) {
                if(err) {
                    console.log('Error inserting user:', err);
                    return res.status(500).json({ error: 'Error inserting user' });
                };

                console.log('New user inserted:', result);
                res.status(200).json(result);
            });
        });
    });
});

/*userRouter.post('/login', function(req: Request, res: Response) {
    connection.connect(function(err: QueryError | null) {
        if(err) {
            console.log('Error connecting to database: ', err);
        };

       
    });
});*/

export default userRouter;