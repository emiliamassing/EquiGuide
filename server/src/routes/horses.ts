import express, { Request, Response, Router } from 'express';

const horseRouter: Router = express.Router();

horseRouter.get('/', function(req: Request, res: Response) {
    res.send('horses');
});

export default horseRouter;