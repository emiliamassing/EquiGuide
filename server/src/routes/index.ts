import express, { Request, Response, Router } from 'express';

const indexRouter: Router = express.Router();

indexRouter.get('/', function(req: Request, res: Response) {
    res.send('Application works');
});

export default indexRouter;