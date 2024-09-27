import express, { Request, Response, Router } from 'express';
import connection from './conn';
import { QueryError, ResultSetHeader } from 'mysql2';

const ridingSessionRouter: Router = express.Router();

ridingSessionRouter.get('/', function(req: Request, res: Response) {
    connection.connect(function(err: QueryError | null) {
        if(err) {
            console.log('Error connecting to database', err);
            return res.status(500).json({ error: 'Database connection error' });
        };

        let sql: string = `SELECT * FROM rides WHERE is_deleted=0`;

        connection.query(sql, function(err: QueryError | null, result: ResultSetHeader) {
            if(err) {
                console.log('Error selecting rides', err);
                return res.status(500).json({ error: 'Error selecting horses' });
            }

            console.log('All rides:', result);
            res.send(result);
        });
    });
});

ridingSessionRouter.get('/user', function(req: Request, res: Response) {
    let userId = req.query.userId

    connection.connect(function(err: QueryError | null) {
        if(err) {
            console.log('Error connecting to database', err);
            return res.status(500).json({ error: 'Database connection error' });
        };

        let sql: string = `
            SELECT rides.*, horses.name AS horse_name
            FROM rides
            JOIN rides_users ON rides.id = rides_users.ride_id
            JOIN users ON rides_users.user_id = users.id
            JOIN rides_horses ON rides.id = rides_horses.ride_id
            JOIN horses ON rides_horses.horse_id = horses.id
            WHERE users.id =${userId}
            AND rides.is_deleted = 0
        `;

        connection.query(sql, function(err: QueryError | null, result: ResultSetHeader) {
            if(err) {
                console.log('Error selecting rides by userId', err);
                return res.status(500).json({ error: 'Error selecting rides by userId' });
            }

            console.log('All rides with userId:', result);
            res.send(result);
        });
    });
});

ridingSessionRouter.get('/horse', function(req: Request, res: Response) {
    let horseId = req.query.horseId

    connection.connect(function(err: QueryError | null) {
        if(err) {
            console.log('Error connecting to database', err);
            return res.status(500).json({ error: 'Database connection error' });
        };

        let sql: string = `
        SELECT * FROM rides
        JOIN rides_horses ON rides.id = rides_horses.ride_id
        JOIN horses ON rides_horses.horse_id = horses.id
        WHERE horses.id =${horseId}`;

        connection.query(sql, function(err: QueryError | null, result: ResultSetHeader) {
            if(err) {
                console.log('Error selecting rides by horseId', err);
                return res.status(500).json({ error: 'Error selecting rides by horseId' });
            }

            console.log('All rides with horseId:', result);
            res.send(result);
        });
    });
});

ridingSessionRouter.get('/:id', function(req: Request, res: Response) {
    let ridingSessionId = req.params.id;

    connection.connect(function(err: QueryError | null) {
        if(err) {
            console.log('Error connecting to database', err);
            return res.status(500).json({ error: 'Database connection error' });
        }

        let sql: string = `SELECT * FROM rides WHERE id=${ridingSessionId}`;

        connection.query(sql, function(err: QueryError | null, result: ResultSetHeader) {
            if(err) {
                console.log('Error selecting rides by id', err);
                return res.status(500).json({ error: 'Error selecting rides by id' });
            }

            console.log('All rides:', result);
            res.send(result);
        });
    })
});

ridingSessionRouter.post('/add', function(req: Request, res: Response) {
    let newRidingSession = {
        title: connection.escape(req.body.title),
        date: connection.escape(req.body.date),
        discipline: connection.escape(req.body.discipline),
    };    

    let userId = {
        id: req.body.userId
    };

    let horseId = {
        id: req.body.horseId
    }

    connection.connect(function(err: QueryError | null) {
        if(err) {
            console.log('Error connecting to database', err);
            return res.status(500).json({ error: 'Database connection error' });
        };

        let sql: string = `INSERT INTO rides (title, date, discipline) VALUES (${newRidingSession.title}, ${newRidingSession.date}, ${newRidingSession.discipline})`;

        connection.query(sql, function(err: QueryError | null, result: ResultSetHeader) {
            if(err) {
                console.log('Error inserting ride', err);
                return res.status(500).json({ error: 'Error inserting ride' });
            }

            const rideId = result.insertId;
            const userJunctionSql: string = `INSERT INTO rides_users (ride_id, user_id) VALUES ('${rideId}', '${userId.id}')`;

            const horseJunctionSql: string = `INSERT INTO rides_horses (ride_id, horse_id) VALUES ('${rideId}', '${horseId.id}')`;

            connection.query(userJunctionSql, function(err: QueryError | null, result: ResultSetHeader) {
                if(err) {
                    console.log('Error inserting into junction table, user', err);
                    return res.status(500).json({ error: 'Error inserting into junction table, user'});
                }

                connection.query(horseJunctionSql, function(err: QueryError | null, result: ResultSetHeader) {
                    if(err) {
                        console.log('Error inserting into junction table, horse', err);
                        return res.status(500).json({ error: 'Error inserting into junction table, horse'});
                    }
    
                    console.log('Created riding session and instered into junction tables');
                    res.status(200).json(result)
                });
            });
        });
    });
});

ridingSessionRouter.post('/edit/:id', function(req: Request, res: Response) {
    let updatedRidingSession = {
        title: connection.escape(req.body.title),
        date: connection.escape(req.body.date),
        discipline: connection.escape(req.body.discipline),
        notes: connection.escape(req.body.notes),
        rating: connection.escape(req.body.rating)
    }; 

    let ridingSessionId = req.params.id;

    connection.connect(function(err: QueryError | null)  {
        if(err) {
            console.log('Error connecting to database', err);
            return res.status(500).json({ error: 'Database connection error' });
        };

        let sql: string = `
        UPDATE rides
        SET
        title =${updatedRidingSession.title},
        date =${updatedRidingSession.date},
        discipline =${updatedRidingSession.discipline},
        notes =${updatedRidingSession.notes},
        rating =${updatedRidingSession.rating}
        WHERE id =${ridingSessionId}`;

        connection.query(sql, function(err: QueryError | null, result: ResultSetHeader) {
            if(err) {
                console.log('Error updating ride', err);
                return res.status(500).json({ error: 'Error updating ride' });
            }

            console.log('Updated ride');
            res.status(200).json(result);
        })
    });
});

ridingSessionRouter.post('/delete/:id', function(req: Request, res: Response) {
    let ridingSessionId = req.params.id;

    let deleteValue = '1';

    connection.connect(function(err: QueryError | null)  {
        if(err) {
            console.log('Error connecting to database', err);
            return res.status(500).json({ error: 'Database connection error' });
        };

        let sql: string = `UPDATE rides SET is_deleted =${deleteValue} WHERE id=${ridingSessionId}`;

        connection.query(sql, function(err: QueryError | null, result: ResultSetHeader) {
            if(err) {
                console.log('Error deleting ride', err);
                return res.status(500).json({ error: 'Error deleting ride' });
            }

            console.log('soft deleted ride');
            res.status(200).json(result);
        })
    });
});

export default ridingSessionRouter;