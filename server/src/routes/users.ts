import express, { Request, Response, Router } from 'express';

const userRouter: Router = express.Router();

userRouter.get('/', function(req: Request, res: Response) {
    res.send('Users');
});

export default userRouter;