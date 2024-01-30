import express, { Request, Response, Router } from 'express';
import connection from './conn';
import { QueryError, ResultSetHeader } from 'mysql2';

const horseRouter: Router = express.Router();

horseRouter.get('/', function(req: Request, res: Response) {
    connection.connect(function(err: QueryError | null) {
        if(err) {
            console.log('Error connecting to database', err);
            return res.status(500).json({ error: 'Database connection error' });
        };

        let sql: string = `SELECT * FROM horses`;

        connection.query(sql, function(err: QueryError | null, result: ResultSetHeader) {
            if(err) {
                console.log('Error selecting horses', err);
                return res.status(500).json({ error: 'Error selecting horses'});
            }

            console.log('All horses:', result);
            res.send(result);
        });
    });
});
horseRouter.get('/user', function(req: Request, res: Response) {
    let userId = req.query.userId;

    connection.connect(function(err: QueryError | null) {
        if(err) {
            console.log('Error connecting to database', err);
            return res.status(500).json({ error: 'Database connection error' });
        };

        let sql: string = `
        SELECT * FROM horses
        JOIN users_horses ON horses.id = users_horses.horse_id
        JOIN users ON users_horses.user_id = users.id
        WHERE users.id =${userId}`;

        connection.query(sql, function(err: QueryError | null, result: ResultSetHeader) {
            if(err) {
                console.log('Error selecting horses', err);
                return res.status(500).json({ error: 'Error selecting horses'});
            }

            console.log('All horses:', result);
            res.send(result);
        });
    });
});

horseRouter.post('/add', function(req: Request, res: Response) {
    let newHorse = {
        name: connection.escape(req.body.name),
        breed: connection.escape(req.body.breed),
        age: connection.escape(req.body.age),
        gender: connection.escape(req.body.gender),
        discipline: connection.escape(req.body.discipline) 
    };

    let userId = {
        id: req.body.userId
    };

    connection.connect(function(err: QueryError | null) {
        if(err) {
            console.log('Error connecting to database', err);
            return res.status(500).json({ error: 'Database connection error' });
        };

        let sql: string = `
        INSERT INTO horses 
        (name, breed, age, gender, discipline) 
        VALUES
        (${newHorse.name}, ${newHorse.breed}, ${newHorse.age}, ${newHorse.gender}, ${newHorse.discipline})`;

        connection.query(sql, function(err: QueryError | null, result: ResultSetHeader) {
            if(err) {
                console.log('Error inserting horse', err);
                return res.status(500).json({ error: 'Error inserting horse'});
            }
            
            const horseId = result.insertId;
            const junctionSql = `
            INSERT INTO users_horses 
            (user_id, horse_id) 
            VALUES 
            ('${userId.id}', ${horseId})`;

            connection.query(junctionSql, function(err: QueryError | null, result: ResultSetHeader) {
                if(err) {
                    console.log('Error inserting into junction table', err);
                    return res.status(500).json({ error: 'Error inserting into junction table'});
                }

                console.log('Created horse and inserted into junction table:', result);
                res.status(200).json(result);
            });
        });
    });
});

export default horseRouter;