import express, { Request, Response, Router } from 'express';
import connection from './conn';
import { QueryError, ResultSetHeader, RowDataPacket } from 'mysql2';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const userRouter: Router = express.Router();
dotenv.config();

userRouter.get('/', function(req: Request, res: Response) {
    connection.connect(function(err: QueryError | null) {
        if(err) {
            console.log('Error connecting to database: ', err);
            return res.status(500).json({ error: 'Database connection error' });
        };

        let sql: string = `SELECT * FROM users`;

        connection.query(sql, function(err: QueryError | null, result: ResultSetHeader) {
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
        first_name: connection.escape(req.body.first_name),
        last_name: connection.escape(req.body.last_name),
        email: connection.escape(req.body.email),
        password: connection.escape(req.body.password)
    };

    connection.connect(function(err: QueryError | null) {
        if(err) {
            console.log('Error connecting to database: ', err);
            return res.status(500).json({ error: 'Database connection error' });
        };

        let checkUniqueEmailSql: string = `SELECT * FROM users WHERE email = ${newUser.email}`;

        connection.query(checkUniqueEmailSql, function(err: QueryError | null, result: RowDataPacket[]) {
            if(err) {
                console.log('Error checking email uniqueness:', err);
                return res.status(500).json({ error: 'Error checking email uniqueness' });
            }

            //Return error is email exists
            if( result && result.length > 0) {
                return res.status(400).json({ error: 'Error, Email already exists' });
            }

            bcrypt.hash(newUser.password, 10, function(err, hash) {
                if(err) {
                    console.log('Error hashing password:', err);
                    return res.status(500).json({ error: 'Error hashing password' });
                };
    
                let sql: string = `
                INSERT INTO users 
                (first_name, last_name, email, password) 
                VALUES
                (${newUser.first_name}, ${newUser.last_name}, ${newUser.email}, '${hash}')`;
    
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
});

userRouter.post('/login', function(req: Request, res: Response) {
    let userLogin = {
        email: connection.escape(req.body.email),
        password: connection.escape(req.body.password)
    };

    connection.connect(function(err: QueryError | null) {
        if(err) {
            console.log('Error connecting to database: ', err);
            return res.status(500).json({ error: 'Database connection error' });
        };

       let sql: string = `SELECT * FROM users WHERE email = ${userLogin.email}`;

       connection.query(sql, async function(err: QueryError | null, result: RowDataPacket[]) {
            if(err) {
                console.log('Query error: ', err);
                return res.status(500).json({ error: 'Query error' });
            };
            
            if(result.length === 0) {
                return res.status(400).json({ error: 'User not found', sql });
            };

            const user = result[0];
            const passwordMatch = await bcrypt.compare(userLogin.password, user.password);

            if(passwordMatch) {
                if(process.env.JWT_KEY) {
                    const token = jwt.sign({ userId: user.id, email: user.email, firstname: user.first_name, lastname: user.last_name }, process.env.JWT_KEY);
                    res.status(200).json({ message: 'Login sucessful', user: { email: user.email, id: user.id, firstname: user.first_name, lastname: user.last_name}, token });
                }
            }else {
                res.status(401).json({ error: 'Incorrect password' });
            }
        });
    });
});

export default userRouter;