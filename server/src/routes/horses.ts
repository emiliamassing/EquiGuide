import express, { Request, Response, Router } from 'express';
import connection from './conn';
import { QueryError, ResultSetHeader } from 'mysql2';

const horseRouter: Router = express.Router();

horseRouter.get('/', function(req: Request, res: Response) {
    connection.connect(function(err: QueryError | null) {
        if(err) {
            console.log('Error connecting to database');
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

horseRouter.post('/add', function(req: Request, res: Response) {
    let newHorse = {
        name: req.body.name,
        breed: req.body.breed,
        age: req.body.age,
        gender: req.body.gender,
        discipline: req.body.discipline 
    };

    let userId = {
        id: req.body.userId
    };

    connection.connect(function(err: QueryError | null) {
        if(err) {
            console.log('Error connecting to database');
            return res.status(500).json({ error: 'Database connection error' });
        };

        let sql: string = `INSERT INTO horses (name, breed, age, gender, discipline) VALUES('${newHorse.name}', '${newHorse.breed}', '${newHorse.age}', '${newHorse.gender}', '${newHorse.discipline}')`;

        connection.query(sql, function(err: QueryError | null, result: ResultSetHeader) {
            if(err) {
                console.log('Error inserting horse', err);
                return res.status(500).json({ error: 'Error inserting horse'});
            }
            
            const horseId = result.insertId;
            const junctionSql = `INSERT into users_horses (user_id, horse_id) VALUES ('${userId.id}', ${horseId})`;

            connection.query(junctionSql, function(err: QueryError | null, result: ResultSetHeader) {
                if(err) {
                    console.log('Error inserting into table', err);
                    return res.status(500).json({ error: 'Error inserting into table'});
                }

                console.log('Created horse and inserted into table:', result);
                res.status(200).json(result);
            });
        });
    });
});

export default horseRouter;