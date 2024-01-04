import express, { Request, Response, Router } from 'express';

const ridingSessionRouter: Router = express.Router();

ridingSessionRouter.get('/', function(req: Request, res: Response) {
    res.send('ridingSessions');
});

export default ridingSessionRouter;