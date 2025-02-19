import Router from 'express-promise-router';
import { Request, Response } from 'express';


const router = Router();

router.get('/', function (req: Request, res: Response) {
  res.send('Feature flag demo is running!\n[/features/feature1, /features/feature2, /features/feature3, /features/all, /features/env]');
});

export default router;
